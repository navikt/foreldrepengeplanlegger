import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import getMessage from 'common/utils/i18nUtils';
import RangeInput from 'common/components/skjema/rangeInput/RangeInput';

import './fordelingFellesperiode.less';
import FordelingFellesperiodeLabelRenderer from './FordelingFellesperiodeLabelRenderer';

export interface OwnProps {
    navnMor: string;
    navnFarMedmor: string;
    ukerTotalt: number;
    ukerMor: number;
    onChange: (ukerMor: number) => void;
}

const FordelingFellesperiodeSpørsmål: React.StatelessComponent<OwnProps & InjectedIntlProps> = ({
    navnMor,
    navnFarMedmor,
    ukerTotalt,
    ukerMor,
    onChange,
    intl
}) => {
    // const ukerMor = ønsketFordeling ? ønsketFordeling.ukerMor : undefined;
    return (
        <RangeInput
            label={getMessage(intl, 'uttaksplan.skjema.fordeling.spørsmål', { navn: navnMor })}
            ariaLabelText={getMessage(intl, 'uttaksplan.skjema.fordeling.spørsmål', { navn: navnMor })}
            value={ukerMor}
            min={0}
            max={ukerTotalt}
            onChange={(fellesperiodeukerMor) => onChange(fellesperiodeukerMor)}
            steppers={{
                reduceLabel: intl.formatMessage({ id: 'uttaksplan.skjema.fordeling.reduser.tooltip' }),
                increaseLabel: intl.formatMessage({ id: 'uttaksplan.skjema.fordeling.øk.tooltip' })
            }}
            ariaValueChangedMessage={(value) =>
                intl.formatMessage(
                    { id: 'uttaksplan.skjema.fordeling.valgtVerdi' },
                    {
                        ukerForelder: value,
                        ukerTotalt,
                        navnForelder: navnMor
                    }
                )
            }
            valueLabelRenderer={(options) => (
                <FordelingFellesperiodeLabelRenderer
                    options={options}
                    navnMor={navnMor}
                    navnFarMedmor={navnFarMedmor}
                />
            )}
            valueLabelPlacement="above"
        />
    );
};

export default injectIntl(FordelingFellesperiodeSpørsmål);
