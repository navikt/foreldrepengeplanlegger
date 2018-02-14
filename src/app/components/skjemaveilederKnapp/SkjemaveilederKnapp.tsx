import * as React from 'react';
import VeilederinfoKnappContainer from 'app/connectedComponents/VeilederinfoKnappContainer';

export interface Props {
	id: string;
	label: string;
}

const SkjemaveilederKnapp: React.StatelessComponent<Props> = ({
	id,
	label
}) => (
	<div className="skjemaveilederKnapp">
		<div className="skjemaveilederKnapp__knappWrapper">
			<VeilederinfoKnappContainer id={id} label={label} />
		</div>
	</div>
);

export default SkjemaveilederKnapp;
