import * as React from 'react';
import { MenuButtonOption, MenuButtonIconRenderer } from 'common/components/menuButton/MenuButton';
import IkonTekst from 'common/components/ikonTekst/IkonTekst';

interface Props {
    option: MenuButtonOption;
    isSelected: boolean;
    iconRenderer?: MenuButtonIconRenderer;
    iconOnly?: boolean;
    labelRenderer?: (option: MenuButtonOption) => React.ReactNode;
}

const MenuButtonIconLabelRenderer: React.StatelessComponent<Props> = ({
    option,
    iconRenderer,
    isSelected,
    iconOnly = false,
    labelRenderer
}) => {
    const Ikon = iconRenderer ? iconRenderer(option, isSelected) : undefined;
    return (
        <IkonTekst kunIkon={iconOnly} ikon={Ikon}>
            {labelRenderer ? labelRenderer(option) : option.label}
        </IkonTekst>
    );
};

export default MenuButtonIconLabelRenderer;
