import * as React from 'react';

import CustomSVG from 'shared/components/customSvg/CustomSVG';

const pluss = require('app/assets/pluss.svg');

export interface Props extends React.HTMLProps<HTMLButtonElement> {
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const LeggTilKnapp: React.StatelessComponent<Props> = (props) => (
	<button
		type="button"
		onClick={(e) => props.onClick(e)}
		className="m-fullBredde leggTilKnapp">
		<span className="leggTilKnapp__label">
			Legg til ferie, permisjon eller arbeid
		</span>
		<span className="leggTilKnapp__pluss">
			<CustomSVG iconRef={pluss.default} size={24} />
		</span>
	</button>
);

export default LeggTilKnapp;
