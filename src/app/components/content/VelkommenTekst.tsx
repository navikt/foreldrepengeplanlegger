import * as React from 'react';
import Introduksjon from '../introduksjon/Introduksjon';
import IntroSirkelSvg from '../illustrasjoner/IntroSirkelSvg';
import Block from 'common/components/block/Block';
import { Ingress } from 'nav-frontend-typografi';
import { withRouter, RouteComponentProps } from 'react-router';
import { AppRoutes } from '../../routes';
import getMessage from 'common/utils/i18nUtils';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';

const VelkommenTekst: React.StatelessComponent<RouteComponentProps & InjectedIntlProps> = (props) => (
    <Introduksjon
        ikon={<IntroSirkelSvg />}
        tittel={getMessage(props.intl, 'intro.tittel')}
        skjulContent={props.location.pathname !== AppRoutes.startside}>
        <Block margin="xxs">
            <Ingress>
                <FormattedMessage id="intro.tekst" />
            </Ingress>
        </Block>
    </Introduksjon>
);

export default withRouter(injectIntl(VelkommenTekst));
