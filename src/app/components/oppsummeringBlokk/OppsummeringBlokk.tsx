import * as React from 'react';
import BEMHelper from 'common/utils/bem';
import { Systemtittel } from 'nav-frontend-typografi';
import LinkButton from 'common/components/linkButton/LinkButton';

import './oppsummeringBlokk.less';

interface Props {
    tittel: string;
    onRequestChange: () => void;
}

const bem = BEMHelper('oppsummeringBlokk');

const OppsummeringBlokk: React.StatelessComponent<Props> = ({ tittel, onRequestChange, children }) => (
    <section className={bem.block}>
        <header>
            <Systemtittel className={bem.element('tittel')}>{tittel}</Systemtittel>
            <LinkButton onClick={onRequestChange}>Endre</LinkButton>
        </header>
        <div className={bem.element('content')}>{children}</div>
    </section>
);

export default OppsummeringBlokk;
