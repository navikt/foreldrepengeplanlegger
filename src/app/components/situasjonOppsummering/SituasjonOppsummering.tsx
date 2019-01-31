import * as React from 'react';
import { Situasjon } from '../../types';
import BEMHelper from 'common/utils/bem';
import SituasjonForeldrepar from '../situasjonForeldrepar/SituasjonForeldrepar';

import './situasjonOppsummering.less';
import BarnIkon from 'common/components/ikoner/BarnIkon';

interface Props {
    situasjon: Situasjon;
    antallBarn: number;
    familiehendelsesdato: Date;
    navnForelder1: string;
    navnForelder2?: string;
}

const bem = BEMHelper('situasjonOppsummering');

const renderBarn = (antall: number) => {
    const barn: React.ReactNode[] = [];
    while (barn.length < antall) {
        barn.push(<BarnIkon key={barn.length} />);
    }
    return barn;
};

const Situasjonsoppsummering: React.StatelessComponent<Props> = ({
    situasjon,
    navnForelder2,
    navnForelder1,
    antallBarn
}) => (
    <div className={bem.block}>
        <div className={bem.element('situasjon')}>
            <div className={bem.element('situasjon__ikon')}>
                <SituasjonForeldrepar situasjon={situasjon} />
            </div>
            <div className={bem.element('foreldre')}>
                <span className={bem.element('navn')}>{navnForelder1}</span>
                {navnForelder2 && <span className={bem.element('navn')}> og {navnForelder2}</span>}
            </div>
        </div>
        <div className={bem.element('barn')}>
            <div className={bem.element('barn__ikon')}>{renderBarn(antallBarn)}</div>
            <div className={bem.element('barn__antall')}>{antallBarn} barn</div>
        </div>
        <div className={bem.element('familiehendelsesdato')}>
            <div className="kalenderdag">
                <span className="kalenderdag__dag">23</span>
                <span className="kalenderdag__mnd">jan. 2019</span>
            </div>
            <div className={bem.element('familiehendelsesdato__tittel')}>Termin</div>
        </div>
    </div>
);

export default Situasjonsoppsummering;
