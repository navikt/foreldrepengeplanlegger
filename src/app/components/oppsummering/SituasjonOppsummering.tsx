import * as React from 'react';
import { Situasjon, OmForeldre } from '../../types';
import BEMHelper from 'common/utils/bem';
import OppsummeringBlokk from '../oppsummeringBlokk/OppsummeringBlokk';
import AntallBarnSirkel from './antallBarnSirkel/AntallBarnSirkel';
import SituasjonSirkel from './situasjonSirkel/SituasjonSirkel';
import { formaterDatoUtenDag } from 'common/utils/datoUtils';
import getMessage from 'common/utils/i18nUtils';
import { injectIntl, InjectedIntlProps, FormattedHTMLMessage } from 'react-intl';

export interface SituasjonsoppsummeringProps {
    situasjon: Situasjon;
    omForeldre: OmForeldre;
    antallBarn: number;
    familiehendelsesdato: Date;
    onRequestChange: () => void;
}

const bem = BEMHelper('oppsummering');

const Situasjonsoppsummering: React.StatelessComponent<SituasjonsoppsummeringProps & InjectedIntlProps> = (props) => {
    const { antallBarn, familiehendelsesdato, omForeldre, onRequestChange, intl } = props;
    const barn = getMessage(intl, `antallBarn.alternativ.barn-${antallBarn}`);
    const termin = formaterDatoUtenDag(familiehendelsesdato);

    return (
        <OppsummeringBlokk
            onRequestChange={onRequestChange}
            tittel={getMessage(intl, 'oppsummering.situasjon.tittel', {
                antallBarn,
                antallForeldre: omForeldre.erDeltOmsorg ? 2 : 1
            })}
            illustrasjoner={
                <div className={bem.classNames(bem.element('deler', 'illustrasjoner'))}>
                    <div className={bem.element('illustrasjon')}>
                        <AntallBarnSirkel antallBarn={antallBarn} />
                    </div>
                    <div className={bem.element('illustrasjon')}>
                        <SituasjonSirkel {...props} valgtForelder={omForeldre.forelderVedAleneomsorg} />
                    </div>
                </div>
            }>
            <FormattedHTMLMessage
                id="oppsummering.situasjon.tekst"
                values={{
                    antallForeldre: omForeldre.erDeltOmsorg ? 2 : 1,
                    barn,
                    termin
                }}
            />
        </OppsummeringBlokk>
    );
};

export default injectIntl(Situasjonsoppsummering);
