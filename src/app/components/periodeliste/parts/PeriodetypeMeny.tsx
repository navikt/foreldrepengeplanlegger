import * as React from 'react';
import { injectIntl, InjectedIntlProps, InjectedIntl } from 'react-intl';
import { Periodetype, Forelder } from '../../../types';
import getMessage from 'common/utils/i18nUtils';
// import { Tidsperioden, isValidTidsperiode } from '../../../utils/Tidsperioden';
import { Tidsperiode } from 'nav-datovelger/src/datovelger/types';
import DropdownFormMenu, { DropdownFormMenuOption } from 'common/components/dropdownForm/DropdownFormMenu';
import DropdownForm from 'common/components/dropdownForm/DropdownForm';
import Periodeikon from '../../periodeikon/Periodeikon';
import IconText from 'common/components/iconText/IconText';
import { isValidTidsperiode, Tidsperioden } from '../../../utils/Tidsperioden';
import Varighet from '../../varighet/Varighet';

interface OwnProps {
    type?: Periodetype;
    tidsperiode?: Tidsperiode;
    forelder?: Forelder;
    flereForeldre: boolean;
    foreldernavn?: string;
    erLåst?: boolean;
    brukteUttaksdager?: number;
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
    tidsperiode,
    forelder,
    flereForeldre,
    foreldernavn,
    brukteUttaksdager,
    intl
}) => {
    const visForelder = false;
    const visTidsperiode = false;
    return type ? (
        <IconText fullWidth={true} icon={<Periodeikon periodetype={type} forelder={forelder} />}>
            <div className="periodetypeMenyLabel">
                <div className="periodetypeMenyLabel__type">{getPeriodetypeLabel(type, intl)}</div>
                <div className="periodetypeMenyLabel__tidsperiode">
                    {brukteUttaksdager !== undefined && (
                        <span>
                            <Varighet dager={brukteUttaksdager} /> med foreldrepenger
                        </span>
                    )}
                    {visForelder && flereForeldre && foreldernavn && <span>{foreldernavn}</span>}
                    {visTidsperiode &&
                        isValidTidsperiode(tidsperiode) &&
                        Tidsperioden(tidsperiode).formaterStringKort(intl)}
                </div>
            </div>
        </IconText>
    ) : (
        <span>Velg type periode</span>
    );
};

const PeriodetypeMeny: React.StatelessComponent<Props> = (props) => {
    const { erLåst, intl, type, onChange } = props;
    return (
        <DropdownForm
            disabled={erLåst}
            onSelection={onChange}
            labelRenderer={() => <PeriodetypeMenyLabel {...props} />}
            contentClassName="periodetypeDialog"
            contentTitle="Velg type periode"
            contentRenderer={() => <DropdownFormMenu options={getOptions(intl)} selectedValue={type} />}
        />
    );
};

export default injectIntl(PeriodetypeMeny);
