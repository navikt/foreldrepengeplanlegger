import * as React from 'react';
import VeilederinfoKnappContainer from 'app/connectedComponents/VeilederinfoKnappContainer';

export interface Props {
	label: string;
	info: {
		id: string;
		label: string;
	};
}

const Sporsmal: React.StatelessComponent<Props> = (props) => (
	<div className="skjemasporsmal">
		<span className="skjemasporsmal__sporsmal">{props.children}</span>
		{props.info && (
			<span className="skjemasporsmal__info">
				<VeilederinfoKnappContainer {...props.info} />
			</span>
		)}
	</div>
);

export default Sporsmal;
