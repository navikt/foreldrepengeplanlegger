import * as React from 'react';

export interface Props {}

const Callout: React.StatelessComponent<Props> = (props) => (
	<div className="callout">
		<div className="callout__arrow">
			<div className="topLeftArrow" />
		</div>
		<div className="callout__content">{props.children}</div>
	</div>
);

export default Callout;
