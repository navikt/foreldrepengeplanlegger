import * as React from 'react';
import BEMHelper from 'common/utils/bem';
import { OmForeldre, TilgjengeligeDager, Forbruk, Forelder } from '../../types';
import Block from 'common/components/block/Block';
import { getFordelingStatus, FordelingStatus } from '../../utils/fordelingStatusUtils';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/utils/i18nUtils';
import { getProsentFordeling } from '../../utils/tilgjengeligeDagerUtils';
import { RegelAvvik, RegelAlvorlighet } from '../../utils/regler/types';
import FordelingStatusHeader from './components/FordelingStatusHeader';
import GrafDeltOmsorg from './components/GrafDeltOmsorg';
import FordelingTitler from './components/FordelingTitler';
import GrafAleneomsorg from './components/GrafAleneomsorg';

import './fordelingGraf.less';

interface OwnProps {
    forbruk: Forbruk;
    tilgjengeligeDager: TilgjengeligeDager;
    omForeldre: OmForeldre;
    regelAvvik: RegelAvvik[];
}

type Props = OwnProps & InjectedIntlProps;

export const fordelingGrafBem = BEMHelper('fordelingGraf');

const FordelingTitlerWrapper: React.StatelessComponent<Props> = ({ forbruk, omForeldre, intl }) => {
    const { mor, farMedmor } = forbruk;
    return (
        <FordelingTitler
            mor={
                !omForeldre.farMedmor && farMedmor !== undefined
                    ? {
                          navn: omForeldre.mor.navn,
                          ikonRef: omForeldre.mor.ikonRef,
                          dagerTotalt: mor.dagerTotalt,
                          dagerForLite: mor.dagerForLite,
                          dagerForMye: mor.dagerForMye
                      }
                    : undefined
            }
            farMedmor={
                farMedmor && omForeldre.farMedmor
                    ? {
                          navn: omForeldre.farMedmor.navn,
                          ikonRef: omForeldre.farMedmor.ikonRef,
                          dagerTotalt: farMedmor.dagerTotalt,
                          dagerForLite: farMedmor.dagerForLite,
                          dagerForMye: farMedmor.dagerForMye
                      }
                    : undefined
            }
        />
    );
};

const GrafAleneomsorgMorWrapper: React.StatelessComponent<Props> = ({ forbruk, tilgjengeligeDager }) => {
    const tg = tilgjengeligeDager;
    const maksTillatt = tg.dagerForeldrepenger + forbruk.dagerForeldrepengerFørFødsel;
    const maksBrukt =
        forbruk.mor.dagerUtenForeldrepengerFørFødsel +
        forbruk.dagerForeldrepengerFørFødsel +
        forbruk.ekstradagerFørTermin;

    const enDagIProsent = 100 / Math.max(maksBrukt, maksTillatt);
    const brukIProsent = Math.min(100, enDagIProsent * Math.min(tg.dagerTotalt, forbruk.dagerTotalt));
    const pstForMye = forbruk.mor.dagerForMye > 0 ? Math.min(100, enDagIProsent * forbruk.mor.dagerForMye) : undefined;
    return <GrafAleneomsorg pstBrukt={brukIProsent} pstForMye={pstForMye} forelder={Forelder.mor} />;
};

const GrafAleneomsorgFarMedmorWrapper: React.StatelessComponent<Props> = ({ forbruk, tilgjengeligeDager }) => {
    const tg = tilgjengeligeDager;
    if (!forbruk.farMedmor) {
        return null;
    }
    const enDagIProsent = 100 / Math.max(tg.dagerTotalt, forbruk.farMedmor.dagerTotalt);
    const brukIProsent = Math.min(100, enDagIProsent * Math.min(tg.dagerTotalt, forbruk.dagerTotalt));
    const pstForMye =
        forbruk.farMedmor.dagerForMye > 0 ? Math.min(100, enDagIProsent * forbruk.farMedmor.dagerForMye) : undefined;

    return <GrafAleneomsorg pstBrukt={brukIProsent} pstForMye={pstForMye} forelder={Forelder.farMedmor} />;
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
        <section className={fordelingGrafBem.block}>
            <Block margin="s" screenOnly={true}>
                <FordelingStatusHeaderWrapper {...props} />
            </Block>
            <Block margin="s" screenOnly={true}>
                {props.omForeldre.erDeltOmsorg && <GrafDeltOmsorgWrapper {...props} />}
                {props.omForeldre.bareMor && <GrafAleneomsorgMorWrapper {...props} />}
                {props.omForeldre.bareFar && <GrafAleneomsorgFarMedmorWrapper {...props} />}
            </Block>
            <FordelingTitlerWrapper {...props} />
        </section>
    );
};

export default injectIntl(FordelingGraf);
