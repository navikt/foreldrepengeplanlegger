import {
    Forelder,
    Periode,
    Forbruk,
    Periodetype,
    TilgjengeligeDager,
    UttakFørTerminPeriode,
    isUttakFørTermin,
    MorsForbruk,
    ForelderForbruk,
    OmForeldre
} from '../types';
import { Periodene } from './Periodene';
import { Perioden } from './Perioden';

const getAlleDagerFørTermin = (periode: UttakFørTerminPeriode | undefined): number => {
    if (periode && periode.skalIkkeHaUttakFørTermin !== true) {
        return Perioden(periode).getAntallUttaksdager();
    }
    return 0;
};

const morsPerioderFilter = (p: Periode) => p.forelder === Forelder.mor;
const farsPerioderFilter = (p: Periode) => p.forelder === Forelder.farMedmor;

export const getMorsForbruk = (
    allePerioder: Periode[],
    tilgjengeligeDager: TilgjengeligeDager,
    omForeldre: OmForeldre
): MorsForbruk => {
    if (omForeldre.erAleneomsorgFarMedmor) {
        return {
            dagerEtterTermin: 0,
            dagerForeldrepengerFørFødsel: 0,
            ekstradagerFørTermin: 0,
            dagerTotalt: 0,
            dagerUtenForeldrepengerFørFødsel: 0,
            dagerForLite: 0,
            dagerForMye: 0,
            dagerErOk: true,
            dagerAvFellesperiode: 0
        };
    }
    const morsPerioder = allePerioder.filter(morsPerioderFilter);
    const periodeFørTermin = morsPerioder.find(isUttakFørTermin);
    const perioderEtterTermin = morsPerioder.filter((p) => p.type !== Periodetype.UttakFørTermin);
    const dagerFørTermin = getAlleDagerFørTermin(periodeFørTermin);
    const ekstradagerFørTermin = Math.max(0, dagerFørTermin - tilgjengeligeDager.dagerForeldrepengerFørFødsel);
    const dagerEtterTermin = Periodene(perioderEtterTermin).getBrukteUttaksdager();
    const dagerTotalt = Periodene(morsPerioder).getBrukteUttaksdager();
    const dagerUtenForeldrepengerFørFødsel = dagerEtterTermin + ekstradagerFørTermin;

    const dagerForLite = Math.max(0, tilgjengeligeDager.dagerMor - dagerUtenForeldrepengerFørFødsel);
    const dagerForMye = Math.max(0, dagerUtenForeldrepengerFørFødsel - tilgjengeligeDager.maksDagerMor);
    const dagerErOk = dagerForLite === 0 && dagerForMye === 0;

    const dagerAvFellesperiode = Math.max(0, dagerUtenForeldrepengerFørFødsel - tilgjengeligeDager.dagerMor);

    return {
        dagerEtterTermin,
        dagerForeldrepengerFørFødsel: dagerFørTermin - ekstradagerFørTermin,
        ekstradagerFørTermin,
        dagerTotalt,
        dagerUtenForeldrepengerFørFødsel,
        dagerForLite,
        dagerForMye,
        dagerErOk,
        dagerAvFellesperiode
    };
};
export const getFarsForbruk = (
    perioder: Periode[],
    tilgjengeligeDager: TilgjengeligeDager,
    omForeldre: OmForeldre
): ForelderForbruk => {
    if (omForeldre.erAleneomsorgMor) {
        return {
            dagerTotalt: 0,
            dagerForLite: 0,
            dagerForMye: 0,
            dagerErOk: true,
            dagerAvFellesperiode: 0
        };
    }
    if (omForeldre.erAleneomsorgFarMedmor) {
        return getForelderForbrukAleneomsorg(perioder, tilgjengeligeDager);
    }

    const dagerTotalt = Periodene(perioder.filter(farsPerioderFilter)).getBrukteUttaksdager();
    const dagerForLite = Math.max(0, tilgjengeligeDager.dagerFar - dagerTotalt);
    const dagerForMye = Math.max(0, dagerTotalt - tilgjengeligeDager.maksDagerFar);
    const dagerErOk = dagerForLite === 0 && dagerForMye === 0;
    const dagerAvFellesperiode = Math.max(0, dagerTotalt - tilgjengeligeDager.dagerFar);
    return {
        dagerTotalt,
        dagerForLite,
        dagerForMye,
        dagerErOk,
        dagerAvFellesperiode
    };
};

export const getForelderForbrukAleneomsorg = (
    perioder: Periode[],
    tilgjengeligeDager: TilgjengeligeDager
): ForelderForbruk => {
    const dagerTotalt = Periodene(perioder).getBrukteUttaksdager();
    const dagerFPTilgjengelig =
        tilgjengeligeDager.dagerForeldrepenger + tilgjengeligeDager.dagerForeldrepengerFørFødsel;

    const dagerForLite = Math.max(0, dagerFPTilgjengelig - dagerTotalt);
    const dagerForMye = Math.max(0, dagerTotalt - dagerFPTilgjengelig);
    const dagerErOk = dagerForLite === 0 && dagerForMye === 0;
    const dagerAvFellesperiode = Math.max(0, dagerTotalt - dagerFPTilgjengelig);
    return {
        dagerTotalt,
        dagerForLite,
        dagerForMye,
        dagerErOk,
        dagerAvFellesperiode
    };
};

export const getForbruk = (
    perioder: Periode[],
    tilgjengeligeDager: TilgjengeligeDager,
    omForeldre: OmForeldre
): Forbruk => {
    const forbrukMor = getMorsForbruk(perioder, tilgjengeligeDager, omForeldre);
    const forbrukFarMedmor = getFarsForbruk(perioder, tilgjengeligeDager, omForeldre);
    const skalHaForeldrepengerFørFødsel = forbrukMor.dagerForeldrepengerFørFødsel > 0;
    const dagerForeldrepengerFørFødsel = forbrukMor.dagerForeldrepengerFørFødsel - forbrukMor.ekstradagerFørTermin;
    const ekstradagerFørTermin = forbrukMor.ekstradagerFørTermin;

    const dagerEtterTermin = (forbrukFarMedmor ? forbrukFarMedmor.dagerTotalt : 0) + forbrukMor.dagerEtterTermin;
    const dagerGjenstående = tilgjengeligeDager.dagerEtterTermin - dagerEtterTermin - ekstradagerFørTermin;
    const dagerTotalt = dagerEtterTermin + dagerForeldrepengerFørFødsel + ekstradagerFørTermin;

    return {
        dagerTotalt,
        farMedmor: forbrukFarMedmor,
        mor: forbrukMor,
        skalHaForeldrepengerFørFødsel,
        ekstradagerFørTermin,
        dagerEtterTermin,
        dagerForeldrepengerFørFødsel,
        dagerGjenstående
    };
};

export const getDagerGradert = (dager: number, gradering?: number): number => {
    if (gradering && gradering > 0 && gradering < 100) {
        return Math.ceil(dager * (100 / gradering));
    }
    return dager;
};
