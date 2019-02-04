import * as React from 'react';
import BEMHelper from 'common/utils/bem';

import './ikonTekst.less';

interface Props {
    ikon: React.ReactNode;
    children: React.ReactNode;
}

const bem = BEMHelper('ikonTekst');

const IkonTekst: React.StatelessComponent<Props> = ({ ikon, children }) => (
    <div className={bem.block}>
        <span className={bem.element('ikon')}>{ikon}</span>
        <span className={bem.element('tekst')}>{children}</span>
    </div>
);

export default IkonTekst;
