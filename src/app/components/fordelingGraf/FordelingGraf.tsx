import * as React from 'react';
import BEMHelper from 'common/utils/bem';
import { Fordeling, OmForeldre } from '../../types';
import { InjectedIntl, injectIntl, InjectedIntlProps } from 'react-intl';
import Varighet from '../varighet/Varighet';

import './fordelingGraf.less';

interface OwnProps {
    fordeling: Fordeling;
    omForeldre: OmForeldre;
}

type Props = OwnProps & InjectedIntlProps;

const bem = BEMHelper('fordelingGraf');

const Tittel: React.StatelessComponent<{ navn: string; dager?: number; intl: InjectedIntl }> = ({ navn, dager }) => {
    if (dager === undefined) {
        return null;
    }
    return (
        <div className={bem.element('tittel')}>
            <div className={bem.element('forbruk')}>
                <div className={bem.element('forbruk__navn')}>{navn}</div>
                <div className={bem.element('forbruk__dager')}>
                    <Varighet dager={dager | 0} />
                </div>
            </div>
        </div>
    );
};

const FordelingGraf: React.StatelessComponent<Props> = ({ fordeling, omForeldre, intl }) => {
    const { forelder1, forelder2, dagerGjenstaende } = fordeling;
    return (
        <div className={bem.block}>
            <div className={bem.element('titler')}>
                <Tittel
                    navn={omForeldre.forelder2 ? omForeldre.forelder1.navn : 'Brukt'}
                    dager={forelder1.uttaksdager}
                    intl={intl}
                />
                {omForeldre.forelder2 && (
                    <Tittel
                        navn={omForeldre.forelder2.navn}
                        dager={forelder2 ? forelder2.uttaksdager : undefined}
                        intl={intl}
                    />
                )}
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
