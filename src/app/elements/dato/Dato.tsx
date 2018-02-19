import * as React from 'react';
import { år, måned, dagIMåned, ukedag } from './datoUtils';

import './dato.less';

export type Datoformat = 'Full';

interface Props {
	dato: Date;
}

const Dato: React.StatelessComponent<Props> = ({ dato }) => (
	<span className="formatert-dato">
		<span className="formatert-dato__ukedag">{ukedag(dato)}</span>{' '}
		<span className="formatert-dato__dag">{dagIMåned(dato)}</span>{' '}
		<span className="formatert-dato__måned">{måned(dato)}</span>{' '}
		<span className="formatert-dato__år">{år(dato)}</span>
	</span>
);

export default Dato;
