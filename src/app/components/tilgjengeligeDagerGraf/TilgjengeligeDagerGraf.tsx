import * as React from 'react';
import { TilgjengeligeDager, OmForeldre } from '../../types';
import BEMHelper from 'common/utils/bem';
import { getProsentFordeling } from '../../utils/tilgjengeligeDagerUtils';
import Multibar from '../multibar/Multibar';
import { UttaksplanHexFarge } from 'common/utils/colors';

import './tilgjengeligeDagerGraf.less';
import { getVarighetString } from 'common/utils/intlUtils';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import Personkort from '../personkort/Personkort';
import ForelderIkon from 'common/components/foreldrepar/ForelderIkon';

interface OwnProps {
    tilgjengeligeDager: TilgjengeligeDager;
    omForeldre: OmForeldre;
}

type Props = OwnProps & InjectedIntlProps;

const bem = BEMHelper('tilgjengeligeDagerGraf');

const DeltOmsorgGraf: React.StatelessComponent<Props> = ({ tilgjengeligeDager, omForeldre, intl }) => {
    const fordeling = getProsentFordeling(tilgjengeligeDager, true);
    const txtMor =
        tilgjengeligeDager.dagerForeldrepengerFørFødsel > 0
            ? `${tilgjengeligeDager.dagerForeldrepengerFørFødsel / 5} + ${tilgjengeligeDager.dagerMor / 5} uker`
            : getVarighetString(tilgjengeligeDager.dagerMor, intl);
    return (
        <div className={bem.block}>
            <div className={bem.element('bars')}>
                <div className={bem.element('forelder1')} style={{ width: `${fordeling.pstMor}%` }}>
                    <div className={bem.element('barTitle')}>
                        <Personkort
                            ikon={<ForelderIkon forelder={omForeldre.mor.ikonRef} width={35} />}
                            textValign="bottom">
                            {omForeldre.mor.navn}
                            <br /> sin del
                        </Personkort>
                    </div>
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
                    <div className={bem.element('barTitle')}>Fellesperiode</div>
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
                {omForeldre.farMedmor && (
                    <div className={bem.element('forelder2')} style={{ width: `${fordeling.pstFarMedmor}%` }}>
                        <div className={bem.element('barTitle')}>
                            <Personkort
                                ikon={<ForelderIkon forelder={omForeldre.farMedmor.ikonRef} width={35} />}
                                invertert={true}
                                textValign="bottom">
                                {omForeldre.farMedmor.navn}
                                <br /> sin del
                            </Personkort>
                        </div>
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
                )}
            </div>
        </div>
    );
};

const AleneomsorgGraf: React.StatelessComponent<Props> = ({ tilgjengeligeDager, omForeldre, intl }) => {
    const txt =
        tilgjengeligeDager.dagerForeldrepengerFørFødsel > 0
            ? `${tilgjengeligeDager.dagerForeldrepengerFørFødsel / 5} + ${tilgjengeligeDager.dagerForeldrepenger /
                  5} uker`
            : getVarighetString(tilgjengeligeDager.dagerEtterTermin, intl);
    return (
        <div className={bem.block}>
            <Multibar
                borderColor={UttaksplanHexFarge.graa}
                leftBar={{
                    color: omForeldre.bareFar ? UttaksplanHexFarge.blaa : UttaksplanHexFarge.lilla,
                    width: 100,
                    text: <div className={bem.element('barTekst')}>{txt}</div>
                }}
            />
        </div>
    );
};
const TilgjengeligeDagerGraf: React.StatelessComponent<Props> = (props) => {
    return props.omForeldre.erDeltOmsorg ? <DeltOmsorgGraf {...props} /> : <AleneomsorgGraf {...props} />;
};

export default injectIntl(TilgjengeligeDagerGraf);
