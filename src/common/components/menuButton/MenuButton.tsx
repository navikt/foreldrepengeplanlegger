import * as React from 'react';
import classnames from 'classnames';
import { Wrapper, Button, Menu, MenuItem } from 'react-aria-menubutton';
import BEMHelper from 'common/utils/bem';
import MenuButtonLabelRenderer from 'common/components/menuButton/MenuButtonIconLabelRenderer';

import './menuButton.less';
import CheckboxIkon from 'common/components/ikoner/CheckboxIkon';

export interface MenuButtonOption {
    value: string;
    label: string;
}

export type MenuButtonOptionRenderer = (option: MenuButtonOption, isSelected: boolean) => React.ReactNode;
export type MenuButtonIconRenderer = (option: MenuButtonOption, isSelected: boolean) => React.ReactNode;

interface Props {
    options: MenuButtonOption[];
    selectedValue?: string;
    optionRenderer?: MenuButtonOptionRenderer;
    onChange: (value: string) => void;
    headerRenderer?: () => React.ReactNode;
    iconRenderer?: MenuButtonIconRenderer;
    labelRenderer?: (option: MenuButtonOption) => React.ReactNode;
    iconOnly?: boolean;
    dialogClassName?: string;
}

const bem = BEMHelper('menuButton');

const MenuButton: React.StatelessComponent<Props> = ({
    options,
    selectedValue,
    headerRenderer,
    iconRenderer,
    onChange,
    dialogClassName,
    labelRenderer,
    iconOnly
}) => {
    const selectedItem = options.find((o) => o.value === selectedValue);

    return (
        <Wrapper className={bem.block} onSelection={onChange}>
            <Button className={classnames(bem.element('button'), 'inputPanel')}>
                {selectedItem ? (
                    <MenuButtonLabelRenderer
                        option={selectedItem}
                        iconRenderer={iconRenderer}
                        isSelected={true}
                        iconOnly={iconOnly}
                        labelRenderer={labelRenderer}
                    />
                ) : (
                    'Velg'
                )}
            </Button>
            <Menu className={classnames(bem.element('wrapper'), dialogClassName)}>
                {headerRenderer ? headerRenderer() : null}
                <ul>
                    {options.map((option) => (
                        <li key={option.value}>
                            <MenuItem
                                value={option.value}
                                className={classnames(bem.element('menuItem'), 'inputPanel', {
                                    [`${bem.element('menuItem--selected')}`]: option.value === selectedValue
                                })}>
                                {option.value === selectedValue && (
                                    <span role="presentation" className={bem.element('menuItem__checked')}>
                                        <CheckboxIkon checked={option.value === selectedValue} />
                                    </span>
                                )}
                                <span className={bem.element('menuItem__label')}>{option.label}</span>
                            </MenuItem>
                        </li>
                    ))}
                </ul>
            </Menu>
        </Wrapper>
    );
};

export default MenuButton;
