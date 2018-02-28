import * as React from 'react';
import { Collapse } from 'react-collapse';

export interface OwnProps {
	/** Innholdet som skal vises */
	children: React.ReactNode;
	/** Overstyre state for om den skal vises eller ikke */
	erApen?: boolean;
	/** Default off */
	ariaLive?: 'assertive' | 'polite' | 'off';
}

const EkspanderbartInnhold: React.StatelessComponent<OwnProps> = ({
	children,
	erApen = false,
	ariaLive = 'off'
}) => (
	<Collapse isOpened={erApen} springConfig={{ stiffness: 250, damping: 30 }}>
		<div aria-live={ariaLive}>{erApen ? <div>{children}</div> : <div />}</div>
	</Collapse>
);

export default EkspanderbartInnhold;
