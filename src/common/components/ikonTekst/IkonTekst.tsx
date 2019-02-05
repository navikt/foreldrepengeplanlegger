import * as React from 'react';
import classNames from 'classnames';
import BEMHelper from 'common/utils/bem';

import './ikonTekst.less';
import AriaText from 'common/components/aria/AriaText';

interface Props {
    ikon?: React.ReactNode;
    kunIkon?: boolean;
    layout?: 'horisontal' | 'vertikal';
    children: React.ReactNode;
}

const bem = BEMHelper('ikonTekst');

const IkonTekst: React.StatelessComponent<Props> = ({ ikon, kunIkon, layout = 'horisontal', children }) => (
    <div className={classNames(bem.block, bem.modifier(layout), { [`${bem.block}--kunIkon`]: kunIkon })}>
        <span className={bem.element('ikon')}>{ikon}</span>
        {kunIkon ? <AriaText>{children}</AriaText> : <span className={bem.element('tekst')}>{children}</span>}
    </div>
);

export default IkonTekst;
