import * as React from 'react';
import { Situasjon } from '../../types';
import BEMHelper from 'common/utils/bem';
import OppsummeringBlokk from '../oppsummeringBlokk/OppsummeringBlokk';
import AntallBarnSirkel from './antallBarnSirkel/AntallBarnSirkel';

import SituasjonSirkel from './situasjonSirkel/SituasjonSirkel';
import SpebarnSirkel from './spebarnSirkel/SpebarnSirkel';
import { formaterDato } from 'common/utils/datoUtils';

import './situasjonOppsummering.less';

interface Props {
    situasjon: Situasjon;
    antallBarn: number;
    familiehendelsesdato: Date;
    navnMor: string;
    navnFarMedmor?: string;
    onRequestChange: () => void;
}

const bem = BEMHelper('situasjonOppsummering');

const Situasjonsoppsummering: React.StatelessComponent<Props> = (props) => (
    <OppsummeringBlokk onRequestChange={props.onRequestChange} tittel="Dere og barnet">
        <div className={bem.block}>
            <div className={bem.element('oppsummering')}>
                <SituasjonSirkel {...props} />
                <div className={bem.element('verdi')}>
                    <span className={bem.element('navn')}>{props.navnMor}</span>
                    {props.navnFarMedmor && <span className={bem.element('navn')}> og {props.navnFarMedmor}</span>}
                </div>
            </div>
            <div className={bem.element('oppsummering')}>
                <AntallBarnSirkel antallBarn={props.antallBarn} />
                <div className={bem.element('verdi')}>{props.antallBarn} barn</div>
            </div>
            <div className={bem.element('oppsummering')}>
                <SpebarnSirkel />
                <div className={bem.element('verdi')}>{formaterDato(props.familiehendelsesdato)}</div>
            </div>
        </div>
    </OppsummeringBlokk>
);

export default Situasjonsoppsummering;
