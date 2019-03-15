import * as React from 'react';
import { Dekningsgrad } from 'common/types';
import BEMHelper from 'common/utils/bem';
import { Undertittel, Ingress } from 'nav-frontend-typografi';
import Block from 'common/components/block/Block';
import { TilgjengeligeDager, OmForeldre, Situasjon, Forelder } from '../../types';
import TilgjengeligeDagerGraf from '../tilgjengeligeDagerGraf/TilgjengeligeDagerGraf';
import PengerIkon from 'common/components/ikoner/PengerIkon';
import Situasjonsinfo from '../situasjonsskjema/parts/velgSituasjon/SituasjonInfo';

import './dekningsgradInfo.less';

interface Props {
    situasjon: Situasjon;
    dekningsgrad: Dekningsgrad;
    tilgjengeligeDager: TilgjengeligeDager;
    omForeldre: OmForeldre;
    flerbarnsdager: number;
}

const DekningsgradInfo: React.StatelessComponent<Props> = ({
    omForeldre,
    tilgjengeligeDager,
    dekningsgrad,
    situasjon,
    flerbarnsdager
}) => {
    const bem = BEMHelper('dekningsgradInfo');
    const dekningsSum = dekningsgrad === '100' ? '22 000' : '17 600';
    const rolle = omForeldre.erDeltOmsorg ? undefined : omForeldre.bareMor ? Forelder.mor : Forelder.farMedmor;
    return (
        <div className={bem.block}>
            <Block margin="xs">
                <Undertittel tag="h3">
                    {tilgjengeligeDager.dagerTotalt / 5} uker med {dekningsgrad} prosent foreldrepenger
                </Undertittel>
            </Block>
            <Block margin="s">
                <Situasjonsinfo situasjon={situasjon} forelder={rolle} flerbarnsdager={flerbarnsdager} />
            </Block>

            <Block margin="m">
                <TilgjengeligeDagerGraf omForeldre={omForeldre} tilgjengeligeDager={tilgjengeligeDager} />
                {tilgjengeligeDager.dagerForeldrepengerFørFødsel > 0 && (
                    <Block marginTop="xs">
                        {omForeldre.erDeltOmsorg ? omForeldre.mor.navn : 'Du'} får tre uker med foreldrepenger som må
                        tas ut før termin.
                    </Block>
                )}
            </Block>
            <Block margin="none">
                <Block margin="xs">
                    <Undertittel>Eksempel på utbetaling</Undertittel>
                </Block>
                <p>Eksempel på utbetaling med fast inntekt på 22 000 kroner per måned før skatt</p>
                <div className={bem.element('utbetaling')}>
                    <div className={bem.child('utbetaling').element('ikon')}>
                        <PengerIkon />
                    </div>
                    <Ingress tag="p" className={bem.child('utbetaling').element('tekst')}>
                        {dekningsSum} kroner per måned før skatt
                    </Ingress>
                </div>
            </Block>
        </div>
    );
};

export default DekningsgradInfo;
