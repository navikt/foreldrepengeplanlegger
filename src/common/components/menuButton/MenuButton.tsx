import * as React from 'react';
import { Wrapper, Button, Menu, MenuItem } from 'react-aria-menubutton';

import BEMHelper from 'common/utils/bem';

import './menuButton.less';

export interface MenuButtonOption {
    value: string;
    label: string;
}

interface Props {
    options: MenuButtonOption[];
    selectedValue?: string;
    onChange: (value: string) => void;
}

const bem = BEMHelper('menuButton');

const MenuButton: React.StatelessComponent<Props> = ({ options, selectedValue, onChange }) => {
    const selectedItem = options.find((o) => o.value === selectedValue);

    return (
        <Wrapper className={bem.block} onSelection={onChange}>
            <Button className={bem.element('button')}>{selectedItem ? selectedItem.label : 'velg'}</Button>
            <Menu className={bem.element('wrapper')}>
                <ul>
                    {options.map((option) => (
                        <li key={option.value}>
                            <MenuItem value={option.value} className={bem.element('menuItem')}>
                                {option.label}
                            </MenuItem>
                        </li>
                    ))}
                </ul>
            </Menu>
        </Wrapper>
    );
};

export default MenuButton;
