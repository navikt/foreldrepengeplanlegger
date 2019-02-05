import * as React from 'react';
import { InjectedIntlProps, injectIntl, FormattedMessage } from 'react-intl';
import { Ingress, Normaltekst } from 'nav-frontend-typografi';
import getMessage from 'common/utils/i18nUtils';
import RangeInput from 'common/components/skjema/rangeInput/RangeInput';

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
            label={getMessage(intl, 'uttaksplan.skjema.fordeling.spørsmål')}
            ariaLabelText={getMessage(intl, 'uttaksplan.skjema.fordeling.spørsmål')}
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
                <Ingress tag="p" className="m-text-center fordelingFellesperiode--valgtVerdi">
                    <FormattedMessage
                        id="uttaksplan.skjema.fordeling.valgtVerdi"
                        values={{
                            ukerForelder: options.value,
                            ukerTotalt: options.max,
                            navnForelder: navnMor
                        }}
                    />
                </Ingress>
            )}
            valueLabelPlacement="above"
            bottomContentRenderer={(options) => (
                <Normaltekst className="m-text-center fordelingFellesperiode--bottomContent">
                    <FormattedMessage
                        id="uttaksplan.skjema.fordeling.annenForeldersFellesperiode"
                        values={{ navnFarMedmor, antallUker: options.max - options.value }}
                    />
                </Normaltekst>
            )}
        />
    );
};

export default injectIntl(FordelingFellesperiodeSpørsmål);
