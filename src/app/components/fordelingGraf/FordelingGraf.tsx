import * as React from 'react';
import BEMHelper from 'common/utils/bem';
import { Fordeling, OmForeldre, TilgjengeligeDager } from '../../types';
// import Varighet from '../varighet/Varighet';
// import HighlightContent from 'common/components/highlightContent/HighlightContent';
// import ForelderIkon from 'common/components/foreldrepar/ForelderIkon';
import Block from 'common/components/block/Block';
import { EtikettLiten, Undertittel } from 'nav-frontend-typografi';
import Multibar from '../multibar/Multibar';
import { UttaksplanHexFarge } from 'common/utils/colors';
import { getFordelingStatus } from '../../utils/fordelingStatusUtils';
import { FormattedMessage } from 'react-intl';

import './fordelingGraf.less';
import StatusIkon from 'common/components/ikoner/StatusIkon';

interface OwnProps {
    fordeling: Fordeling;
    tilgjengeligeDager: TilgjengeligeDager;
    omForeldre: OmForeldre;
}

type Props = OwnProps;

const bem = BEMHelper('fordelingGraf');

// interface TittelProps {
//     navn: string;
//     ikon?: React.ReactNode;
//     dager?: number;
//     maksDager?: number;
// }
// const Tittel: React.StatelessComponent<TittelProps> = ({ navn, ikon, dager, maksDager }) => {
//     if (dager === undefined) {
//         return null;
//     }
//     const forMangeDager = maksDager && maksDager < dager;
//     const tittelBem = bem.child('tittel');
//     const forbrukBem = bem.child('forbruk');
//     return (
//         <div className={bem.classNames(tittelBem.block, { [`${tittelBem.modifier('error')}`]: dager < 0 })}>
//             {ikon && <div className={bem.child('tittel').element('ikon')}>{ikon}</div>}
//             <div
//                 className={bem.classNames(forbrukBem.block, forMangeDager ? forbrukBem.modifier('formye') : undefined)}>
//                 <div className={forbrukBem.element('navn')}>{navn}</div>
//                 <div className={forbrukBem.element('dager')}>
//                     <HighlightContent watchValue={dager} invalid={dager < 0}>
//                         <Varighet dager={Math.abs(dager | 0)} />
//                     </HighlightContent>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const FordelingTitler: React.StatelessComponent<Props> = ({ fordeling, omForeldre, tilgjengeligeDager }) => {
//     const { farMedmor, mor, overforbruk } = fordeling;
//     const dagerTotalt =
//         mor.uttaksdager + (farMedmor ? farMedmor.uttaksdager : 0) + (overforbruk ? overforbruk.uttaksdager : 0);
//     return (
//         <div className={bem.element('titler')}>
//             <PeriodeBlokk farge="lilla" transparent={true}>
//                 <Tittel
//                     navn={omForeldre.mor.navn}
//                     ikon={<ForelderIkon forelder={omForeldre.mor.ikonRef} />}
//                     dager={mor.uttaksdager}
//                     maksDager={tilgjengeligeDager.maksDagerTilgjengeligMor}
//                 />
//             </PeriodeBlokk>
//             {omForeldre.farMedmor && (
//                 <PeriodeBlokk farge="blaa" transparent={true}>
//                     <Tittel
//                         navn={omForeldre.farMedmor.navn}
//                         ikon={<ForelderIkon forelder={omForeldre.farMedmor.ikonRef} />}
//                         dager={farMedmor ? farMedmor.uttaksdager : undefined}
//                         maksDager={tilgjengeligeDager.maksDagerTilgjengeligFar}
//                     />
//                 </PeriodeBlokk>
//             )}
//             <PeriodeBlokk farge="graa" transparent={true}>
//                 <div className={bem.child('tittel').modifier('total')}>
//                     <Tittel navn="Totalt" dager={dagerTotalt} maksDager={dagerTotalt} />
//                 </div>
//             </PeriodeBlokk>
//         </div>
//     );
// };

