import * as React from 'react';
import BEMHelper from 'common/utils/bem';
import { Fordeling, OmForeldre, TilgjengeligeDager } from '../../types';
import Varighet from '../varighet/Varighet';
import HighlightContent from 'common/components/highlightContent/HighlightContent';
import ForelderIkon from 'common/components/foreldrepar/ForelderIkon';
import Block from 'common/components/block/Block';
import { EtikettLiten, Undertittel } from 'nav-frontend-typografi';
import Multibar from '../multibar/Multibar';
import { UttaksplanHexFarge } from 'common/utils/colors';
import { getFordelingStatus } from '../../utils/fordelingStatusUtils';
import { FormattedMessage, injectIntl, InjectedIntlProps, InjectedIntl } from 'react-intl';
import StatusIkon from 'common/components/ikoner/StatusIkon';

import './fordelingGraf.less';
import { getVarighetString } from 'common/utils/intlUtils';
import getMessage from 'common/utils/i18nUtils';

interface OwnProps {
    fordeling: Fordeling;
    tilgjengeligeDager: TilgjengeligeDager;
    omForeldre: OmForeldre;
}

type Props = OwnProps & InjectedIntlProps;

const bem = BEMHelper('fordelingGraf');

interface TittelProps {
    navn: string;
    ikon: React.ReactNode;
    dager: number;
    maksDager: number;
    minDager: number;
    invertert?: boolean;
    intl: InjectedIntl;
}
const Tittel: React.StatelessComponent<TittelProps> = ({ navn, ikon, dager, maksDager, minDager, invertert, intl }) => {
    const forMangeDager = maksDager && maksDager < dager;
    const tittelBem = bem.child('tittel');

    const getTittelVarighet = (): React.ReactNode => {
        if (dager < minDager) {
            return (
                <FormattedMessage
                    id="fordeling.status.dagerIkkeBruktPerson"
                    values={{ navn, dager: getVarighetString(minDager - dager, intl, 'full') }}
                />
            );
        }
        if (dager > maksDager) {
            return (
                <FormattedMessage
                    id="fordeling.status.dagerForMyePerson"
                    values={{ navn, dager: getVarighetString(maksDager - dager, intl, 'full') }}
                />
            );
        }
        return <Varighet dager={Math.abs(dager | 0)} separator={` ${getMessage(intl, 'common.varighet.og')} `} />;
    };

    return (
        <div
            className={tittelBem.classNames(
                tittelBem.block,
                tittelBem.modifierConditional('invertert', invertert === true)
            )}>
            {ikon && <div className={bem.child('tittel').element('ikon')}>{ikon}</div>}
            <div
                className={bem.classNames(
                    tittelBem.child('forbruk').block,
                    tittelBem.child('forbruk').modifierConditional('formangedager', forMangeDager === true)
                )}>
                <EtikettLiten>{navn}</EtikettLiten>
                <div className={tittelBem.child('forbruk').element('dager')}>
                    <HighlightContent watchValue={dager} invalid={dager < 0}>
                        {getTittelVarighet()}
                    </HighlightContent>
                </div>
            </div>
        </div>
    );
};

const FordelingTitler: React.StatelessComponent<Props> = ({ fordeling, omForeldre, tilgjengeligeDager, intl }) => {
    return (
        <div className={bem.element('titler')}>
            <Tittel
                navn={omForeldre.mor.navn}
                ikon={<ForelderIkon forelder={omForeldre.mor.ikonRef} />}
                dager={fordeling.mor.uttaksdager}
                maksDager={tilgjengeligeDager.maksDagerTilgjengeligMor}
                minDager={tilgjengeligeDager.dagerForbeholdtMor}
                intl={intl}
            />
            {omForeldre.farMedmor && fordeling.farMedmor !== undefined && (
                <Tittel
                    navn={omForeldre.farMedmor.navn}
                    ikon={<ForelderIkon forelder={omForeldre.farMedmor.ikonRef} />}
                    dager={fordeling.farMedmor.uttaksdager}
                    maksDager={tilgjengeligeDager.maksDagerTilgjengeligFar}
                    invertert={true}
                    minDager={tilgjengeligeDager.dagerForbeholdtFar}
                    intl={intl}
                />
            )}
        </div>
    );
};

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
    const fordelingStatus = getFordelingStatus(props.fordeling, props.tilgjengeligeDager, props.omForeldre, props.intl);
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
                    <FormattedMessage id={fordelingStatus.tittel.key} values={fordelingStatus.tittel.values} />
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
            <Block margin="s">
                <GrafDeltOmsorg {...props} />
            </Block>
            <FordelingTitler {...props} />
        </section>
    );
};

export default injectIntl(FordelingGraf);
