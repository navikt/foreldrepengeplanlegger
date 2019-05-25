import * as React from 'react';
import BEMHelper from 'common/utils/bem';

import './introduksjon.less';
import { Systemtittel } from 'nav-frontend-typografi';

interface Props {
    ikon: React.ReactNode;
    tittel: React.ReactNode;
    children: React.ReactNode;
    skjulContent?: boolean;
}

const bem = BEMHelper('introduksjon');

const Introduksjon: React.StatelessComponent<Props> = ({ ikon, tittel, children, skjulContent }) => (
    <section className={bem.block}>
        <div className={bem.element('ikon')}>{ikon}</div>
        <div className={bem.element('tittel')}>
            <Systemtittel tag="h1">{tittel}</Systemtittel>
        </div>
        {skjulContent !== true && <div className={bem.element('content')}>{children}</div>}
    </section>
);

export default Introduksjon;
