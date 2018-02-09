import * as React from 'react';

export type CalloutBorderColor = 'green' | 'purple' | 'blue' | 'gray';

export interface Props {
	borderColor?: CalloutBorderColor;
}

const Callout: React.StatelessComponent<Props> = ({
	borderColor = 'gray',
	children
}) => (
	<div className={`callout callout--${borderColor}`}>
		<div className="callout__arrow">
			<div className="topLeftArrow" />
		</div>
		<div className="callout__content">{children}</div>
	</div>
);

export default Callout;
