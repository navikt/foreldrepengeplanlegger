import * as React from 'react';
import { KnappProps } from 'nav-frontend-knapper/lib/knapp';

import './slettKnapp.less';
import AriaText from 'common/components/aria/AriaText';

export interface SlettKnappProps extends KnappProps {
    ariaLabel: string;
    onClick: () => void;
}

const SlettKnapp: React.StatelessComponent<SlettKnappProps> = ({ onClick, ariaLabel }) => (
    <button
        type="button"
        className="slettKnapp"
        // aria-label={ariaLabel}
        title={ariaLabel}
        onClick={(e) => {
            e.stopPropagation();
            onClick();
        }}>
        X<AriaText>{ariaLabel}</AriaText>
    </button>
);

export default SlettKnapp;
