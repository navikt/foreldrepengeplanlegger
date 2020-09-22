import * as React from 'react';
import TrashIkon from 'common/components/ikoner/TrashIkon';
import IkonKnapp from 'common/components/ikonKnapp/IkonKnapp';
import { KnappBaseProps } from 'nav-frontend-knapper';

export interface SlettKnappProps extends KnappBaseProps {
    ariaLabel: string;
    onClick: () => void;
}

const SlettKnapp: React.FunctionComponent<SlettKnappProps> = ({ onClick, ariaLabel }) => (
    <IkonKnapp ikon={<TrashIkon />} ariaLabel={ariaLabel} onClick={onClick} />
);

export default SlettKnapp;
