import React from 'react';
import { injectIntl, IntlShape } from 'react-intl';
import NavFrontendChevron from 'nav-frontend-chevron';
import TypografiBase from 'nav-frontend-typografi';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import getMessage from 'common/util/i18nUtils';
import BEMHelper from 'common/util/bem';
import Lenke from 'nav-frontend-lenker';
import { Side, AppRoutes } from 'app/routes';

import './breadcrumbs.less';

const cls = BEMHelper('breadcrumbs');
const NAV_FAMILIE_URL = 'https://familie.nav.no';

interface BreadcrumbsProps {
    sti: string;
}

interface ParsedPath {
    url: string;
    label: string;
    part: string;
}

const getSideRoute = (side: Side): string => {
    switch (side) {
        case Side.UTTAKSPLAN:
            return AppRoutes.dekningsgradside;

        default:
            return AppRoutes.startside;
    }
};

const parsePath = (sti: string, intl: IntlShape): ParsedPath[] => {
    const parts = sti.split('/');
    // Remove any trailing slash ("/")
    if (parts.length > 1 && parts[parts.length - 1] === '') {
        parts.pop();
    }

    if (parts.length === 3) {
        const side = parts[2] as Side;
        switch (side) {
            case Side.DEKNINGSGRAD:
        }
    }

    return parts.map((part, index) => {
        const recombinedParts = parts.slice(0, index + 1);
        const url = recombinedParts.length === 1 ? NAV_FAMILIE_URL : recombinedParts.join('/');
        return {
            url,
            label: getMessage(intl, `route.${part}`),
            part: parts[parts.length - 1],
        };
    });
};

interface IntlProp {
    intl: IntlShape;
}

class Breadcrumbs extends React.Component<BreadcrumbsProps & IntlProp> {
    state: {
        windowWidth?: number;
    } = {
        windowWidth: undefined,
    };

    componentWillMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        this.updateWindowDimensions();
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({
            windowWidth: window.innerWidth,
        });
    };
    renderTilbakeLenke(parsedPath: ParsedPath[]) {
        if (parsedPath.length === 3) {
            return (
                <Link to={getSideRoute(parsedPath[2].part as Side)}>
                    {getMessage(this.props.intl, 'route.tilbake')}
                </Link>
            );
        }
        return <Lenke href={NAV_FAMILIE_URL}>{getMessage(this.props.intl, 'route.tilbake')}</Lenke>;
    }

    render() {
        const breadcrumbsTilPlanlegger: React.ReactNodeArray = [];
        const parsedPath = parsePath(this.props.sti, this.props.intl);

        if (this.state.windowWidth && this.state.windowWidth < 576) {
            breadcrumbsTilPlanlegger.push(
                <div key="chvron" aria-hidden={true}>
                    <NavFrontendChevron type="venstre" />
                </div>
            );

            breadcrumbsTilPlanlegger.push(
                <TypografiBase
                    aria-label="Gå til forrige side"
                    key="tilbake"
                    type="normaltekst"
                    className={cls.element('item')}>
                    {this.renderTilbakeLenke(parsedPath)}
                </TypografiBase>
            );
        } else {
            parsedPath.forEach((path, index) => {
                if (index !== 0) {
                    breadcrumbsTilPlanlegger.push(
                        <div key={`chevron${index}`} aria-hidden={true}>
                            <NavFrontendChevron type="høyre" />
                        </div>
                    );
                }
                const current = index === parsedPath.length - 1;
                breadcrumbsTilPlanlegger.push(
                    <TypografiBase
                        aria-current={current ? 'page' : undefined}
                        key={`crumb${index}`}
                        type="normaltekst"
                        className={classNames(cls.element('item'), {
                            [cls.element('current')]: current,
                        })}>
                        {current ? path.label : <a href={path.url}>{path.label}</a>}
                    </TypografiBase>
                );
            });
        }
        return (
            <nav aria-label="Du er her" className={cls.block}>
                {breadcrumbsTilPlanlegger}
            </nav>
        );
    }
}

export default injectIntl(Breadcrumbs);
