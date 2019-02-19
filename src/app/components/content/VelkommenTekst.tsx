import * as React from 'react';
import Introduksjon from '../introduksjon/Introduksjon';
import IntroSirkelSvg from '../illustrasjoner/IntroSirkelSvg';
import Block from 'common/components/block/Block';
import { Ingress } from 'nav-frontend-typografi';
import { withRouter, RouteComponentProps } from 'react-router';
import { Pages } from '../../routes';

const VelkommenTekst: React.StatelessComponent<RouteComponentProps> = (props) => (
    <Introduksjon
        ikon={<IntroSirkelSvg />}
        tittel="Planlegg dine foreldrepenger"
        skjulContent={props.location.pathname === Pages.planPage}>
        <Block margin="xxs">
            <Ingress>
                Her kan dere planlegge hvor mange uker dere kan ta ut foreldrepenger, og hvordan dere kan utsette
                perioder med foreldrepenger.
            </Ingress>
        </Block>
    </Introduksjon>
);

export default withRouter(VelkommenTekst);
