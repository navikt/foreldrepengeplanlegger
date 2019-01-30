import * as React from 'react';
import { Forelder, OmForeldre, ForeldreparForelder } from '../../../types';
import MenuButton, { MenuButtonOption } from 'common/components/menuButton/MenuButton';
import ForelderIkon from 'common/components/foreldrepar/ForelderIkon';

interface Props {
    forelder: Forelder;
    omForeldre: OmForeldre;
    onChange: (forelder: Forelder) => void;
}

const forelderOptions: MenuButtonOption[] = [
    { value: Forelder.forelder1, label: 'Forelder 1' },
    { value: Forelder.forelder2, label: 'Forelder 2' }
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
            onChange={onChange}
            options={forelderOptions}
            selectedValue={forelder}
            iconRenderer={(option) => renderForelderIkon(option, omForeldre)}
            iconOnly={true}
        />
    );
};

export default ForelderMeny;
