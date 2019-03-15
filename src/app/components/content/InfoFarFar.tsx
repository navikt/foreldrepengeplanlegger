import * as React from 'react';
import Block from 'common/components/block/Block';
import { Undertittel, Element } from 'nav-frontend-typografi';

interface Props {}

const InfoFarFar: React.StatelessComponent<Props> = (props) => (
    <>
        <Block margin="s">
            <Undertittel>Far og far</Undertittel>
        </Block>
        <p>
            Hvordan foreldrepengeperioden er delt mellom dere, kommer an på om dere får barn ved surrogati og den andre
            stebarnsadopterer, eller om dere begge er adoptivforeldre til samme barn.
        </p>
        <Element>Surrogati</Element>
        <p>
            Du som er biologisk far til barnet får vanligvis hele foreldrepengeperioden som far 1. Dersom den andre
            faren stebarnsadopterer kan han ta ut kvote og være hjemme i fellesperioden, men det er da aktivitetskrav.
        </p>
        <Element>Hvis dere begge er adoptivforeldre</Element>
        <p>
            Dere kan velge hvem av dere som skal starte foreldrepengeperioden som far 1. Dere får begge kvote, men det
            aktivitetskrav til far 1 når far 2 skal være hjemme i fellesperioden.
        </p>
    </>
);

export default InfoFarFar;
