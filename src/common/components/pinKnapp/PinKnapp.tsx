import * as React from 'react';
import Sirkelknapp, { SirkelknappSize } from 'common/components/sirkelknapp/Sirkelknapp';
import PinIkon from 'common/components/ikoner/PinIkon';

interface Props {
    label: string;
    pressed?: boolean;
    onClick: (pressed: boolean) => void;
    size?: SirkelknappSize;
}

const PinKnapp: React.FunctionComponent<Props> = ({ label, pressed, size, onClick }) => (
    <Sirkelknapp
        size={size || 'stor'}
        stil="bla"
        ikon={<PinIkon title={label} color={pressed === true ? 'white' : 'blue'} size={size === 'stor' ? 16 : 12} />}
        ariaLabel={label}
        onClick={() => onClick(pressed === true ? false : true)}
        toggle={{ pressed: pressed === true }}
    />
);

export default PinKnapp;
