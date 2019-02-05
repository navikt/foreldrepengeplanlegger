import * as React from 'react';
import classNames from 'classnames';
import { Wrapper, Button, Menu } from 'react-aria-menubutton';
import BEMHelper from 'common/utils/bem';

import './dropdownForm.less';

interface Props {
    labelRenderer: () => React.ReactNode;
    contentRenderer: () => React.ReactNode;
    onSelection?: (value: string) => void;
    labelPlacement?: 'left' | 'center' | 'right';
    dropdownPlacement?: 'left' | 'right';
    buttonClassName?: string;
    contentClassName?: string;
    buttonSize?: 'inline' | 'stretched';
    disabled?: boolean;
}

const bem = BEMHelper('dropdownForm');

const DropdownForm: React.StatelessComponent<Props> = ({
    labelRenderer,
    contentRenderer,
    buttonClassName,
    contentClassName,
    onSelection,
    labelPlacement = 'left',
    dropdownPlacement = 'left',
    buttonSize = 'stretched',
    disabled
}) => (
    <Wrapper
        className={classNames(bem.block, buttonSize ? bem.modifier(buttonSize) : undefined)}
        onSelection={onSelection}>
        {disabled ? (
            <div className={bem.element('lockedValue')}>{labelRenderer()}</div>
        ) : (
            <Button
                className={classNames(
                    bem.element('button'),
                    buttonClassName,
                    'inputPanel',
                    labelPlacement ? bem.element('button', labelPlacement) : undefined
                )}>
                {labelRenderer()}
            </Button>
        )}
        <Menu
            className={classNames(
                bem.element('dialogWrapper'),
                bem.element('dialogWrapper', dropdownPlacement),
                contentClassName
            )}>
            {contentRenderer()}
        </Menu>
    </Wrapper>
);

export default DropdownForm;
