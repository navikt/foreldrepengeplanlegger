import * as React from 'react';
import Block from 'common/components/block/Block';
import { Undertittel } from 'nav-frontend-typografi';

interface Props {}

const DropdownDialogTittel: React.StatelessComponent<Props> = ({ children }) => (
    <Block margin="xs">
        <Undertittel tag="h1" className="dropdownDialogTittel">
            {children}
        </Undertittel>
    </Block>
);

export default DropdownDialogTittel;
