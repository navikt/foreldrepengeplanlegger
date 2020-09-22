import * as React from 'react';
import moment from 'moment';
import BEMHelper from 'common/util/bem';
import { EtikettLiten } from 'nav-frontend-typografi';
import { måned3bokstaver, år } from 'common/util/datoUtils';

import './dagMnd.less';

interface Props {
    dato: Date;
    visÅr?: boolean;
}

const bem = BEMHelper('dagMnd');

const DagMnd: React.FunctionComponent<Props> = ({ dato, visÅr = true }) => {
    return (
        <div className={bem.block}>
            <span className={bem.classNames(bem.element('dato'), visÅr ? bem.modifier('medAar') : undefined)}>
                {moment.utc(dato).format('DD')}. {måned3bokstaver(dato)}
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
