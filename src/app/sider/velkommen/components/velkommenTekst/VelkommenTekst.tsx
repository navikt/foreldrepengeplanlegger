import * as React from 'react';
import Block from 'common/components/block/Block';
import { Ingress, Element } from 'nav-frontend-typografi';
import { withRouter, RouteComponentProps } from 'react-router';
import getMessage from 'common/util/i18nUtils';
import { injectIntl, InjectedIntlProps, FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import UtvidetInformasjon from 'common/components/utvidetInformasjon/UtvidetInformasjon';
import Introduksjon from 'app/components/introduksjon/Introduksjon';
import IntroSirkelSvg from 'app/sider/velkommen/components/velkommenTekst/IntroSirkelSvg';
import { AppRoutes } from 'app/routes';

const VelkommenTekst: React.StatelessComponent<RouteComponentProps & InjectedIntlProps> = ({ intl, location }) => {
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
                        <FormattedHTMLMessage id="intro.begrensninger.html" tagName="div" />
                    </Block>
                </UtvidetInformasjon>
            </Block>
        </Introduksjon>
    );
};

export default withRouter(injectIntl(VelkommenTekst));
