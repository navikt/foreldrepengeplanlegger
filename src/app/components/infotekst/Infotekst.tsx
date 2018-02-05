import * as React from 'react';
import InfoDameIkon from 'app/components/ikoner/InfoDameIkon';

export interface Props {
	apen: boolean;
	tittel?: string;
	onToggle?: () => void;
}

const Infotekst: React.StatelessComponent<Props> = (props) => (
	<div className="infotekst">
		<button type="button" className="infotekst__knapp">
			<span className="infotekst__knapp__ikon">
				<InfoDameIkon />
			</span>
			<span className="infotekst__knapp__label">{props.tittel}</span>
		</button>
	</div>
);

export default Infotekst;
