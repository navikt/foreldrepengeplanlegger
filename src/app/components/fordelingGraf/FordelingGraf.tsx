import * as React from 'react';
import BEMHelper from 'common/utils/bem';
import { Fordeling } from '../../types';
import { InjectedIntl, injectIntl, InjectedIntlProps } from 'react-intl';
import Varighet from '../varighet/Varighet';

import './fordelingGraf.less';

interface OwnProps {
    fordeling: Fordeling;
    navnForelder1: string;
    navnForelder2?: string;
}

type Props = OwnProps & InjectedIntlProps;

const bem = BEMHelper('fordelingGraf');

const Tittel: React.StatelessComponent<{ navn?: string; dager?: number; intl: InjectedIntl }> = ({
    navn,
    dager,
    intl
}) => {
    if (navn === undefined || dager === undefined) {
        return null;
    }
    return (
        <div className={bem.element('tittel')}>
            <div className={bem.element('forbruk')}>
                <div className={bem.element('forbruk__navn')}>{navn}</div>
                <div className={bem.element('forbruk__dager')}>
                    <Varighet dager={dager} />
                </div>
            </div>
        </div>
    );
};

const FordelingGraf: React.StatelessComponent<Props> = ({ fordeling, navnForelder1, navnForelder2, intl }) => {
    const { forelder1, forelder2, dagerGjenstaende } = fordeling;
    return (
        <div className={bem.block}>
            <div className={bem.element('titler')}>
                <Tittel navn={navnForelder1} dager={forelder1.uttaksdager} intl={intl} />
                <Tittel navn={navnForelder2} dager={forelder2 ? forelder2.uttaksdager : undefined} intl={intl} />
                <Tittel navn="Gjenstående" dager={dagerGjenstaende} intl={intl} />
            </div>
            <div className={bem.element('graf')} role="presentation">
                <div className={bem.element('graf__bar bkg-forelder1')} style={{ width: `${forelder1.pst}%` }} />
                {forelder2 && (
                    <div className={bem.element('graf__bar bkg-forelder2')} style={{ width: `${forelder2.pst}%` }} />
                )}
            </div>
        </div>
    );
};

export default injectIntl(FordelingGraf);
