import * as React from 'react';
import { TilgjengeligeDager, OmForeldre } from '../../types';
import BEMHelper from 'common/utils/bem';
import OppsummeringBlokk from '../oppsummeringBlokk/OppsummeringBlokk';
import { injectIntl, InjectedIntlProps, FormattedHTMLMessage } from 'react-intl';
import { Dekningsgrad } from 'common/types';
import UkerSirkel from './ukerSirkel/UkerSirkel';
import { getVarighetString } from 'common/utils/intlUtils';
import getMessage from 'common/utils/i18nUtils';

export interface DekningOppsummeringProps {
    omForeldre: OmForeldre;
    dekningsgrad: Dekningsgrad;
    tilgjengeligeDager: TilgjengeligeDager;
    onRequestChange: () => void;
}

const bem = BEMHelper('oppsummering');

const DekningOppsummering: React.StatelessComponent<DekningOppsummeringProps & InjectedIntlProps> = ({
    omForeldre,
    tilgjengeligeDager,
    dekningsgrad,
    onRequestChange,
    intl
}) => {
    const uker = tilgjengeligeDager.dagerTotalt / 5;
    return (
        <OppsummeringBlokk
            onRequestChange={onRequestChange}
            tittel={getMessage(intl, 'oppsummering.dekning.tittel')}
            illustrasjoner={
                <div className={bem.classNames(bem.element('deler', 'illustrasjoner'))}>
                    <div className={bem.element('illustrasjon')}>
                        <UkerSirkel uker={uker} />
                    </div>
                </div>
            }>
            <div>
                <FormattedHTMLMessage
                    id="oppsummering.dekning.harValgt"
                    values={{
                        antallForeldre: omForeldre.erDeltOmsorg ? 2 : 1,
                        varighet: getVarighetString(tilgjengeligeDager.dagerTotalt, intl),
                        dekningsgrad
                    }}
                />
            </div>
        </OppsummeringBlokk>
    );
};

export default injectIntl(DekningOppsummering);
