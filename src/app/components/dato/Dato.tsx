import * as React from 'react';
import { år, måned, dagIMåned } from './datoUtils';

export type Datoformat = 'Full';
import './dato.less';

interface Props {
	dato: Date;
}

const Dato: React.StatelessComponent<Props> = ({ dato }) => (
	<span className="formatert-dato">
		<span className="formatert-dato__dag">{dagIMåned(dato)}</span>{' '}
		<span className="formatert-dato__måned">{måned(dato)}</span> <span className="formatert-dato__år">{år(dato)}</span>
	</span>
);

export default Dato;
