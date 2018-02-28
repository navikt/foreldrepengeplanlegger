import * as React from 'react';
import * as classnames from 'classnames';
import { Collapse } from 'react-collapse';

import './ekspanderbartInnhold.less';

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
	<Collapse
		isOpened={erApen}
		springConfig={{ stiffness: 250, damping: 30 }}
		className={classnames('ekspanderbartInnhold', {
			'ekspanderbartInnhold--apen': erApen
		})}>
		<div aria-live={ariaLive}>{erApen ? <div>{children}</div> : <div />}</div>
	</Collapse>
);

export default EkspanderbartInnhold;
