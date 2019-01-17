import * as React from 'react';
import { Wrapper, Button, Menu } from 'react-aria-menubutton';
import { guid } from 'nav-frontend-js-utils';

import BEMHelper from 'common/utils/bem';

import './dropdownButton.less';

interface Props {
    label: React.ReactNode;
    onClose: () => void;
}

const bem = BEMHelper('dropdownButton');

const DropdownButton: React.StatelessComponent<Props> = ({ label, children, onClose }) => {
    const id = guid();
    return (
        <Wrapper className={bem.block} onSelection={onClose}>
            <Button className={bem.element('button')} id={id} role="popupbutton">
                {label}
            </Button>
            <Menu role="dialog" className={bem.element('wrapper')}>
                {children}
            </Menu>
        </Wrapper>
    );
};

export default DropdownButton;
