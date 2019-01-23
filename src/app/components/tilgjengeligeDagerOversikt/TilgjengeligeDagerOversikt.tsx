import * as React from 'react';
import { TilgjengeligeDager } from '../../types';
import BEMHelper from 'common/utils/bem';
import { Dekningsgrad } from 'common/types';
import { getVarighetString } from 'common/utils/intlUtils';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';

import './tilgjengeligeDagerOversikt.less';
import { Systemtittel } from 'nav-frontend-typografi';

interface OwnProps {
    tilgjengeligeDager: TilgjengeligeDager;
    dekningsgrad: Dekningsgrad;
}

type Props = OwnProps & InjectedIntlProps;

const bem = BEMHelper('tilgjengeligeDagerOversikt');

const TilgjengeligeDagerOversikt: React.StatelessComponent<Props> = ({ tilgjengeligeDager, intl }) => (
    <div className={bem.block}>
        <Systemtittel tag="h1">
            Dere har rett på: {getVarighetString(tilgjengeligeDager.dagerTotalt, intl)} med foreldrepenger
        </Systemtittel>
        {tilgjengeligeDager.stønadskontoer.map((konto) => (
            <div className={bem.element('konto')} key={konto.stønadskontoType}>
                <div className={bem.element('kontonavn')}>
                    <FormattedMessage id={`stønadskontotype.${konto.stønadskontoType}`} />
                </div>
                <div className={bem.element('kontoDager')}>{getVarighetString(konto.dager, intl)}</div>
            </div>
        ))}
    </div>
);

export default injectIntl(TilgjengeligeDagerOversikt);
