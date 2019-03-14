import * as React from 'react';
import { injectIntl, InjectedIntlProps, InjectedIntl } from 'react-intl';
import { Periodetype, Forelder } from '../../../types';
import getMessage from 'common/utils/i18nUtils';
import DropdownFormMenu, { DropdownFormMenuOption } from 'common/components/dropdownForm/DropdownFormMenu';
import DropdownForm, { DropdownFormStyle } from 'common/components/dropdownForm/DropdownForm';
import Periodeikon from '../../periodeikon/Periodeikon';
import IconText from 'common/components/iconText/IconText';
import Varighet from '../../varighet/Varighet';

interface OwnProps {
    type?: Periodetype;
    forelder?: Forelder;
    foreldernavn?: string;
    erLåst?: boolean;
    uttaksdager?: number;
    brukteUttaksdager?: number;
    dropdownStyle?: DropdownFormStyle;
    onChange: (periodetype: Periodetype) => void;
}

type Props = OwnProps & InjectedIntlProps;

const getOptions = (intl: InjectedIntl): DropdownFormMenuOption[] => [
    {
        value: Periodetype.UttakFørTermin,
        label: getMessage(intl, `periodetype.${Periodetype.UttakFørTermin}`),
        hidden: true
    },
    { value: Periodetype.Uttak, label: getMessage(intl, `periodetype.${Periodetype.Uttak}`) },
    { value: Periodetype.GradertUttak, label: getMessage(intl, `periodetype.${Periodetype.GradertUttak}`) },
    { value: Periodetype.Ferie, label: getMessage(intl, `periodetype.${Periodetype.Ferie}`) },
    { value: Periodetype.Arbeid, label: getMessage(intl, `periodetype.${Periodetype.Arbeid}`) }
];

const getPeriodetypeLabel = (type: Periodetype | undefined, intl: InjectedIntl): string => {
    return getMessage(intl, `periodetype.${type}`);
};

const PeriodetypeMenyLabel: React.StatelessComponent<Props> = ({
    type,
    forelder,
    uttaksdager,
    brukteUttaksdager,
    intl
}) => {
    const erArbeidEllerFerie = type === Periodetype.Ferie || type === Periodetype.Arbeid;
    return type ? (
        <IconText fullWidth={true} icon={<Periodeikon periodetype={type} forelder={forelder} />}>
            <div className="periodetypeMenyLabel">
                <div className="periodetypeMenyLabel__type">{getPeriodetypeLabel(type, intl)}</div>
                <div className="periodetypeMenyLabel__tidsperiode">
                    {erArbeidEllerFerie && uttaksdager ? (
                        <span>
                            <Varighet dager={uttaksdager} separator=" og " />
                        </span>
                    ) : (
                        undefined
                    )}
                    {!erArbeidEllerFerie && brukteUttaksdager !== undefined && (
                        <span>
                            <Varighet dager={brukteUttaksdager} separator=" og " /> med foreldrepenger
                        </span>
                    )}
                </div>
            </div>
        </IconText>
    ) : (
        <span>Velg type</span>
    );
};

const PeriodetypeMeny: React.StatelessComponent<Props> = (props) => {
    const { erLåst, intl, type, dropdownStyle = 'filled', onChange } = props;
    return (
        <DropdownForm
            disabled={erLåst}
            onSelection={onChange}
            labelRenderer={() => <PeriodetypeMenyLabel {...props} />}
            contentClassName="periodetypeDialog"
            contentTitle="Velg type"
            style={dropdownStyle}
            contentRenderer={() => <DropdownFormMenu options={getOptions(intl)} selectedValue={type} />}
        />
    );
};

export default injectIntl(PeriodetypeMeny);
