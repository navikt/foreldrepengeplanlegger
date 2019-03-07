import * as React from 'react';
import { Situasjon } from '../../types';
import BEMHelper from 'common/utils/bem';
import OppsummeringBlokk from '../oppsummeringBlokk/OppsummeringBlokk';
import AntallBarnSirkel from './antallBarnSirkel/AntallBarnSirkel';

import './situasjonOppsummering.less';
import SituasjonSirkel from './situasjonSirkel/SituasjonSirkel';

interface Props {
    situasjon: Situasjon;
    antallBarn: number;
    familiehendelsesdato: Date;
    navnMor: string;
    navnFarMedmor?: string;
    onRequestChange: () => void;
}

const bem = BEMHelper('situasjonOppsummering');

const OppsummeringFamiliehendelsesdato: React.StatelessComponent<Props> = (props) => {
    const cBem = bem.child('familiehendelsesdato');
    return (
        <div className={cBem.block}>
            <div>
                <span className="kalenderdag__dag">23</span>
                <span className="kalenderdag__mnd">jan. 2019</span>
            </div>
            <div className={cBem.element('tittel')}>Termin</div>
        </div>
    );
};

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
                <OppsummeringFamiliehendelsesdato {...props} />
            </div>
        </div>
    </OppsummeringBlokk>
);

export default Situasjonsoppsummering;
