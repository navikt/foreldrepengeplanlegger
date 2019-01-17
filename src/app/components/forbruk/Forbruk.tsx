import * as React from 'react';
import { Periodetype, Forelder } from '../../types';
import BEMHelper from 'common/utils/bem';
import { Element, Ingress } from 'nav-frontend-typografi';

import './forbruk.less';

export type PeriodeForbruk = ForelderForbruk[];

export interface ForelderForbruk {
    forelder: Forelder;
    periodeForbruk: ForbrukPeriode[];
}

export interface ForbrukPeriode {
    periodetype: Periodetype;
    dager: number;
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
                    {forelderForbruk.periodeForbruk.map((pf) => {
                        return (
                            <div key={pf.periodetype} className={bem.element('periode')}>
                                <Element tag="h2" className={bem.element('periodetype')}>
                                    {pf.periodetype}:
                                </Element>
                                <span className={bem.element('dager')}>{pf.dager}</span>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default Forbruk;
