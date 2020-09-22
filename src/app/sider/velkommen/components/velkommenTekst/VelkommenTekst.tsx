import * as React from 'react';
import Block from 'common/components/block/Block';
import { Ingress, Element } from 'nav-frontend-typografi';
import { withRouter, RouteComponentProps } from 'react-router';
import getMessage from 'common/util/i18nUtils';
import { FormattedMessage, useIntl } from 'react-intl';
import UtvidetInformasjon from 'common/components/utvidetInformasjon/UtvidetInformasjon';
import Introduksjon from 'app/sider/velkommen/components/introduksjon/Introduksjon';
import IntroSirkelSvg from 'app/sider/velkommen/components/velkommenTekst/IntroSirkelSvg';
import { AppRoutes } from 'app/routes';

const VelkommenTekst: React.FunctionComponent<RouteComponentProps> = ({ location }) => {
    const intl = useIntl();

    return (
        <Introduksjon
            ikon={<IntroSirkelSvg />}
            tittel={getMessage(intl, 'intro.tittel')}
            skjulContent={location.pathname !== AppRoutes.startside && location.pathname !== `${AppRoutes.startside}/`}>
            <Block margin="xxs">
                <Block margin="s">
                    <Ingress tag="div">
                        <FormattedMessage id="intro.tekst" />
                    </Ingress>
                </Block>
                <UtvidetInformasjon apneLabel={getMessage(intl, 'intro.begrensninger.tittel')}>
                    <Block margin="s">
                        <Block margin="xs">
                            <Element tag="h3">
                                <FormattedMessage id="intro.begrensninger.tittel" />
                            </Element>
                        </Block>
                        <ul>
                            <FormattedMessage id="intro.begrensninger.del1" tagName="li" />
                            <FormattedMessage id="intro.begrensninger.del2" tagName="li" />
                            <FormattedMessage id="intro.begrensninger.del3" tagName="li" />
                            <FormattedMessage id="intro.begrensninger.del4" tagName="li" />
                        </ul>
                    </Block>
                </UtvidetInformasjon>
            </Block>
        </Introduksjon>
    );
};

export default withRouter(VelkommenTekst);
