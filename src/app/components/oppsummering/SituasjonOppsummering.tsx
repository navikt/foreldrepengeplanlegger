import * as React from 'react';
import { Situasjon, Forelder } from '../../types';
import BEMHelper from 'common/utils/bem';
import OppsummeringBlokk from '../oppsummeringBlokk/OppsummeringBlokk';
import AntallBarnSirkel from './antallBarnSirkel/AntallBarnSirkel';

import SituasjonSirkel from './situasjonSirkel/SituasjonSirkel';
import SpebarnSirkel from './spebarnSirkel/SpebarnSirkel';
import { formaterDatoUtenDag } from 'common/utils/datoUtils';
import getMessage from 'common/utils/i18nUtils';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { getAntallForeldreISituasjon } from '../../utils/common';

export interface SituasjonsoppsummeringProps {
    situasjon: Situasjon;
    antallBarn: number;
    familiehendelsesdato: Date;
    navnMor: string;
    navnFarMedmor?: string;
    valgtForelder?: Forelder;
    onRequestChange: () => void;
}

const bem = BEMHelper('oppsummering');

const getOppsummeringTittel = (antallForeldre: number, antallBarn: number): string => {
    return `${antallForeldre === 1 ? 'Du' : 'Dere'} og ${antallBarn === 1 ? 'barnet' : 'barna'}`;
};

const Situasjonsoppsummering: React.StatelessComponent<SituasjonsoppsummeringProps & InjectedIntlProps> = (props) => (
    <OppsummeringBlokk
        onRequestChange={props.onRequestChange}
        tittel={getOppsummeringTittel(getAntallForeldreISituasjon(props.situasjon), props.antallBarn)}>
        <div className={bem.block}>
            <div className={bem.element('deloppsummering')}>
                <SituasjonSirkel {...props} />
                <div className={bem.element('verdi')}>
                    <span className={bem.element('navn')}>{props.navnMor}</span>
                    {props.navnFarMedmor && <span className={bem.element('navn')}> og {props.navnFarMedmor}</span>}
                </div>
            </div>
            <div className={bem.element('deloppsummering')}>
                <AntallBarnSirkel antallBarn={props.antallBarn} />
                <div className={bem.element('verdi')}>
                    {getMessage(props.intl, `antallBarn.alternativ.barn-${props.antallBarn}`)}
                </div>
            </div>
            <div className={bem.element('deloppsummering')}>
                <SpebarnSirkel />
                <div className={bem.element('verdi')}>
                    <div>Termin</div>
                    {formaterDatoUtenDag(props.familiehendelsesdato)}
                </div>
            </div>
        </div>
    </OppsummeringBlokk>
);

export default injectIntl(Situasjonsoppsummering);
