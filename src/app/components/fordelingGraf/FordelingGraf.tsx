import * as React from 'react';
import BEMHelper from 'common/utils/bem';
import { OmForeldre, TilgjengeligeDager, Forbruk } from '../../types';
import Varighet from '../varighet/Varighet';
import HighlightContent from 'common/components/highlightContent/HighlightContent';
import ForelderIkon from 'common/components/foreldrepar/ForelderIkon';
import Block from 'common/components/block/Block';
import Multibar from '../multibar/Multibar';
import { UttaksplanHexFarge } from 'common/utils/colors';
import { getFordelingStatus, FordelingStatus } from '../../utils/fordelingStatusUtils';
import { FormattedMessage, injectIntl, InjectedIntlProps, InjectedIntl } from 'react-intl';
import { getVarighetString } from 'common/utils/intlUtils';
import getMessage from 'common/utils/i18nUtils';
import Personkort from '../personkort/Personkort';
import { getProsentFordeling } from '../../utils/tilgjengeligeDagerUtils';
import { RegelAvvik, RegelAlvorlighet } from '../../utils/regler/types';

import './fordelingGraf.less';
import FordelingStatusHeader from './components/FordelingStatusHeader';
import GrafDeltOmsorg from './components/GrafDeltOmsorg';

interface OwnProps {
    forbruk: Forbruk;
    tilgjengeligeDager: TilgjengeligeDager;
    omForeldre: OmForeldre;
    regelAvvik: RegelAvvik[];
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
        <Personkort ikon={ikon} tittel={navn} invertert={invertert}>
            <div
                className={tittelBem.classNames(
                    tittelBem.element('dager'),
                    tittelBem.modifierConditional('formangedager', dagerForMye > 0)
                )}>
                <HighlightContent watchValue={dager} invalid={dager < 0}>
                    {getTittelVarighet()}
                </HighlightContent>
            </div>
        </Personkort>
    );
};

const FordelingTitler: React.StatelessComponent<Props> = ({ forbruk, omForeldre, intl }) => {
    const { mor, farMedmor } = forbruk;
    return (
        <div className={bem.element('titler')}>
            {!omForeldre.bareFar && (
                <Tittel
                    navn={omForeldre.mor.navn}
                    ikon={<ForelderIkon forelder={omForeldre.mor.ikonRef} />}
                    dager={mor.dagerTotalt}
                    dagerForLite={mor.dagerForLite}
                    dagerForMye={mor.dagerForMye}
                    intl={intl}
                />
            )}
            {omForeldre.farMedmor && farMedmor !== undefined && (
                <Tittel
                    navn={omForeldre.farMedmor.navn}
                    ikon={<ForelderIkon forelder={omForeldre.farMedmor.ikonRef} />}
                    dager={farMedmor.dagerTotalt}
                    dagerForLite={farMedmor.dagerForLite}
                    dagerForMye={farMedmor.dagerForMye}
                    invertert={!omForeldre.bareFar}
                    intl={intl}
                />
            )}
        </div>
    );
};

const GrafAleneomsorgMor: React.StatelessComponent<Props> = ({ forbruk, tilgjengeligeDager }) => {
    const childBem = bem.child('graf');
    const tg = tilgjengeligeDager;

    const maksTillatt = tg.dagerForeldrepenger + forbruk.dagerForeldrepengerFørFødsel;
    const maksBrukt =
        forbruk.mor.dagerUtenForeldrepengerFørFødsel +
        forbruk.dagerForeldrepengerFørFødsel +
        forbruk.ekstradagerFørTermin;

    const enDagIProsent = 100 / Math.max(maksBrukt, maksTillatt);
    const brukIProsent = Math.min(100, enDagIProsent * Math.min(tg.dagerTotalt, forbruk.dagerTotalt));
    const pstForMye = forbruk.mor.dagerForMye > 0 ? Math.min(100, enDagIProsent * forbruk.mor.dagerForMye) : undefined;
    return (
        <div className={childBem.block}>
            <Multibar
                borderColor={UttaksplanHexFarge.lilla}
                leftBar={{
                    width: brukIProsent,
                    color: UttaksplanHexFarge.lilla
                }}
                centerBar={
                    pstForMye
                        ? {
                              width: pstForMye,
                              color: UttaksplanHexFarge.rod
                          }
                        : undefined
                }
            />
        </div>
    );
};

