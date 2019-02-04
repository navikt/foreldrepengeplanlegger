import * as React from 'react';
import { Forelder, OmForeldre, ForeldreparForelder } from '../../../types';
import MenuButton, { MenuButtonOption } from 'common/components/menuButton/MenuButton';
import ForelderIkon from 'common/components/foreldrepar/ForelderIkon';
import DropdownDialogTittel from './DropdownDialogTittel';

interface Props {
    forelder: Forelder;
    omForeldre: OmForeldre;
    erLåst?: boolean;
    onChange: (forelder: Forelder) => void;
}

const getForelderOptions = (omForeldre: OmForeldre): MenuButtonOption[] => [
    { value: Forelder.farMedmor, label: omForeldre.farMedmor.navn },
    { value: Forelder.mor, label: omForeldre.mor!.navn }
];

const renderForelderIkon = (forelder: Forelder, omForeldre: OmForeldre): React.ReactNode | undefined => {
    const iconRef: ForeldreparForelder =
        forelder === Forelder.farMedmor ? omForeldre.farMedmor.ikonRef : omForeldre.mor!.ikonRef;
    return (
        <div className="forelderMenyIkon">
            <ForelderIkon forelder={iconRef} />
        </div>
    );
};

const ForelderMeny: React.StatelessComponent<Props> = ({ onChange, forelder, omForeldre, erLåst }) => {
    return (
        <MenuButton
            disabled={erLåst}
            onChange={(value) => onChange(value as Forelder)}
            options={getForelderOptions(omForeldre)}
            selectedValue={forelder}
            iconRenderer={(option) => renderForelderIkon(option.value as Forelder, omForeldre)}
            iconOnly={true}
            dialogClassName="forelderMenyDialog"
            headerRenderer={() => <DropdownDialogTittel>Hvem gjelder perioden?</DropdownDialogTittel>}
        />
    );
};

export default ForelderMeny;
