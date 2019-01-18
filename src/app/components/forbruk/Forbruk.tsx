import * as React from 'react';
import { Periodetype, Forelder } from '../../types';
import BEMHelper from 'common/utils/bem';
import { Element, Ingress } from 'nav-frontend-typografi';

import './forbruk.less';

export type PeriodeForbruk = ForelderForbruk[];

export interface ForelderForbruk {
    forelder: Forelder;
    brukteUttaksdager: number;
    periodeForbruk: ForbrukPeriode[];
}

export interface ForbrukPeriode {
    periodetype: Periodetype;
    uttaksdagerIPeriodene: number;
    helligdagerIPeriodene: number;
}

interface Props {
    forbruk: PeriodeForbruk;
}

const bem = BEMHelper('forbrukOppsummering');

const Forbruk: React.StatelessComponent<Props> = ({ forbruk }) => {
    return (
        <div className={bem.block}>
            {forbruk.map((forelderForbruk) => (
                <div key={forelderForbruk.forelder} className={bem.element('forelder')}>
                    <Ingress tag="h1" className={bem.element('navn')}>
                        {forelderForbruk.forelder}
                    </Ingress>
                    <div className={bem.element('periode')}>
                        <Element tag="h2" className={bem.element('periodetype')}>
                            Totalt brukte dager:
                        </Element>
                        <span className={bem.element('dager')}>{forelderForbruk.brukteUttaksdager}</span>
                    </div>

                    {forelderForbruk.periodeForbruk.map((pf) => {
                        return (
                            <div key={pf.periodetype} className={bem.element('periode')}>
                                <Element tag="h2" className={bem.element('periodetype')}>
                                    {pf.periodetype}:
                                </Element>
                                <span className={bem.element('dager')}>{pf.uttaksdagerIPeriodene}</span>
                                {pf.periodetype === Periodetype.Ferie &&
                                    pf.helligdagerIPeriodene > 0 && (
                                        <span className={bem.element('helligdager')}>
                                            ({pf.helligdagerIPeriodene} helligdager)
                                        </span>
                                    )}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default Forbruk;
