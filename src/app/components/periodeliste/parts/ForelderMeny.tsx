import * as React from 'react';
import { Forelder, OmForeldre, ForeldreparForelder } from '../../../types';
import MenuButton, { MenuButtonOption } from 'common/components/menuButton/MenuButton';
import ForelderIkon from 'common/components/foreldrepar/ForelderIkon';

interface Props {
    forelder: Forelder;
    omForeldre: OmForeldre;
    onChange: (forelder: Forelder) => void;
}

const getForelderOptions = (omForeldre: OmForeldre): MenuButtonOption[] => [
    { value: Forelder.forelder1, label: omForeldre.forelder1.navn },
    { value: Forelder.forelder2, label: omForeldre.forelder2!.navn }
];

const renderForelderIkon = (option: MenuButtonOption, omForeldre: OmForeldre): React.ReactNode | undefined => {
    const iconRef: ForeldreparForelder =
        option.value === Forelder.forelder1 ? omForeldre.forelder1.ikonRef : omForeldre.forelder2!.ikonRef;
    return (
        <div className="forelderMenyIkon">
            <ForelderIkon forelder={iconRef} />
        </div>
    );
};

const ForelderMeny: React.StatelessComponent<Props> = ({ onChange, forelder, omForeldre }) => {
    return (
        <MenuButton
            onChange={(value) => onChange(value as Forelder)}
            options={getForelderOptions(omForeldre)}
            selectedValue={forelder}
            iconRenderer={(option) => renderForelderIkon(option, omForeldre)}
            iconOnly={true}
            dialogClassName="forelderMenyDialog"
        />
    );
};

export default ForelderMeny;
