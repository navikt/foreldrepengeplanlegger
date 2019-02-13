import * as React from 'react';
import { KnappProps } from 'nav-frontend-knapper/lib/knapp';
import AriaText from 'common/components/aria/AriaText';

import './ikonKnapp.less';

export interface SlettKnappProps extends KnappProps {
    ikon: React.ReactNode;
    ariaLabel: string;
    onClick: () => void;
}

const IkonKnapp: React.StatelessComponent<SlettKnappProps> = ({ ikon, onClick, ariaLabel }) => (
    <button
        type="button"
        className="ikonKnapp"
        aria-label={ariaLabel}
        title={ariaLabel}
        onClick={(e) => {
            e.stopPropagation();
            onClick();
        }}>
        {ikon}
        <AriaText>{ariaLabel}</AriaText>
    </button>
);

export default IkonKnapp;
