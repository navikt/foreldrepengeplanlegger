import * as React from 'react';
import BEMHelper from 'common/utils/bem';
import { Normaltekst } from 'nav-frontend-typografi';

import './personkort.less';

interface Props {
    tittel?: string;
    children: React.ReactNode;
    ikon: React.ReactNode;
    invertert?: boolean;
}

const bem = BEMHelper('personkort');

const Personkort: React.StatelessComponent<Props> = ({ tittel, children, ikon, invertert }) => {
    return (
        <div className={bem.classNames(bem.block, bem.modifierConditional('invertert', invertert === true))}>
            <div className={bem.element('ikon')}>{ikon}</div>
            <div className={bem.element('innhold')}>
                {tittel && <Normaltekst className="tittel">{tittel}</Normaltekst>}
                <div className={bem.element('tekst')}>{children}</div>
            </div>
        </div>
    );
};
export default Personkort;
