import * as React from 'react';
import BEMHelper from 'common/utils/bem';

interface Props {
    selected?: boolean;
    children: React.ReactNode;
}

const bem = BEMHelper('dropdownRadioOption');

const DropdownRadioOption: React.StatelessComponent<Props> = ({ selected, children }) => (
    <div className={bem.classNames(bem.block, bem.modifierConditional('selected', selected))}>{children}</div>
);

export default DropdownRadioOption;
