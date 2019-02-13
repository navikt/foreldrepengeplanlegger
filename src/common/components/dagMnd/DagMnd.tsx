import * as React from 'react';
import BEMHelper from 'common/utils/bem';
import { EtikettLiten } from 'nav-frontend-typografi';
import { måned3bokstaver, år } from 'common/utils/datoUtils';

import './dagMnd.less';

interface Props {
    dato: Date;
    visÅr?: boolean;
}

const bem = BEMHelper('dagMnd');

const DagMnd: React.StatelessComponent<Props> = ({ dato, visÅr = true }) => {
    return (
        <div className={bem.block}>
            <span className={bem.classNames(bem.element('dato'), visÅr ? bem.modifier('medAar') : undefined)}>
                {dato.getDate()}. {måned3bokstaver(dato)}
            </span>
            {visÅr && (
                <EtikettLiten tag="span" className={bem.element('aar')}>
                    {år(dato)}
                </EtikettLiten>
            )}
        </div>
    );
};

export default DagMnd;
