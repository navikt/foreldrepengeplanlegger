import * as React from 'react';
import PlussMinusIkon from 'common/components/ikoner/PlussMinusIkon';
import Sirkelknapp from 'common/components/sirkelknapp/Sirkelknapp';

import './rangeStepper.less';

export type Direction = 'next' | 'previous';

export interface Props {
    onClick: () => void;
    direction: Direction;
    label: string;
    disabled?: boolean;
}

const RangeStepper: React.StatelessComponent<Props> = ({ direction, onClick, label, disabled }) => (
    <Sirkelknapp
        stil="hvit"
        onClick={() => onClick()}
        ariaLabel={label}
        disabled={disabled}
        ikon={direction === 'previous' ? <PlussMinusIkon type="minus" /> : <PlussMinusIkon type="plus" />}
    />
);

export default RangeStepper;
