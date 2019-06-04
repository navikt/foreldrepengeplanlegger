import * as React from 'react';
import { MenuItem } from 'react-aria-menubutton';
import BEMHelper from 'common/util/bem';

export interface DropdownFormMenuOption {
    value: string;
    label: React.ReactNode;
    hidden?: boolean;
}

interface Props {
    options: DropdownFormMenuOption[];
    selectedValue?: string;
    headerContent?: React.ReactNode;
}

const bem = BEMHelper('dropdownFormMenu');

const DropdownFormMenu: React.StatelessComponent<Props> = ({ options, selectedValue, headerContent }) => (
    <div className={bem.block}>
        {headerContent && <div className={bem.element('header')}>{headerContent}</div>}
        <ul>
            {options
                .filter((option) => option.hidden !== true)
                .map((option) => (
                    <li key={option.value}>
                        <MenuItem value={option.value} className="radioPanel inputPanel dropdownFormMenu__menuItem">
                            <input
                                readOnly={true}
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
