import * as React from 'react';
import BEMHelper from 'common/utils/bem';
import { Forbruk } from '../../types';

import './fordelingGraf.less';
import { getVarighetString } from 'common/utils/intlUtils';
import { InjectedIntl, injectIntl, InjectedIntlProps } from 'react-intl';

interface OwnProps {
    dagerTotalt: number;
    forbruk: Forbruk;
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
    if (!navn || !dager) {
        return null;
    }
    return (
        <div className={bem.element('tittel')}>
            <div className={bem.element('forbruk')}>
                <div className={bem.element('forbruk__navn')}>{navn}</div>
                <div className={bem.element('forbruk__dager')}>{getVarighetString(dager, intl)}</div>
            </div>
        </div>
    );
};

const FordelingGraf: React.StatelessComponent<Props> = ({
    dagerTotalt,
    forbruk,
    navnForelder1,
    navnForelder2,
    intl
}) => {
    const pst = 100 / dagerTotalt;
    const pstForelder1 = pst * forbruk.forelder1.brukteUttaksdager;
    const pstForelder2 = forbruk.forelder2 ? pst * forbruk.forelder2.brukteUttaksdager : 0;
    const gjenstående =
        dagerTotalt -
        forbruk.forelder1.brukteUttaksdager -
        (forbruk.forelder2 ? forbruk.forelder2.brukteUttaksdager : 0);
    return (
        <div className={bem.block}>
            <div className={bem.element('titler')}>
                <Tittel navn={navnForelder1} dager={forbruk.forelder1.brukteUttaksdager} intl={intl} />
                <Tittel
                    navn={navnForelder2}
                    dager={forbruk.forelder2 ? forbruk.forelder2.brukteUttaksdager : undefined}
                    intl={intl}
                />
                <Tittel navn="Gjenstående" dager={gjenstående} intl={intl} />
            </div>
            <div className={bem.element('graf')} role="presentation">
                <div className={bem.element('graf__bar bkg-forelder1')} style={{ width: `${pstForelder1}%` }} />
                {forbruk.forelder2 && (
                    <div className={bem.element('graf__bar bkg-forelder2')} style={{ width: `${pstForelder2}%` }} />
                )}
            </div>
        </div>
    );
};

export default injectIntl(FordelingGraf);
