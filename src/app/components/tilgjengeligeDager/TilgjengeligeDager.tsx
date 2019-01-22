import * as React from 'react';
import { TilgjengeligStønadskonto } from '../../types/st\u00F8nadskontoer';
import BEMHelper from 'common/utils/bem';

interface Props {
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[];
}

const bem = BEMHelper('tilgjengeligeDager');

const TilgjengeligeDager: React.StatelessComponent<Props> = ({ tilgjengeligeStønadskontoer }) => (
    <div className={bem.block}>
        {tilgjengeligeStønadskontoer.map((konto) => <div key={konto.konto}>{konto.konto}</div>)}
    </div>
);

export default TilgjengeligeDager;
