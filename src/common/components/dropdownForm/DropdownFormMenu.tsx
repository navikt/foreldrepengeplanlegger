import * as React from 'react';
import classNames from 'classnames';
import { MenuItem } from 'react-aria-menubutton';
import CheckboxIkon from 'common/components/ikoner/CheckboxIkon';
import BEMHelper from 'common/utils/bem';

export interface DropdownFormMenuOption {
    value: string;
    label: React.ReactNode;
    hidden?: boolean;
}

interface Props {
    options: DropdownFormMenuOption[];
    onSelection: (value: string) => void;
    selectedValue?: string;
}

const bem = BEMHelper('dropdownFormMenu');
const bemOption = BEMHelper('dropdownFormMenu').child('option');

const DropdownFormMenu: React.StatelessComponent<Props> = ({ options, selectedValue }) => (
    <div className={bem.block}>
        <ul>
            {options
                .filter((option) => option.hidden !== true)
                .map((option) => (
                    <li key={option.value}>
                        <MenuItem
                            value={option.value}
                            className={classNames(bemOption.block, 'inputPanel', {
                                [`${bemOption.modifier('selected')}`]: option.value === selectedValue
                            })}>
                            {option.value === selectedValue && (
                                <span role="presentation" className={bemOption.element('icon')}>
                                    <CheckboxIkon checked={option.value === selectedValue} />
                                </span>
                            )}
                            <span className={bemOption.element('label')}>{option.label}</span>
                        </MenuItem>
                    </li>
                ))}
        </ul>
    </div>
);

export default DropdownFormMenu;
