import * as React from 'react';
import { TilgjengeligeDager, OmForeldre } from '../../types';
import BEMHelper from 'common/utils/bem';
import { getProsentFordeling } from '../../utils/tilgjengeligeDagerUtils';
import Multibar from '../multibar/Multibar';
import { UttaksplanHexFarge } from 'common/utils/colors';

import './tilgjengeligeDagerGraf.less';
import { getVarighetString } from 'common/utils/intlUtils';
import { injectIntl, InjectedIntlProps } from 'react-intl';

interface OwnProps {
    tilgjengeligeDager: TilgjengeligeDager;
    omForeldre: OmForeldre;
}

type Props = OwnProps & InjectedIntlProps;

const DeltOmsorgGraf: React.StatelessComponent<Props> = ({ tilgjengeligeDager, intl }) => {
    const bem = BEMHelper('tilgjengeligeDagerGraf');

    const fordeling = getProsentFordeling(tilgjengeligeDager, true);
    const txtMor = `${tilgjengeligeDager.dagerMor / 5} + ${tilgjengeligeDager.dagerForeldrepengerFørFødsel / 5} uker`;
    return (
        <div className={bem.block}>
            <div className={bem.element('forelder1')} style={{ width: `${fordeling.pstMor}%` }}>
                <Multibar
                    borderColor={UttaksplanHexFarge.graa}
                    leftBar={{
                        color: UttaksplanHexFarge.lilla,
                        width: 100,
                        text: <div className={bem.element('barTekst')}>{txtMor}</div>
                    }}
                />
            </div>
            <div className={bem.element('felles')} style={{ width: `${fordeling.pstFelles}%` }}>
                <Multibar
                    borderColor={UttaksplanHexFarge.graa}
                    leftBar={{
                        color: UttaksplanHexFarge.lilla,
                        color2: UttaksplanHexFarge.blaa,
                        width: 100,
                        text: (
                            <div className={bem.element('barTekst')}>
                                {getVarighetString(tilgjengeligeDager.dagerFelles, intl)}
                            </div>
                        )
                    }}
                />
            </div>
            <div className={bem.element('forelder2')} style={{ width: `${fordeling.pstFarMedmor}%` }}>
                {' '}
                <Multibar
                    borderColor={UttaksplanHexFarge.graa}
                    leftBar={{
                        color: UttaksplanHexFarge.blaa,
                        width: 100,
                        text: (
                            <div className={bem.element('barTekst')}>
                                {getVarighetString(tilgjengeligeDager.dagerFar, intl)}
                            </div>
                        )
                    }}
                />
            </div>
        </div>
    );
};

const TilgjengeligeDagerGraf: React.StatelessComponent<Props> = (props) => {
    return props.omForeldre.antallForeldre === 2 ? <DeltOmsorgGraf {...props} /> : <div>aleneomsorg</div>;
};

export default injectIntl(TilgjengeligeDagerGraf);
