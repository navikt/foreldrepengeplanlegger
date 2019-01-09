import * as React from 'react';
import { Periode } from '../../types';
import Lukknapp from 'nav-frontend-lukknapp';

import './periodeElement.less';

export interface Props {
    periode: Periode;
    onDelete: (periode: Periode) => void;
}

const PeriodeElement: React.StatelessComponent<Props> = ({ periode, onDelete }) => (
    <div className="periodeElement">
        <p>{periode.id}</p>
        <Lukknapp onClick={() => onDelete(periode)}>Slett</Lukknapp>
    </div>
);

export default PeriodeElement;