const GrafAleneomsorgFarMedmor: React.StatelessComponent<Props> = ({ forbruk, tilgjengeligeDager }) => {
    const childBem = bem.child('graf');
    const tg = tilgjengeligeDager;

    if (!forbruk.farMedmor) {
        return null;
    }

    const enDagIProsent = 100 / Math.max(tg.dagerTotalt, forbruk.farMedmor.dagerTotalt);
    const brukIProsent = Math.min(100, enDagIProsent * Math.min(tg.dagerTotalt, forbruk.dagerTotalt));
    const pstForMye =
        forbruk.farMedmor.dagerForMye > 0 ? Math.min(100, enDagIProsent * forbruk.farMedmor.dagerForMye) : undefined;

    return (
        <div className={childBem.block}>
            <Multibar
                borderColor={UttaksplanHexFarge.blaa}
                leftBar={{
                    width: brukIProsent,
                    color: UttaksplanHexFarge.blaa
                }}
                centerBar={
                    pstForMye
                        ? {
                              width: pstForMye,
                              color: UttaksplanHexFarge.rod
                          }
                        : undefined
                }
            />
        </div>
    );
};

const GrafDeltOmsorgWrapper: React.StatelessComponent<Props> = ({ forbruk, tilgjengeligeDager }) => {
    const tg = tilgjengeligeDager;

    if (!forbruk.farMedmor) {
        return null;
    }

    const morsBrukteDager = forbruk.mor.dagerEtterTermin + forbruk.mor.ekstradagerFørTermin;
    const farsBrukteDager = forbruk.farMedmor.dagerTotalt;

    const { pstMor, pstFarMedmor, pstFelles } = getProsentFordeling(tilgjengeligeDager, false);

    const morsDagerAvFellesdel = Math.max(0, morsBrukteDager - tg.dagerMor);
    const farsDagerAvFellesdel = Math.max(0, farsBrukteDager - tg.dagerFar);

    const farsForbrukAvEgenKvote = farsBrukteDager >= tg.dagerFar ? 100 : (100 / tg.dagerFar) * farsBrukteDager;
    const maksMorsKvoteBar = tg.dagerMor + forbruk.dagerForeldrepengerFørFødsel + forbruk.ekstradagerFørTermin;
    const morsBarIPst = Math.min(
        100,
        (100 / maksMorsKvoteBar) * (morsBrukteDager + forbruk.dagerForeldrepengerFørFødsel)
    );

    // Felles
    const maksDager = Math.max(tg.dagerFelles, farsDagerAvFellesdel + morsDagerAvFellesdel);
    const dagerForMye = maksDager > tg.dagerFelles ? maksDager - tg.dagerFelles : 0;
    const fellesPst = 100 / (maksDager + dagerForMye);

    return (
        <GrafDeltOmsorg
            mor={{
                pstAvTotal: pstMor,
                pstBrukt: morsBarIPst
            }}
            felles={{
                pstAvTotal: pstFelles,
                pstBruktMor: fellesPst * morsDagerAvFellesdel,
                pstBruktFar: fellesPst * farsDagerAvFellesdel,
                pstForMye: fellesPst * dagerForMye
            }}
            farMedmor={{
                pstAvTotal: pstFarMedmor,
                pstBrukt: farsForbrukAvEgenKvote
            }}
        />
    );
};

const FordelingStatusHeaderWrapper: React.StatelessComponent<Props> = (props) => {
    const planenHarFordelingsavvik =
        props.regelAvvik.filter(
            (avvik) => avvik.alvorlighet !== RegelAlvorlighet.INFO && avvik.kategori === 'fordeling'
        ).length > 0;
    const planenHarAvvikSomErFeil =
        props.regelAvvik.filter(
            (avvik) => avvik.alvorlighet === RegelAlvorlighet.FEIL && avvik.kategori !== 'fordeling'
        ).length > 0;
    const fordelingStatus: FordelingStatus =
        planenHarAvvikSomErFeil && !planenHarFordelingsavvik
            ? { status: 'feil', tittel: { key: 'regel.feil.uttaksplanStatusTittel' } }
            : getFordelingStatus(props.forbruk, props.omForeldre, props.intl);
    const { intl } = props;
    return (
        <FordelingStatusHeader
            ariaTitle="Status på planen"
            status={fordelingStatus.status}
            tittel={getMessage(props.intl, `fordeling.tittel.${props.omForeldre.erDeltOmsorg ? 'deres' : 'din'}`)}
            statusTekst={getMessage(intl, fordelingStatus.tittel.key, fordelingStatus.tittel.values)}
        />
    );
};

const FordelingGraf: React.StatelessComponent<Props> = (props) => {
    const { tilgjengeligeDager } = props;
    if (!tilgjengeligeDager) {
        return null;
    }
    return (
        <section className={bem.block}>
            <Block margin="s" screenOnly={true}>
                <FordelingStatusHeaderWrapper {...props} />
            </Block>
            <Block margin="s" screenOnly={true}>
                {props.omForeldre.erDeltOmsorg && <GrafDeltOmsorgWrapper {...props} />}
                {props.omForeldre.bareMor && <GrafAleneomsorgMor {...props} />}
                {props.omForeldre.bareFar && <GrafAleneomsorgFarMedmor {...props} />}
            </Block>
            <FordelingTitler {...props} />
        </section>
    );
};

export default injectIntl(FordelingGraf);
