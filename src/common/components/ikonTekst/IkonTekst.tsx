import * as React from 'react';
import classnames from 'classnames';
import BEMHelper from 'common/utils/bem';

import './ikonTekst.less';
import AriaText from 'common/components/aria/AriaText';

interface Props {
    ikon?: React.ReactNode;
    kunIkon?: boolean;
    children: React.ReactNode;
}

const bem = BEMHelper('ikonTekst');

const IkonTekst: React.StatelessComponent<Props> = ({ ikon, kunIkon, children }) => (
    <div className={classnames(bem.block, { [`${bem.block}--iconOnly`]: kunIkon })}>
        <span className={bem.element('ikon')}>{ikon}</span>
        {kunIkon ? <AriaText>{children}</AriaText> : <span className={bem.element('tekst')}>{children}</span>}
    </div>
);

export default IkonTekst;
