import { TilgjengeligeDager, MorsForbruk, ForelderForbruk, Forbruk } from 'shared/types';
import { FordelingDeltOmsorg, FordelingIkkeDeltOmsorg } from 'shared/components/fordelingGraf/types';
import { IntlShape } from 'react-intl';
import { getVarighetString } from 'common/util/intlUtils';
import getMessage from 'common/util/i18nUtils';
import { Forelder } from 'common/types';

export const getProsentFordelingPerDel = (
    tilgjengeligeDager: TilgjengeligeDager,
    inkluderForeldrepengerFørTermin: boolean
): {
    pstMor: number;
    pstFelles: number;
    pstFarMedmor: number;
} => {
    const pstMultiplikator =
        100 / (inkluderForeldrepengerFørTermin ? tilgjengeligeDager.dagerTotalt : tilgjengeligeDager.dagerEtterTermin);

    const pstMor =
        pstMultiplikator * tilgjengeligeDager.dagerMor +
        (inkluderForeldrepengerFørTermin ? tilgjengeligeDager.dagerForeldrepengerFørFødsel : 0);
    const pstFarMedmor = pstMultiplikator * tilgjengeligeDager.dagerFar;
    const pstFelles = 100 - pstMor - pstFarMedmor;

    return {
        pstMor,
        pstFarMedmor,
        pstFelles,
    };
};

export const getFordelingForbrukMor = (
    forbrukMor: MorsForbruk,
    tilgjengeligeDager: TilgjengeligeDager
): FordelingIkkeDeltOmsorg => {
    const {
        dagerForeldrepengerFørFødsel,
        ekstradagerFørTermin,
        dagerTotalt,
        dagerForMye,
        dagerUtenForeldrepengerFørFødsel,
    } = forbrukMor;
    const tg = tilgjengeligeDager;
    const maksTillatt = tg.dagerForeldrepenger + dagerForeldrepengerFørFødsel;
    const maksBrukt = dagerUtenForeldrepengerFørFødsel + dagerForeldrepengerFørFødsel + ekstradagerFørTermin;

    const enDagIProsent = 100 / Math.max(maksBrukt, maksTillatt);
    const brukIProsent = Math.min(100, enDagIProsent * Math.min(tg.dagerTotalt, dagerTotalt));
    const pstForMye = dagerForMye > 0 ? Math.min(100, enDagIProsent * dagerForMye) : undefined;
    return {
        type: 'ikkeDeltOmsorg',
        forelder: Forelder.mor,
        pstBrukt: brukIProsent,
        pstForMye,
    };
};

export const getFordelingForbrukFarMedmor = (
    forbrukFarMedmor: ForelderForbruk,
    tilgjengeligeDager: TilgjengeligeDager
): FordelingIkkeDeltOmsorg => {
    const { dagerTotalt, dagerForMye } = forbrukFarMedmor;
    const tg = tilgjengeligeDager;
    const enDagIProsent = 100 / Math.max(tg.dagerTotalt, dagerTotalt);
    const brukIProsent = Math.min(100, enDagIProsent * Math.min(tg.dagerTotalt, dagerTotalt));
    const pstForMye = dagerForMye > 0 ? Math.min(100, enDagIProsent * dagerForMye) : undefined;
    return {
        type: 'ikkeDeltOmsorg',
        forelder: Forelder.farMedmor,
        pstBrukt: brukIProsent,
        pstForMye,
    };
};

export const getFordelingForbrukDeltOmsorg = (
    forbruk: Forbruk,
    tilgjengeligeDager: TilgjengeligeDager
): FordelingDeltOmsorg => {
    const { mor, farMedmor, dagerForeldrepengerFørFødsel, ekstradagerFørTermin } = forbruk;
    const tg = tilgjengeligeDager;
    const morsBrukteDager = mor.dagerEtterTermin + mor.ekstradagerFørTermin;
    const farsBrukteDager = farMedmor!.dagerTotalt;
    const { pstMor, pstFarMedmor, pstFelles } = getProsentFordelingPerDel(tilgjengeligeDager, false);
    const morsDagerAvFellesdel = Math.max(0, morsBrukteDager - tg.dagerMor);
    const farsDagerAvFellesdel = Math.max(0, farsBrukteDager - tg.dagerFar);
    const farsForbrukAvEgenKvote = farsBrukteDager >= tg.dagerFar ? 100 : (100 / tg.dagerFar) * farsBrukteDager;
    const maksMorsKvoteBar = tg.dagerMor + dagerForeldrepengerFørFødsel + ekstradagerFørTermin;
    const morsBarIPst = Math.min(100, (100 / maksMorsKvoteBar) * (morsBrukteDager + dagerForeldrepengerFørFødsel));

    // Felles
    const maksDager = Math.max(tg.dagerFelles, farsDagerAvFellesdel + morsDagerAvFellesdel);
    const dagerForMye = maksDager > tg.dagerFelles ? maksDager - tg.dagerFelles : 0;
    const fellesPst = 100 / (maksDager + dagerForMye);

    return {
        type: 'deltOmsorg',
        mor: {
            pstAvTotal: pstMor,
            pstBrukt: morsBarIPst,
        },
        felles: {
            pstAvTotal: pstFelles,
            pstBruktMor: fellesPst * morsDagerAvFellesdel,
            pstBruktFar: fellesPst * farsDagerAvFellesdel,
            pstForMye: fellesPst * dagerForMye,
        },
        farMedmor: {
            pstAvTotal: pstFarMedmor,
            pstBrukt: farsForbrukAvEgenKvote,
        },
    };
};

export const getTittelVarighet = (
    intl: IntlShape,
    dager: number,
    dagerForLite: number,
    dagerForMye: number
): string => {
    if (dagerForLite > 0) {
        return getMessage(intl, 'fordeling.status.person.forLite', {
            dager: getVarighetString(dagerForLite, intl, 'full'),
        });
    }
    if (dagerForMye) {
        return getMessage(intl, 'fordeling.status.person.forMye', {
            dager: getVarighetString(dagerForMye, intl, 'full'),
        });
    }
    return getVarighetString(Math.abs(dager | 0), intl, 'full');
};
