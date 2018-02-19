import * as React from 'react';

import { Knapp } from 'nav-frontend-knapper';
import PlussIkon from '../ikoner/PlussIkon';

export interface Props extends React.HTMLProps<HTMLButtonElement> {
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const LeggTilKnapp: React.StatelessComponent<Props> = (props) => (
	<Knapp
		type="standard"
		onClick={(e) => props.onClick(e)}
		className="m-fullBredde leggTilKnapp">
		<span className="leggTilKnapp__pluss">
			<PlussIkon />
		</span>
		<span className="leggTilKnapp__label">Legg til utsettelse</span>
	</Knapp>
);

export default LeggTilKnapp;
