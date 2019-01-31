import * as React from 'react';
import BEMHelper from 'common/utils/bem';

interface Props {
    ikon: React.ReactNode;
    children: React.ReactNode;
}

const bem = BEMHelper('ikonLabel');

const IkonLabel: React.StatelessComponent<Props> = ({ ikon, children }) => (
    <div className={bem.block}>
        <div className={bem.element('ikon')} aria-hidden={true} role="presentation">
            {ikon}
        </div>
        <div className={bem.element('label')}>{children}</div>
    </div>
);

export default IkonLabel;
