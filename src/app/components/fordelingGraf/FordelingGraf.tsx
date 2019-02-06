import * as React from 'react';
import classNames from 'classnames';
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
        <div className={classNames(bem.element('tittel'), { [`${bem.element('tittel', 'error')}`]: dager < 0 })}>
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
    const { farMedmor, mor, dagerGjenstaende } = fordeling;
    return (
        <div className={bem.block}>
            <div className={bem.element('titler')}>
                <Tittel navn={omForeldre.mor ? omForeldre.mor.navn : 'Brukt'} dager={mor.uttaksdager} intl={intl} />
                {omForeldre.farMedmor && (
                    <Tittel
                        navn={omForeldre.farMedmor.navn}
                        dager={farMedmor ? farMedmor.uttaksdager : undefined}
                        intl={intl}
                    />
                )}
                <Tittel navn="Gjenstående" dager={dagerGjenstaende} intl={intl} />
            </div>
            <div className={bem.element('graf')} role="presentation">
                <div className={bem.element('graf__bar bkg-mor')} style={{ width: `${mor.pst}%` }} />
                {farMedmor && (
                    <div className={bem.element('graf__bar bkg-farMedmor')} style={{ width: `${farMedmor.pst}%` }} />
                )}
            </div>
        </div>
    );
};

export default injectIntl(FordelingGraf);
