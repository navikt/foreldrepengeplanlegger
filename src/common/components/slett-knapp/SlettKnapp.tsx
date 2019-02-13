import * as React from 'react';
import { KnappProps } from 'nav-frontend-knapper/lib/knapp';
import TrashIkon from 'common/components/ikoner/TrashIkon';
import IkonKnapp from 'common/components/ikonKnapp/IkonKnapp';

export interface SlettKnappProps extends KnappProps {
    ariaLabel: string;
    onClick: () => void;
}

const SlettKnapp: React.StatelessComponent<SlettKnappProps> = ({ onClick, ariaLabel }) => (
    <IkonKnapp ikon={<TrashIkon />} ariaLabel={ariaLabel} onClick={onClick} />
);

export default SlettKnapp;
