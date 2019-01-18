import * as React from 'react';
import { Periode } from '../../types';
import PeriodeElement from './PeriodeElement';
import { PeriodelisteProps } from './types';

import './periodeliste.less';

const Periodeliste: React.StatelessComponent<PeriodelisteProps> = (props) => {
    const { perioder, ...elementProps } = props;
    if (perioder.length === 0) {
        return <div>Ingen perioder registrert</div>;
    }
    return (
        <ol className="periodeliste">
            {perioder.map((periode: Periode, index: number) => {
                return (
                    <li className="periodeliste__periode" key={periode.id}>
                        <PeriodeElement periode={periode} {...elementProps} />
                    </li>
                );
            })}
        </ol>
    );
};

export default Periodeliste;
