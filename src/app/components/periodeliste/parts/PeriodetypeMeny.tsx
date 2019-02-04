import * as React from 'react';
import { injectIntl, InjectedIntlProps, InjectedIntl } from 'react-intl';
import { Periodetype, Forelder } from '../../../types';
import MenuButton, { MenuButtonOption } from 'common/components/menuButton/MenuButton';
import Periodeikon from '../../periodeikon/Periodeikon';
import getMessage from 'common/utils/i18nUtils';
import { Tidsperioden } from '../../../utils/Tidsperioden';
import DropdownDialogTittel from './DropdownDialogTittel';
import { Tidsperiode } from 'nav-datovelger/src/datovelger/types';

interface OwnProps {
    type?: Periodetype;
    tidsperiode?: Tidsperiode;
    forelder?: Forelder;
    flereForeldre: boolean;
    foreldernavn?: string;
    erLåst?: boolean;
    onChange: (periodetype: Periodetype) => void;
}

type Props = OwnProps & InjectedIntlProps;

const getOptions = (intl: InjectedIntl): MenuButtonOption[] => [
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
    flereForeldre,
    foreldernavn,
    intl
}) => {
    return (
        <div className="periodetypeMenyLabel">
            <div className="periodetypeMenyLabel__type">
                {getPeriodetypeLabel(type, intl)}
                {flereForeldre && foreldernavn && <span> - {foreldernavn}</span>}
            </div>
            {tidsperiode && (
                <div className="periodetypeMenyLabel__tidsperiode">
                    {Tidsperioden(tidsperiode).formaterStringKort(intl)}
                </div>
            )}
        </div>
    );
};

const PeriodetypeMeny: React.StatelessComponent<Props> = (props) => {
    const { erLåst, intl, type, forelder, onChange } = props;
    return (
        <MenuButton
            disabled={erLåst}
            options={getOptions(intl)}
            onChange={(value) => onChange(value as Periodetype)}
            selectedValue={type}
            iconRenderer={(option) => <Periodeikon periodetype={option.value as Periodetype} forelder={forelder} />}
            dialogClassName={'periodetypeDialog'}
            headerRenderer={() => <DropdownDialogTittel>Velg type periode</DropdownDialogTittel>}
            labelRenderer={() => <PeriodetypeMenyLabel {...props} />}
        />
    );
};

export default injectIntl(PeriodetypeMeny);
