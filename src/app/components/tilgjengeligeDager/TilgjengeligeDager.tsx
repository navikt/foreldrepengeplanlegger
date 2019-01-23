import * as React from 'react';
import { TilgjengeligStønadskonto } from '../../types/st\u00F8nadskontoer';
import BEMHelper from 'common/utils/bem';
import { Dekningsgrad } from 'common/types';
import { getVarighetString } from 'common/utils/intlUtils';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';

import './tilgjengeligeDager.less';
import { Systemtittel } from 'nav-frontend-typografi';

interface OwnProps {
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[];
    dekningsgrad: Dekningsgrad;
}

type Props = OwnProps & InjectedIntlProps;

const bem = BEMHelper('tilgjengeligeDager');

const getDagerForDekningsgrad = (konto: TilgjengeligStønadskonto, dekningsgrad: Dekningsgrad): number =>
    dekningsgrad === '80' ? konto.dager80 : konto.dager100;

const TilgjengeligeDager: React.StatelessComponent<Props> = ({ tilgjengeligeStønadskontoer, dekningsgrad, intl }) => (
    <div className={bem.block}>
        <Systemtittel tag="h1">Tilgjengelige dager</Systemtittel>
        {tilgjengeligeStønadskontoer.map((konto) => (
            <div className={bem.element('konto')} key={konto.stønadskonto}>
                <div className={bem.element('kontonavn')}>
                    <FormattedMessage id={`stønadskontotype.${konto.stønadskonto}`} />
                </div>
                <div className={bem.element('kontoDager')}>
                    {getVarighetString(getDagerForDekningsgrad(konto, dekningsgrad), intl)}
                </div>
            </div>
        ))}
        <div className={bem.element('total')} />
    </div>
);

export default injectIntl(TilgjengeligeDager);
