import * as React from 'react';
import { Wrapper, Button, Menu } from 'react-aria-menubutton';
import classNames from 'classnames';

import BEMHelper from 'common/utils/bem';

import './dropdownButton.less';

type LabelRenderer = () => React.ReactNode;
type LabelOrLabelRenderer = LabelRenderer;

interface Props {
    label: React.ReactNode | LabelOrLabelRenderer;
    id?: string;
    dialogClassName?: string;
}

const bem = BEMHelper('dropdownButton');

const DropdownButton: React.StatelessComponent<Props> = ({ label, id, dialogClassName, children }) => {
    return (
        <Wrapper className={bem.block} id={id}>
            <Button className={classNames(bem.element('button'), 'inputPanel')} role="popupbutton" tag="div">
                {label instanceof Function ? label() : label}
            </Button>
            <Menu role="dialog" className={classNames(bem.element('wrapper'), dialogClassName)}>
                {children}
            </Menu>
        </Wrapper>
    );
};

export default DropdownButton;
