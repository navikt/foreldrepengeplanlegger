import * as React from 'react';
import CustomSVG from 'shared/components/customSvg/CustomSVG';

const veilederGlad = require('app/assets/veileder--glad.svg');
const veilederNoytral = require('app/assets/veileder--noytral.svg');
const veilederBetenkt = require('app/assets/veileder--betenkt.svg');
const veilederTrist = require('app/assets/veileder--trist.svg');

export type VeilederUttrykk = 'glad' | 'noytral' | 'betenkt' | 'trist';

const getVeilederIkon = (uttrykk: VeilederUttrykk): any => {
	switch (uttrykk) {
		case 'glad':
			return veilederGlad;
		case 'trist':
			return veilederTrist;
		case 'betenkt':
			return veilederBetenkt;
		default:
			return veilederNoytral;
	}
};

const VeilederIkon: React.StatelessComponent<{
	size?: number;
	uttrykk?: VeilederUttrykk;
}> = ({ size = 28, uttrykk = 'noytral' }) => (
	<CustomSVG iconRef={getVeilederIkon(uttrykk).default} size={size} />
);

export default VeilederIkon;
