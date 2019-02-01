import * as React from 'react';
import Introduksjon from '../introduksjon/Introduksjon';
import IntroSirkelSvg from '../illustrasjoner/IntroSirkelSvg';
import Block from 'common/components/block/Block';
import { Ingress } from 'nav-frontend-typografi';
import Lesmerpanel from 'nav-frontend-lesmerpanel';
import { withRouter, RouteComponentProps } from 'react-router';

const VelkommenTekst: React.StatelessComponent<RouteComponentProps> = (props) => (
    <>
        <Introduksjon
            ikon={<IntroSirkelSvg />}
            tittel="Planlegg dine foreldrepenger"
            skjulContent={props.location.pathname === '/plan'}>
            <Block margin="xxs">
                <Ingress>
                    Her kan dere planlegge hvor mange uker dere kan ta ut foreldrepenger, og hvordan dere kan utsette
                    perioder med foreldrepenger.
                </Ingress>
            </Block>
            <Lesmerpanel apneTekst="Les om begrensninger i planleggeren" className="noPadding">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book.
            </Lesmerpanel>
        </Introduksjon>
    </>
);

export default withRouter(VelkommenTekst);
