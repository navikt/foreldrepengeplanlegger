import * as React from 'react';
import BEMHelper from 'common/utils/bem';
import { OmForeldre, TilgjengeligeDager, Forbruk } from '../../types';
import Varighet from '../varighet/Varighet';
import HighlightContent from 'common/components/highlightContent/HighlightContent';
import ForelderIkon from 'common/components/foreldrepar/ForelderIkon';
import Block from 'common/components/block/Block';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import Multibar from '../multibar/Multibar';
import { UttaksplanHexFarge } from 'common/utils/colors';
import { getFordelingStatus } from '../../utils/fordelingStatusUtils';
import { FormattedMessage, injectIntl, InjectedIntlProps, InjectedIntl } from 'react-intl';
import StatusIkon from 'common/components/ikoner/StatusIkon';
import { getVarighetString } from 'common/utils/intlUtils';
import getMessage from 'common/utils/i18nUtils';

import './fordelingGraf.less';

interface OwnProps {
    forbruk: Forbruk;
    tilgjengeligeDager: TilgjengeligeDager;
    omForeldre: OmForeldre;
}

type Props = OwnProps & InjectedIntlProps;

const bem = BEMHelper('fordelingGraf');

interface TittelProps {
    navn: string;
    ikon: React.ReactNode;
    dager: number;
    dagerForMye: number;
    dagerForLite: number;
    invertert?: boolean;
    intl: InjectedIntl;
}
const Tittel: React.StatelessComponent<TittelProps> = ({
    navn,
    ikon,
    dager,
    dagerForLite,
    dagerForMye,
    invertert,
    intl
}) => {
    const tittelBem = bem.child('tittel');

    const getTittelVarighet = (): React.ReactNode => {
        if (dagerForLite > 0) {
            return (
                <FormattedMessage
                    id="fordeling.status.person.forLite"
                    values={{ dager: getVarighetString(dagerForLite, intl, 'full') }}
                />
            );
        }
        if (dagerForMye) {
            return (
                <FormattedMessage
                    id="fordeling.status.person.forMye"
                    values={{ dager: getVarighetString(dagerForMye, intl, 'full') }}
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
            <div className={tittelBem.child('forbruk').block}>
                <Normaltekst className="c-label">{navn}</Normaltekst>
                <div
                    className={tittelBem.classNames(
                        tittelBem.child('forbruk').element('dager'),
                        tittelBem.modifierConditional('formangedager', dagerForMye > 0)
                    )}>
                    <HighlightContent watchValue={dager} invalid={dager < 0}>
                        {getTittelVarighet()}
                    </HighlightContent>
                </div>
            </div>
        </div>
    );
};

const FordelingTitler: React.StatelessComponent<Props> = ({ forbruk, omForeldre, tilgjengeligeDager, intl }) => {
    const { mor, farMedmor } = forbruk;
    return (
        <div className={bem.element('titler')}>
            <Tittel
                navn={omForeldre.mor.navn}
                ikon={<ForelderIkon forelder={omForeldre.mor.ikonRef} />}
                dager={mor.dagerTotalt}
                dagerForLite={mor.dagerForLite}
                dagerForMye={mor.dagerForMye}
                intl={intl}
            />
            {omForeldre.farMedmor && farMedmor !== undefined && (
                <Tittel
                    navn={omForeldre.farMedmor.navn}
                    ikon={<ForelderIkon forelder={omForeldre.farMedmor.ikonRef} />}
                    dager={farMedmor.dagerTotalt}
                    dagerForLite={farMedmor.dagerForLite}
                    dagerForMye={farMedmor.dagerForMye}
                    invertert={true}
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

const GrafDeltOmsorg: React.StatelessComponent<Props> = ({ forbruk, tilgjengeligeDager }) => {
    const childBem = bem.child('graf');
    const tg = tilgjengeligeDager;

    if (!forbruk.farMedmor) {
        return null;
    }

    const morsBrukteDager = forbruk.mor.dagerEtterTermin + forbruk.mor.ekstradagerFørTermin;
    const farsBrukteDager = forbruk.farMedmor.dagerTotalt;

    const totaltAntallDagerUtenForeldrepengerFørTermin = tg.dagerEtterTermin;
    const pstMultiplikator = 100 / totaltAntallDagerUtenForeldrepengerFørTermin;

    const pstForbeholdtMor = pstMultiplikator * tg.dagerMor;
    const pstForbeholdtFar = pstMultiplikator * tg.dagerFar;
    const pstFelles = pstMultiplikator * tg.dagerFelles;

    const morsDagerAvFellesdel = Math.max(0, morsBrukteDager - tg.dagerMor);
    const farsDagerAvFellesdel = Math.max(0, farsBrukteDager - tg.dagerFar);

    const morsForbrukAvEgenKvote = morsBrukteDager >= tg.dagerMor ? 100 : (100 / tg.dagerMor) * morsBrukteDager;
    const farsForbrukAvEgenKvote = farsBrukteDager >= tg.dagerFar ? 100 : (100 / tg.dagerFar) * farsBrukteDager;

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
                    dagerFelles={tg.dagerFelles}
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
    const fordelingStatus = getFordelingStatus(props.forbruk, props.omForeldre, props.intl);
    return (
        <div className={bemHeader.block}>
            <div className={bemHeader.element('ikon')}>
                <StatusIkon status={fordelingStatus.status} size={32} />
            </div>
            <div className={bemHeader.element('statusBlokk')}>
                <Normaltekst className={bemHeader.classNames(bemHeader.element('tittel'), 'c-label')} tag="strong">
                    Deres plan
                </Normaltekst>
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
