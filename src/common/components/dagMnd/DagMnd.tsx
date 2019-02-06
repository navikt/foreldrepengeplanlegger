import * as React from 'react';
import BEMHelper from 'common/utils/bem';
import { EtikettLiten } from 'nav-frontend-typografi';
import { måned3bokstaver, måned, år } from 'common/utils/datoUtils';

import './dagMnd.less';

interface Props {
    dato: Date;
}

const bem = BEMHelper('dagMnd');

const DagMnd: React.StatelessComponent<Props> = ({ dato }) => {
    return (
        <div className={bem.block}>
            <span className={bem.element('dato')}>
                {dato.getDate()}. {måned3bokstaver(dato)}.
            </span>
            <EtikettLiten tag="span" className={bem.element('mnd')}>
                <abbr title={`${måned(dato)} ${år(dato)}`}>{år(dato)}</abbr>
            </EtikettLiten>
        </div>
    );
};

export default DagMnd;