const BarFellesdager: React.StatelessComponent<{ dagerFelles: number; dagerMor: number; dagerFar: number }> = ({
    dagerFelles,
    dagerMor,
    dagerFar
}) => {
    const maksDager = Math.max(dagerFelles, dagerFar + dagerMor);
    const dagerForMye = maksDager > dagerFelles ? maksDager - dagerFelles : 0;
    const pst = 100 / (maksDager + dagerForMye);

    return (
        <Multibar
            borderColor={UttaksplanHexFarge.graa}
            leftBar={{
                width: dagerMor * pst,
                color: UttaksplanHexFarge.lilla
            }}
            rightBar={{
                width: dagerFar * pst,
                color: UttaksplanHexFarge.blaa
            }}
            centerBar={
                dagerForMye > 0
                    ? {
                          width: dagerForMye * pst,
                          color: UttaksplanHexFarge.rod
                      }
                    : undefined
            }
        />
    );
};

const GrafDeltOmsorg: React.StatelessComponent<Props> = ({ fordeling, tilgjengeligeDager }) => {
    const childBem = bem.child('graf');

    if (!fordeling.farMedmor) {
        return null;
    }
    const { dagerTotalt, dagerForbeholdtFar, dagerForbeholdtMor, dagerFelles } = tilgjengeligeDager;

    const morsBrukteDager = fordeling.mor.uttaksdager;
    const farsBrukteDager = fordeling.farMedmor.uttaksdager;

    const totaltAntallDagerUtenForeldrepengerFørTermin = dagerTotalt;
    const pstMultiplikator = 100 / totaltAntallDagerUtenForeldrepengerFørTermin;

    const pstForbeholdtMor = pstMultiplikator * dagerForbeholdtMor;
    const pstForbeholdtFar = pstMultiplikator * dagerForbeholdtFar;
    const pstFelles = pstMultiplikator * dagerFelles;

    const morsDagerAvFellesdel = Math.max(0, morsBrukteDager - dagerForbeholdtMor);
    const farsDagerAvFellesdel = Math.max(0, farsBrukteDager - dagerForbeholdtFar);

    const morsForbrukAvEgenKvote =
        morsBrukteDager >= dagerForbeholdtMor ? 100 : (100 / dagerForbeholdtMor) * morsBrukteDager;
    const farsForbrukAvEgenKvote =
        farsBrukteDager >= dagerForbeholdtFar ? 100 : (100 / dagerForbeholdtFar) * farsBrukteDager;

    return (
        <div className={childBem.block}>
            <div className={childBem.element('forelder1')} style={{ width: `${pstForbeholdtMor}%` }}>
                <Multibar
                    borderColor={UttaksplanHexFarge.lilla}
                    leftBar={{
                        width: morsForbrukAvEgenKvote,
                        color: UttaksplanHexFarge.lilla
                    }}
                />
            </div>
            <div className={childBem.element('felles')} style={{ width: `${pstFelles}%` }}>
                <BarFellesdager
                    dagerFelles={dagerFelles}
                    dagerMor={morsDagerAvFellesdel}
                    dagerFar={farsDagerAvFellesdel}
                />
            </div>
            <div className={childBem.element('forelder2')} style={{ width: `${pstForbeholdtFar}%` }}>
                <Multibar
                    borderColor={UttaksplanHexFarge.blaa}
                    rightBar={{
                        width: farsForbrukAvEgenKvote,
                        color: UttaksplanHexFarge.blaa
                    }}
                />
            </div>
        </div>
    );
};

const FordelingStatusHeader: React.StatelessComponent<Props> = (props) => {
    const bemHeader = bem.child('statusHeader');
    const fordelingStatus = getFordelingStatus(props.fordeling, props.tilgjengeligeDager, props.omForeldre);
    return (
        <div className={bemHeader.block}>
            <div className={bemHeader.element('ikon')}>
                <StatusIkon status={fordelingStatus.status} size={32} />
            </div>
            <div className={bemHeader.element('statusBlokk')}>
                <EtikettLiten className={bemHeader.element('tittel')} tag="strong">
                    Deres plan
                </EtikettLiten>
                <Undertittel className={bemHeader.element('statusTekst')} tag="h1">
                    <FormattedMessage id={fordelingStatus.tittel} />
                </Undertittel>
            </div>
        </div>
    );
};

const FordelingGraf: React.StatelessComponent<Props> = (props) => {
    const { tilgjengeligeDager } = props;
    if (!tilgjengeligeDager) {
        return null;
    }
    return (
        <section className={bem.block}>
            <Block margin="s">
                <FordelingStatusHeader {...props} />
            </Block>
            <Block margin="xs">
                <GrafDeltOmsorg {...props} />
            </Block>
        </section>
    );
};

export default FordelingGraf;
