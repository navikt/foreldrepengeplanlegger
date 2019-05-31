import React from 'react';
import { injectIntl, InjectedIntl, InjectedIntlProps } from 'react-intl';
import NavFrontendChevron from 'nav-frontend-chevron';
import TypografiBase from 'nav-frontend-typografi';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import getMessage from 'common/utils/i18nUtils';
import BEMHelper from 'common/utils/bem';
import './breadcrumbs.less';

const cls = BEMHelper('breadcrumbs');

interface BreadcrumbsProps {
    sti: string;
    url?: string;
}

const parsePath = (sti: string, intl: InjectedIntl) => {
    const parts = sti.split('/');
    // Remove any trailing slash ("/")
    if (parts.length > 1 && parts[parts.length - 1] === '') {
        parts.pop();
    }

    return parts.map((part, index) => {
        const recombinedParts = parts.slice(0, index + 1);
        const url = recombinedParts.length === 1 ? 'https://familie.nav.no' : recombinedParts.join('/');
        return {
            url,
            label: getMessage(intl, `route.${part}`)
        };
    });
};

class Breadcrumbs extends React.Component<BreadcrumbsProps & InjectedIntlProps> {
    state: {
        windowWidth?: number;
    } = {
        windowWidth: undefined
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
            windowWidth: window.innerWidth
        });
    };

    render() {
        const breadcrumbsTilPlanlegger: React.ReactNodeArray = [];
        const parsedPath = parsePath(this.props.sti, this.props.intl);

        if (this.state.windowWidth && this.state.windowWidth < 576) {
            const routelen = parsedPath.length;
            const lastUrl = parsedPath[routelen - 2].url;

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
                    <Link to={lastUrl}>{getMessage(this.props.intl, 'route.tilbake')}</Link>
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
                        aria-current={current ? 'page' : ''}
                        key={`crumb${index}`}
                        type="normaltekst"
                        className={classNames(cls.element('item'), {
                            [cls.element('current')]: current
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
