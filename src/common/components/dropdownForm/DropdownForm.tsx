import * as React from 'react';
import classNames from 'classnames';
import { Wrapper, Button, Menu } from 'react-aria-menubutton';
import BEMHelper from 'common/utils/bem';
import { Undertittel } from 'nav-frontend-typografi';

import './dropdownForm.less';

interface Props {
    labelRenderer: () => React.ReactNode;
    contentRenderer: () => React.ReactNode;
    onSelection?: (value: string) => void;
    labelAlignment?: 'left' | 'center' | 'right';
    dropdownPlacement?: 'left' | 'right';
    buttonClassName?: string;
    contentClassName?: string;
    contentTitle?: string;
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
    labelAlignment = 'left',
    dropdownPlacement = 'left',
    buttonSize = 'stretched',
    contentTitle,
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
                    'inputPanel',
                    bem.element('button'),
                    buttonClassName,
                    labelAlignment ? bem.element('button', labelAlignment) : undefined
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
            <section>
                {contentTitle && (
                    <Undertittel tag="h1" className={bem.element('dialogTitle')}>
                        {contentTitle}
                    </Undertittel>
                )}
                {contentRenderer()}
            </section>
        </Menu>
    </Wrapper>
);

export default DropdownForm;
