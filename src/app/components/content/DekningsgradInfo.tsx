import * as React from 'react';
import { Dekningsgrad } from 'common/types';
import BEMHelper from 'common/utils/bem';
import { Undertittel, Ingress } from 'nav-frontend-typografi';
import Block from 'common/components/block/Block';
import { TilgjengeligeDager, OmForeldre } from '../../types';
import TilgjengeligeDagerGraf from '../tilgjengeligeDagerGraf/TilgjengeligeDagerGraf';

import './dekningsgradInfo.less';
import PengerIkon from 'common/components/ikoner/PengerIkon';

interface Props {
    dekningsgrad: Dekningsgrad;
    tilgjengeligeDager: TilgjengeligeDager;
    omForeldre: OmForeldre;
}

const DekningsgradInfo: React.StatelessComponent<Props> = ({ omForeldre, tilgjengeligeDager, dekningsgrad }) => {
    const bem = BEMHelper('dekningsgradInfo');
    const dekningsSum = dekningsgrad === '100' ? '22 000' : '17 600';
    return (
        <section className={bem.block}>
            <Block margin="xs">
                <Undertittel tag="h1">49 uker med 100 prosent foreldrepenger</Undertittel>
            </Block>
            <p>
                Når begge foreldrene har rett til foreldrepenger består foreldrepengeperioden av mødrekvoten,
                fedrekvoten og en fellesperiode som dere kan dele.
            </p>

            <Block margin="m">
                <TilgjengeligeDagerGraf omForeldre={omForeldre} tilgjengeligeDager={tilgjengeligeDager} />
                {tilgjengeligeDager.dagerForeldrepengerFørFødsel > 0 && (
                    <Block marginTop="xs">
                        <sup>*</sup> {omForeldre.mor.navn} får tre uker med foreldrepenger før termin i tilegg til sin
                        egen kvote.
                    </Block>
                )}
            </Block>
            <Block>
                <div className={bem.element('utbetaling')}>
                    <div className={bem.child('utbetaling').element('ikon')}>
                        <PengerIkon />
                    </div>
                    <Ingress tag="p" className={bem.child('utbetaling').element('tekst')}>
                        {dekningsSum} kroner per måned
                    </Ingress>
                </div>
                <em>Eksempel på utbetaling med fast inntekt på 22 000 kroner per måned</em>
            </Block>
        </section>
    );
};

export default DekningsgradInfo;
