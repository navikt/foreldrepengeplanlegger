import * as React from 'react';
import { Situasjon, OmForeldre } from '../../types';
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
    omForeldre: OmForeldre;
    antallBarn: number;
    familiehendelsesdato: Date;
    onRequestChange: () => void;
}

const bem = BEMHelper('oppsummering');

const getOppsummeringTittel = (antallForeldre: number, antallBarn: number): string => {
    return `${antallForeldre === 1 ? 'Du' : 'Dere'} og ${antallBarn === 1 ? 'barnet' : 'barna'}`;
};

const Situasjonsoppsummering: React.StatelessComponent<SituasjonsoppsummeringProps & InjectedIntlProps> = (props) => {
    const { antallBarn, familiehendelsesdato, omForeldre, onRequestChange, situasjon, intl } = props;
    const { erAleneomsorgFarMedmor, farMedmor, mor, antallForeldre } = omForeldre;

    return (
        <OppsummeringBlokk
            onRequestChange={onRequestChange}
            tittel={getOppsummeringTittel(getAntallForeldreISituasjon(situasjon), antallBarn)}>
            <div className={bem.block}>
                <div className={bem.element('deloppsummering')}>
                    <SituasjonSirkel {...props} valgtForelder={omForeldre.rolle} />
                    <div className={bem.element('verdi')}>
                        {antallForeldre === 1 && (
                            <span className={bem.element('navn')}>
                                {erAleneomsorgFarMedmor && farMedmor ? farMedmor.navn : mor.navn}
                            </span>
                        )}
                        {antallForeldre === 2 && farMedmor && (
                            <>
                                <span className={bem.element('navn')}>{mor.navn}</span>
                                <span className={bem.element('navn')}> og {farMedmor.navn}</span>
                            </>
                        )}
                    </div>
                </div>
                <div className={bem.element('deloppsummering')}>
                    <AntallBarnSirkel antallBarn={antallBarn} />
                    <div className={bem.element('verdi')}>
                        {getMessage(intl, `antallBarn.alternativ.barn-${antallBarn}`)}
                    </div>
                </div>
                <div className={bem.element('deloppsummering')}>
                    <SpebarnSirkel />
                    <div className={bem.element('verdi')}>
                        <div>Termin</div>
                        {formaterDatoUtenDag(familiehendelsesdato)}
                    </div>
                </div>
            </div>
        </OppsummeringBlokk>
    );
};

export default injectIntl(Situasjonsoppsummering);
