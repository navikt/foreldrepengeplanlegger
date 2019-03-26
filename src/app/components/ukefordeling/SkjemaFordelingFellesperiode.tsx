import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import getMessage from 'common/utils/i18nUtils';
import RangeInput from 'common/components/skjema/rangeInput/RangeInput';
import FordelingFellesperiodeLabelRenderer from './FordelingFellesperiodeLabelRenderer';

import './fordelingFellesperiode.less';

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
    return (
        <RangeInput
            label={getMessage(intl, 'uttaksplan.skjema.fordeling.spørsmål', { navn: navnMor })}
            hiddenLabel={true}
            ariaLabelText={getMessage(intl, 'uttaksplan.skjema.fordeling.spørsmål', { navn: navnMor })}
            value={ukerMor}
            min={0}
            max={ukerTotalt}
            onChange={(fellesperiodeukerMor) => onChange(fellesperiodeukerMor)}
            steppers={{
                reduceLabel: intl.formatMessage(
                    { id: 'uttaksplan.skjema.fordeling.reduser.tooltip' },
                    { navn: navnFarMedmor }
                ),
                increaseLabel: intl.formatMessage({ id: 'uttaksplan.skjema.fordeling.øk.tooltip' }, { navn: navnMor })
            }}
            ariaValueChangedMessage={(value) =>
                intl.formatMessage(
                    { id: 'uttaksplan.skjema.fordeling.valgtVerdi' },
                    {
                        ukerMor: value,
                        ukerFarMedmor: ukerTotalt - value,
                        ukerTotalt,
                        navnMor,
                        navnFarMedmor
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
