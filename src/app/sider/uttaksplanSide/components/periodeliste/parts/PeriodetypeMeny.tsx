import * as React from 'react';
import { injectIntl, InjectedIntlProps, InjectedIntl, FormattedMessage } from 'react-intl';
import { Periodetype, Forelder } from '../../../../../types';
import getMessage from 'common/util/i18nUtils';
import DropdownFormMenu, { DropdownFormMenuOption } from 'common/components/dropdownForm/DropdownFormMenu';
import DropdownForm, { DropdownFormStyle } from 'common/components/dropdownForm/DropdownForm';
import Periodeikon from '../../periodeikon/Periodeikon';
import IconText from 'common/components/iconText/IconText';
import Varighet from '../../../../../../common/components/varighet/Varighet';
import Features from '../../../../../features';
import { getVarighetString } from 'common/util/intlUtils';

interface OwnProps {
    type?: Periodetype;
    forelder?: Forelder;
    foreldernavn?: string;
    uttaksdager?: number;
    brukteUttaksdager?: number;
    gradering?: number;
    dropdownStyle?: DropdownFormStyle;
    kanVelgeUlønnetPermisjon?: boolean;
    disabled?: boolean;
    onChange: (periodetype: Periodetype) => void;
}

type Props = OwnProps & InjectedIntlProps;

const getOptions = (intl: InjectedIntl, kanVelgeUlønnetPermisjon?: boolean): DropdownFormMenuOption[] => {
    return [
        {
            value: Periodetype.UttakFørTermin,
            label: getMessage(intl, `periodetype.${Periodetype.UttakFørTermin}`),
            hidden: true
        },
        { value: Periodetype.Uttak, label: getMessage(intl, `periodetype.${Periodetype.Uttak}`) },
        { value: Periodetype.GradertUttak, label: getMessage(intl, `periodetype.${Periodetype.GradertUttak}`) },
        { value: Periodetype.Ferie, label: getMessage(intl, `periodetype.${Periodetype.Ferie}`) },
        { value: Periodetype.Arbeid, label: getMessage(intl, `periodetype.${Periodetype.Arbeid}`) },
        ...(kanVelgeUlønnetPermisjon
            ? [
                  {
                      value: Periodetype.UlønnetPermisjon,
                      label: getMessage(intl, `periodetype.${Periodetype.UlønnetPermisjon}`)
                  }
              ]
            : [])
    ];
};

const getPeriodetypeLabel = (type: Periodetype | undefined, intl: InjectedIntl): string => {
    return getMessage(intl, `periodetype.${type}`);
};

const PeriodetypeMenyLabel: React.StatelessComponent<Props> = ({
    type,
    forelder,
    uttaksdager,
    gradering,
    brukteUttaksdager,
    intl
}) => {
    const erArbeidEllerFerie = type === Periodetype.Ferie || type === Periodetype.Arbeid;
    const getVarighetInfo = () => {
        if (erArbeidEllerFerie && uttaksdager) {
            return <Varighet dager={uttaksdager} separator=" og " />;
        } else if (type === Periodetype.UlønnetPermisjon && uttaksdager) {
            return <Varighet dager={uttaksdager} separator=" og " />;
        } else if (
            Features.avrundGraderingPerPeriode === false &&
            type === Periodetype.GradertUttak &&
            uttaksdager &&
            gradering
        ) {
            return (
                <FormattedMessage
                    id="periodeliste.graderteDager"
                    values={{
                        dager: getVarighetString(uttaksdager, intl),
                        gradering
                    }}
                />
            );
        } else if (brukteUttaksdager !== undefined) {
            return (
                <span>
                    {getMessage(intl, 'periodeliste.dagerMedForeldrepenger', {
                        dager: getVarighetString(brukteUttaksdager, intl)
                    })}
                </span>
            );
        }
        return null;
    };
    return type ? (
        <IconText fullWidth={true} icon={<Periodeikon periodetype={type} forelder={forelder} />}>
            <div className="periodetypeMenyLabel">
                <div className="periodetypeMenyLabel__type">{getPeriodetypeLabel(type, intl)}</div>
                <div className="periodetypeMenyLabel__tidsperiode">{getVarighetInfo()}</div>
            </div>
        </IconText>
    ) : (
        <span>Velg type</span>
    );
};

const PeriodetypeMeny: React.StatelessComponent<Props> = (props) => {
    const { disabled, intl, type, dropdownStyle = 'filled', onChange, kanVelgeUlønnetPermisjon } = props;
    return (
        <DropdownForm
            disabled={disabled}
            onSelection={onChange}
            labelRenderer={() => <PeriodetypeMenyLabel {...props} />}
            contentClassName="periodetypeDialog"
            contentTitle={getMessage(intl, 'periodeliste.velgPeriodetype')}
            style={dropdownStyle}
            contentRenderer={() => (
                <DropdownFormMenu options={getOptions(intl, kanVelgeUlønnetPermisjon)} selectedValue={type} />
            )}
        />
    );
};

export default injectIntl(PeriodetypeMeny);
