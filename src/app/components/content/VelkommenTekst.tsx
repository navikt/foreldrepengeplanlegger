import * as React from 'react';
import Introduksjon from '../introduksjon/Introduksjon';
import IntroSirkelSvg from '../illustrasjoner/IntroSirkelSvg';
import Block from 'common/components/block/Block';
import { Ingress, Element } from 'nav-frontend-typografi';
import { withRouter, RouteComponentProps } from 'react-router';
import { AppRoutes } from '../../routes';
import getMessage from 'common/utils/i18nUtils';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import Veileder from 'common/components/veileder/Veileder';
import Lenke from 'nav-frontend-lenker';
import Veilederpanel from 'nav-frontend-veilederpanel';

const VelkommenTekst: React.StatelessComponent<RouteComponentProps & InjectedIntlProps> = (props) => (
    <Introduksjon
        ikon={<IntroSirkelSvg />}
        tittel={getMessage(props.intl, 'intro.tittel')}
        skjulContent={props.location.pathname !== AppRoutes.startside}>
        <Block margin="xxs">
            <Block>
                <Veilederpanel
                    type="normal"
                    fargetema="normal"
                    svg={<Veileder farge="transparent" stil="iNavVeilederPanel" ansikt="glad" />}>
                    <Block margin="xs">
                        <Element>Du er litt tidlig ute</Element>
                    </Block>
                    <p>
                        Du har nå funnet vår nye foreldrepengeplanlegger som ikke er helt ferdig enda. Den kan oppføre
                        seg litt rart av og til, så mens vi jobber med denne, kan du heller bruke vår{' '}
                        <Lenke href="https://tjenester.nav.no/foreldrepengeplanlegger">
                            nåværende foreldrepengeplanlegger
                        </Lenke>
                        .
                    </p>
                </Veilederpanel>
            </Block>
            <Ingress>
                <FormattedMessage id="intro.tekst" />
            </Ingress>
        </Block>
    </Introduksjon>
);

export default withRouter(injectIntl(VelkommenTekst));
