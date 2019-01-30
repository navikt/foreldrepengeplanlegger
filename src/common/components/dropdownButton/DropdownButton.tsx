import * as React from 'react';
import { Wrapper, Button, Menu } from 'react-aria-menubutton';
import classnames from 'classnames';

import BEMHelper from 'common/utils/bem';

import './dropdownButton.less';

interface Props {
    label: React.ReactNode;
    id?: string;
    dialogClassName?: string;
}

const bem = BEMHelper('dropdownButton');

const DropdownButton: React.StatelessComponent<Props> = ({ label, id, dialogClassName, children }) => {
    return (
        <Wrapper className={bem.block} id={id}>
            <Button className={classnames(bem.element('button'), 'inputPanel')} role="popupbutton">
                {label}
            </Button>
            <Menu role="dialog" className={classnames(bem.element('wrapper'), dialogClassName)}>
                {children}
            </Menu>
        </Wrapper>
    );
};

export default DropdownButton;
