import * as React from 'react';
import { SkjemaGruppe, Fieldset } from 'nav-frontend-skjema';
import { Feil } from 'common/components/skjema/skjemaInputElement/types';

import './skjemablokk.less';
import Block, { BlockPadding } from 'common/components/block/Block';

interface Props {
    tittel: string;
    feil?: Feil;
    children: React.ReactNode;
    margin?: BlockPadding;
    visible?: boolean;
}

const Skjemablokk: React.StatelessComponent<Props> = ({ tittel, feil, children, visible, margin = 'l' }) => (
    <Block margin={margin} visible={visible}>
        <SkjemaGruppe feil={feil}>
            <Fieldset legend={tittel} className="skjemablokk">
                {children}
            </Fieldset>
        </SkjemaGruppe>
    </Block>
);

export default Skjemablokk;
