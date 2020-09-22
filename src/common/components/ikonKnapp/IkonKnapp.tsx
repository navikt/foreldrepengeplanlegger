import * as React from 'react';
import AriaText from 'common/components/aria/AriaText';
import { KnappBaseProps } from 'nav-frontend-knapper';

import './ikonKnapp.less';

export interface SlettKnappProps extends KnappBaseProps {
    ikon: React.ReactNode;
    ariaLabel: string;
    onClick: () => void;
}

const IkonKnapp: React.FunctionComponent<SlettKnappProps> = ({ ikon, onClick, ariaLabel }) => (
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
