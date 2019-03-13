import * as React from 'react';
import { Dekningsgrad } from 'common/types';
import BEMHelper from 'common/utils/bem';
import { Undertittel, Ingress } from 'nav-frontend-typografi';
import Block from 'common/components/block/Block';
import { TilgjengeligeDager, OmForeldre, Situasjon, Forelder } from '../../types';
import TilgjengeligeDagerGraf from '../tilgjengeligeDagerGraf/TilgjengeligeDagerGraf';
import PengerIkon from 'common/components/ikoner/PengerIkon';

import './dekningsgradInfo.less';
import Situasjonsinfo from '../situasjonsskjema/parts/velgSituasjon/SituasjonInfo';

interface Props {
    situasjon: Situasjon;
    dekningsgrad: Dekningsgrad;
    tilgjengeligeDager: TilgjengeligeDager;
    omForeldre: OmForeldre;
}

const DekningsgradInfo: React.StatelessComponent<Props> = ({
    omForeldre,
    tilgjengeligeDager,
    dekningsgrad,
    situasjon
}) => {
    const bem = BEMHelper('dekningsgradInfo');
    const dekningsSum = dekningsgrad === '100' ? '22 000' : '17 600';
    const rolle = omForeldre.erDeltOmsorg ? undefined : omForeldre.erAleneomsorgMor ? Forelder.mor : Forelder.farMedmor;
    return (
        <section className={bem.block}>
            <Block margin="xs">
                <Undertittel tag="h1">
                    {tilgjengeligeDager.dagerTotalt / 5} uker med {dekningsgrad} prosent foreldrepenger
                </Undertittel>
            </Block>
            <Block margin="s">
                <Situasjonsinfo situasjon={situasjon} forelder={rolle} />
            </Block>

            <Block margin="m">
                <TilgjengeligeDagerGraf omForeldre={omForeldre} tilgjengeligeDager={tilgjengeligeDager} />
                {tilgjengeligeDager.dagerForeldrepengerFørFødsel > 0 && (
                    <Block marginTop="xs">
                        <sup>*</sup> {omForeldre.mor.navn} får tre uker med foreldrepenger før termin i tilegg til sin
                        egen kvote.
                    </Block>
                )}
            </Block>
            <Block margin="none">
                <div className={bem.element('utbetaling')}>
                    <div className={bem.child('utbetaling').element('ikon')}>
                        <PengerIkon />
                    </div>
                    <Ingress tag="p" className={bem.child('utbetaling').element('tekst')}>
                        {dekningsSum} kroner per måned
                    </Ingress>
                </div>
                Eksempel på utbetaling med fast inntekt på 22 000 kroner per måned
            </Block>
        </section>
    );
};

export default DekningsgradInfo;
