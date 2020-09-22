import * as React from 'react';
import BEMHelper from 'common/util/bem';
import OppsummeringBlokk from './oppsummeringBlokk/OppsummeringBlokk';
import { FormattedMessage, useIntl } from 'react-intl';
import { Dekningsgrad } from 'common/types';
import UkerSirkel from './ukerSirkel/UkerSirkel';
import { getVarighetString } from 'common/util/intlUtils';
import getMessage from 'common/util/i18nUtils';
import { TilgjengeligeDager, OmForeldre } from 'shared/types';

export interface DekningOppsummeringProps {
    omForeldre: OmForeldre;
    dekningsgrad: Dekningsgrad;
    tilgjengeligeDager: TilgjengeligeDager;
    onRequestChange: () => void;
}

const bem = BEMHelper('oppsummering');

const DekningOppsummering: React.FunctionComponent<DekningOppsummeringProps> = ({
    omForeldre,
    tilgjengeligeDager,
    dekningsgrad,
    onRequestChange,
}) => {
    const intl = useIntl();
    const uker = tilgjengeligeDager.dagerTotalt / 5;
    return (
        <OppsummeringBlokk
            onRequestChange={onRequestChange}
            tittel={getMessage(intl, `oppsummering.dekning.tittel.${omForeldre.erDeltOmsorg ? 'deres' : 'din'}`)}
            illustrasjoner={
                <div className={bem.classNames(bem.element('deler', 'illustrasjoner'))}>
                    <div className={bem.element('illustrasjon')}>
                        <UkerSirkel uker={uker} />
                    </div>
                </div>
            }>
            <div>
                <FormattedMessage
                    id="oppsummering.dekning.harValgt"
                    values={{
                        antallForeldre: omForeldre.erDeltOmsorg ? 2 : 1,
                        varighet: getVarighetString(tilgjengeligeDager.dagerTotalt, intl),
                        strong: (msg: any) => <strong>{msg}</strong>,
                        dekningsgrad,
                    }}
                />
            </div>
        </OppsummeringBlokk>
    );
};

export default DekningOppsummering;
