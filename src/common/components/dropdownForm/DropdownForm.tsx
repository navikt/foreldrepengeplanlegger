import * as React from 'react';
import classNames from 'classnames';
import { Wrapper, Button, Menu, closeMenu } from 'react-aria-menubutton';
import BEMHelper from 'common/utils/bem';
import { guid } from 'nav-frontend-js-utils';
import Knapperad from 'common/components/knapperad/Knapperad';
import { Flatknapp } from 'nav-frontend-knapper';
import Block from 'common/components/block/Block';
import { Undertittel } from 'nav-frontend-typografi';

import './dropdownForm.less';

export type DropdownFormStyle = 'border' | 'filled';

interface Props {
    labelRenderer: () => React.ReactNode;
    contentRenderer: () => React.ReactNode;
    onSelection?: (value: string) => void;
    labelAlignment?: 'left' | 'center' | 'right';
    dropdownPlacement?: 'left' | 'right';
    buttonClassName?: string;
    disabledButtonClassName?: string;
    contentClassName?: string;
    contentTitle?: string;
    buttonSize?: 'inline' | 'stretched';
    disabled?: boolean;
    wrapperId?: string;
    style: DropdownFormStyle;
    renderCloseButton?: boolean;
}

const bem = BEMHelper('dropdownForm');

class DropdownForm extends React.Component<Props> {
    id: string;

    constructor(props: Props) {
        super(props);
        this.id = props.wrapperId || guid();
        this.closeMenu = this.closeMenu.bind(this);
    }
    closeMenu() {
        closeMenu(this.id);
    }
    render() {
        const {
            labelRenderer,
            contentRenderer,
            buttonClassName,
            contentClassName,
            onSelection,
            labelAlignment = 'left',
            dropdownPlacement = 'left',
            buttonSize = 'stretched',
            contentTitle,
            renderCloseButton,
            disabled,
            style,
            disabledButtonClassName
        } = this.props;

        return (
            <Wrapper
                tag="div"
                id={this.id}
                className={classNames(bem.block, buttonSize ? bem.modifier(buttonSize) : undefined)}
                onSelection={onSelection}>
                {disabled ? (
                    <div className={bem.classNames(bem.element('lockedValue'), disabledButtonClassName || undefined)}>
                        {labelRenderer()}
                    </div>
                ) : (
                    <Button
                        tag="div"
                        className={classNames(
                            'inputPanel',
                            bem.element('button'),
                            buttonClassName,
                            labelAlignment ? bem.element('button', labelAlignment) : undefined,
                            bem.element('button', style || 'filled')
                        )}>
                        <div className={bem.element('button__label')}>{labelRenderer()}</div>
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
                            <Block margin="s">
                                <Undertittel tag="h1">{contentTitle}</Undertittel>
                            </Block>
                        )}
                        {contentRenderer()}
                        {renderCloseButton && (
                            <Knapperad>
                                <Flatknapp onClick={this.closeMenu}>Lukk</Flatknapp>
                            </Knapperad>
                        )}
                    </section>
                </Menu>
            </Wrapper>
        );
    }
}

export default DropdownForm;
