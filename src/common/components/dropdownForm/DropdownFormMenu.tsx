import * as React from 'react';
import { MenuItem } from 'react-aria-menubutton';
import BEMHelper from 'common/utils/bem';

export interface DropdownFormMenuOption {
    value: string;
    label: React.ReactNode;
    hidden?: boolean;
}

interface Props {
    options: DropdownFormMenuOption[];
    selectedValue?: string;
}

const bem = BEMHelper('dropdownFormMenu');

const DropdownFormMenu: React.StatelessComponent<Props> = ({ options, selectedValue }) => (
    <div className={bem.block}>
        <ul>
            {options
                .filter((option) => option.hidden !== true)
                .map((option) => (
                    <li key={option.value}>
                        <MenuItem value={option.value} className="radioPanel inputPanel dropdownFormMenu__menuItem">
                            <input
                                className="inputPanel__field"
                                type="radio"
                                name="example-1"
                                aria-checked="true"
                                value="juice1"
                                checked={option.value === selectedValue}
                                role="presentation"
                            />
                            <span className="inputPanel__label inputPanel__label">{option.label}</span>
                        </MenuItem>
                    </li>
                ))}
        </ul>
    </div>
);

export default DropdownFormMenu;
