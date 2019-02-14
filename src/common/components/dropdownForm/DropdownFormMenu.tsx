import * as React from 'react';
// import classNames from 'classnames';
import { MenuItem } from 'react-aria-menubutton';
// import CheckboxIkon from 'common/components/ikoner/CheckboxIkon';
import BEMHelper from 'common/utils/bem';
import { RadioPanel } from 'nav-frontend-skjema';
// import DropdownRadioOption from 'common/components/dropdownForm/DropdownRadioOption';

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
// const bemOption = BEMHelper('dropdownFormMenu').child('option');

const DropdownFormMenu: React.StatelessComponent<Props> = ({ options, selectedValue }) => (
    <div className={bem.block}>
        <ul>
            {options
                .filter((option) => option.hidden !== true)
                .map((option) => (
                    <li key={option.value}>
                        <MenuItem value={option.value} className={bem.element('menuItem')}>
                            <RadioPanel
                                label={option.label as string}
                                value={option.value}
                                checked={option.value === selectedValue}
                                name="abc"
                                onChange={() => null}
                            />
                        </MenuItem>
                    </li>
                ))}
        </ul>
    </div>
);

export default DropdownFormMenu;
