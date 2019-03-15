import * as React from 'react';
import { Situasjon, OmForeldre } from '../../types';
import BEMHelper from 'common/utils/bem';
import OppsummeringBlokk from '../oppsummeringBlokk/OppsummeringBlokk';
import AntallBarnSirkel from './antallBarnSirkel/AntallBarnSirkel';

import SituasjonSirkel from './situasjonSirkel/SituasjonSirkel';
import SpebarnSirkel from './spebarnSirkel/SpebarnSirkel';
import { formaterDatoUtenDag } from 'common/utils/datoUtils';
import getMessage from 'common/utils/i18nUtils';
import { injectIntl, InjectedIntlProps, FormattedHTMLMessage } from 'react-intl';
import { getAntallForeldreISituasjon } from '../../utils/common';

export interface SituasjonsoppsummeringProps {
    situasjon: Situasjon;
    omForeldre: OmForeldre;
    antallBarn: number;
    familiehendelsesdato: Date;
    kompakt?: boolean;
    onRequestChange: () => void;
}

const bem = BEMHelper('oppsummering');

const getOppsummeringTittel = (antallForeldre: number, antallBarn: number): string => {
    return `${antallForeldre === 1 ? 'Du' : 'Dere'} og ${antallBarn === 1 ? 'barnet' : 'barna'}`;
};

const Situasjonsoppsummering: React.StatelessComponent<SituasjonsoppsummeringProps & InjectedIntlProps> = (props) => {
    const { antallBarn, familiehendelsesdato, omForeldre, onRequestChange, situasjon, kompakt, intl } = props;
    const { bareFar, farMedmor, mor, erDeltOmsorg } = omForeldre;

    const foreldre = erDeltOmsorg && farMedmor ? `Dere` : 'Du';
    const barn = getMessage(intl, `antallBarn.alternativ.barn-${antallBarn}`);
    const termin = formaterDatoUtenDag(familiehendelsesdato);

    return (
        <OppsummeringBlokk
            onRequestChange={onRequestChange}
            tittel={getOppsummeringTittel(getAntallForeldreISituasjon(situasjon), antallBarn)}>
            {kompakt ? (
                <FormattedHTMLMessage
                    id="oppsummering.situasjon.html"
                    values={{
                        foreldre,
                        barn,
                        termin
                    }}
                />
            ) : (
                <div className={bem.block}>
                    <div className={bem.element('deloppsummering')}>
                        <SituasjonSirkel {...props} valgtForelder={omForeldre.forelderVedAleneomsorg} />
                        <div className={bem.element('verdi')}>
                            {erDeltOmsorg === false && (
                                <span className={bem.element('navn')}>
                                    {bareFar && farMedmor ? farMedmor.navn : mor.navn}
                                </span>
                            )}
                            {erDeltOmsorg && farMedmor && (
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
                            {getMessage(intl, `antallBarn.alternativ.Barn-${antallBarn}`)}
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
            )}
        </OppsummeringBlokk>
    );
};

export default injectIntl(Situasjonsoppsummering);
