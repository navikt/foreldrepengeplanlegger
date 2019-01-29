import * as React from 'react';
import { Wrapper, Button, Menu, MenuItem } from 'react-aria-menubutton';
import BEMHelper from 'common/utils/bem';

import './menuButton.less';

export interface MenuButtonOption {
    value: string;
    label: string;
}

export type MenuButtonOptionRenderer = (option: MenuButtonOption, isSelected: boolean) => React.ReactNode;

interface Props {
    options: MenuButtonOption[];
    selectedValue?: string;
    optionRenderer?: MenuButtonOptionRenderer;
    onChange: (value: string) => void;
    headerRenderer?: () => React.ReactNode;
}

const bem = BEMHelper('menuButton');

const MenuButton: React.StatelessComponent<Props> = ({
    options,
    selectedValue,
    optionRenderer,
    headerRenderer,
    onChange
}) => {
    const selectedItem = options.find((o) => o.value === selectedValue);

    return (
        <Wrapper className={bem.block} onSelection={onChange}>
            <Button className={bem.element('button')}>{selectedItem ? selectedItem.label : 'velg'}</Button>
            <Menu className={bem.element('wrapper')}>
                {headerRenderer ? headerRenderer() : null}
                <ul>
                    {options.map((option) => (
                        <li key={option.value}>
                            <MenuItem
                                value={option.value}
                                className={
                                    optionRenderer === undefined
                                        ? bem.element('menuItem')
                                        : bem.element('menuItem--clean')
                                }>
                                {optionRenderer ? (
                                    optionRenderer(option, selectedValue === option.value)
                                ) : (
                                    <>{option.label}</>
                                )}
                            </MenuItem>
                        </li>
                    ))}
                </ul>
            </Menu>
        </Wrapper>
    );
};

export default MenuButton;
