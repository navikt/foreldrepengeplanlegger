import * as React from 'react';
import classNames from 'classnames';
import { Wrapper, Button, Menu } from 'react-aria-menubutton';
import BEMHelper from 'common/utils/bem';

import './dropdownForm.less';

interface Props {
    labelRenderer: () => React.ReactNode;
    dialogContentRenderer: () => React.ReactNode;
    dialogClassName?: string;
    disabled?: boolean;
    onSelection?: (value: string) => void;
}

const bem = BEMHelper('dropdownForm');

const DropdownForm: React.StatelessComponent<Props> = ({
    labelRenderer,
    dialogContentRenderer,
    dialogClassName,
    onSelection,
    disabled
}) => (
    <Wrapper className={bem.block} onSelection={onSelection}>
        {disabled ? (
            <div className={bem.element('lockedValue')}>{labelRenderer()}</div>
        ) : (
            <Button className={classNames(bem.element('button'), 'inputPanel')}>{labelRenderer()}</Button>
        )}

        <Menu className={classNames(bem.element('dialogWrapper'), dialogClassName)}>{dialogContentRenderer()}</Menu>
    </Wrapper>
);

export default DropdownForm;
