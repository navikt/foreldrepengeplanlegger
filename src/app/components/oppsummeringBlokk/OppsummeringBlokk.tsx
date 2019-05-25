import * as React from 'react';
import BEMHelper from 'common/utils/bem';
import { Systemtittel } from 'nav-frontend-typografi';
import LinkButton from 'common/components/linkButton/LinkButton';
import { FormattedMessage } from 'react-intl';

import './oppsummeringBlokk.less';

interface Props {
    tittel: string;
    illustrasjoner?: React.ReactNode;
    onRequestChange: () => void;
}

const bem = BEMHelper('oppsummeringBlokk');

const OppsummeringBlokk: React.StatelessComponent<Props> = ({ tittel, onRequestChange, illustrasjoner, children }) => (
    <div
        className={bem.classNames(
            bem.block,
            bem.modifierConditional('medIllustrasjoner', illustrasjoner !== undefined)
        )}>
        <div className={bem.element('contentWrapper')}>
            <header>
                <Systemtittel tag="h3" className={bem.element('tittel')}>
                    {tittel}
                </Systemtittel>
                <LinkButton onClick={onRequestChange} className="no-print">
                    <FormattedMessage id="oppsummering.endre" />
                </LinkButton>
            </header>
            <div className={bem.element('content')}>{children}</div>
        </div>
        {illustrasjoner && (
            <div className={bem.element('illustrasjoner')} role="presentation" aria-hidden={true}>
                {illustrasjoner}
            </div>
        )}
    </div>
);

export default OppsummeringBlokk;
