import { Periode, Periodetype, UttakFørTerminPeriode, isUttakFørTermin, Utsettelsesårsak } from '../types';
import { Periodene } from './Periodene';
import { Perioden } from './Perioden';
import Features from '../features';
import { isValidTidsperiode } from './Tidsperioden';
import { Forelder } from 'common/types';
import { TilgjengeligeDager, OmForeldre, MorsForbruk, ForelderForbruk, Forbruk } from 'shared/types';

const getAlleDagerFørTermin = (periode: UttakFørTerminPeriode | undefined): number => {
    if (periode && periode.skalIkkeHaUttakFørTermin !== true) {
        return Perioden(periode).getAntallUttaksdager();
    }
    return 0;
};

const morsPerioderFilter = (p: Periode) => p.forelder === Forelder.mor;
const farsPerioderFilter = (p: Periode) => p.forelder === Forelder.farMedmor;
const ulønnetPermisjonMedUttakÅrsak = (p: Periode) =>
    p.type === Periodetype.UlønnetPermisjon && p.utsettelsesårsak === Utsettelsesårsak.uttakForeldrepenger;

const getAntallFeriedager = (perioder: Periode[], forelder: Forelder): number => {
    const perioderMedFerie = Periodene(perioder).getPerioderMedFerieForForelder(forelder);
    return perioderMedFerie
        .filter((p) => isValidTidsperiode(p.tidsperiode))
        .map((p) => (p.uttaksinfo !== undefined ? p.uttaksinfo.antallUttaksdager - p.uttaksinfo.antallFridager : 0))
        .reduce((d, nyeDager) => nyeDager + d, 0);
};

export const getMorsForbruk = (
    allePerioder: Periode[],
    tilgjengeligeDager: TilgjengeligeDager,
    omForeldre: OmForeldre
): MorsForbruk => {
    if (omForeldre.bareFar) {
        return {
            dagerEtterTermin: 0,
            dagerForeldrepengerFørFødsel: 0,
            ekstradagerFørTermin: 0,
            dagerTotalt: 0,
            dagerUtenForeldrepengerFørFødsel: 0,
            dagerForLite: 0,
            dagerForMye: 0,
            dagerErOk: true,
            dagerAvFellesperiode: 0,
            dagerMedFerie: 0
        };
    }
    const morsPerioder = allePerioder.filter(morsPerioderFilter);
    const periodeFørTermin = morsPerioder.find(isUttakFørTermin);
    const perioderEtterTermin = morsPerioder.filter((p) => p.type !== Periodetype.UttakFørTermin);
    const dagerFørTermin = getAlleDagerFørTermin(periodeFørTermin);
    const ekstradagerFørTermin = Math.max(0, dagerFørTermin - tilgjengeligeDager.dagerForeldrepengerFørFødsel);
    const dagerVedUlønnetPermisjonAnnenForelder = Periodene(
        allePerioder.filter(ulønnetPermisjonMedUttakÅrsak).filter(farsPerioderFilter)
    ).getUttaksdager();
    const dagerEtterTermin =
        Periodene(perioderEtterTermin).getBrukteUttaksdager() + dagerVedUlønnetPermisjonAnnenForelder;
    const dagerTotalt = Periodene(morsPerioder).getBrukteUttaksdager() + dagerVedUlønnetPermisjonAnnenForelder;
    const dagerUtenForeldrepengerFørFødsel = dagerEtterTermin + ekstradagerFørTermin;

    const dagerForLite = Math.max(0, tilgjengeligeDager.dagerMor - dagerUtenForeldrepengerFørFødsel);
    const dagerForMye = Math.max(0, dagerUtenForeldrepengerFørFødsel - tilgjengeligeDager.maksDagerMor);
    const dagerErOk = dagerForLite === 0 && dagerForMye === 0;

    const dagerAvFellesperiode = Math.max(0, dagerUtenForeldrepengerFørFødsel - tilgjengeligeDager.dagerMor);
    const dagerMedFerie = getAntallFeriedager(allePerioder, Forelder.mor);

    return {
        dagerEtterTermin,
        dagerForeldrepengerFørFødsel: dagerFørTermin - ekstradagerFørTermin,
        ekstradagerFørTermin,
        dagerTotalt,
        dagerUtenForeldrepengerFørFødsel,
        dagerForLite,
        dagerForMye,
        dagerErOk,
        dagerAvFellesperiode,
        dagerMedFerie
    };
};
export const getFarsForbruk = (
    perioder: Periode[],
    tilgjengeligeDager: TilgjengeligeDager,
    omForeldre: OmForeldre
): ForelderForbruk => {
    if (omForeldre.bareMor) {
        return {
            dagerTotalt: 0,
            dagerForLite: 0,
            dagerForMye: 0,
            dagerErOk: true,
            dagerAvFellesperiode: 0,
            dagerMedFerie: 0
        };
    }
    if (omForeldre.bareFar) {
        return getForelderForbrukAleneomsorg(perioder, tilgjengeligeDager);
    }

    const dagerTotalt =
        Periodene(perioder.filter(farsPerioderFilter)).getBrukteUttaksdager() +
        Periodene(perioder.filter(ulønnetPermisjonMedUttakÅrsak).filter(morsPerioderFilter)).getUttaksdager();

    const dagerForLite = Math.max(0, tilgjengeligeDager.dagerFar - dagerTotalt);
    const dagerForMye = Math.max(0, dagerTotalt - tilgjengeligeDager.maksDagerFar);
    const dagerErOk = dagerForLite === 0 && dagerForMye === 0;
    const dagerAvFellesperiode = Math.max(0, dagerTotalt - tilgjengeligeDager.dagerFar);
    const dagerMedFerie = getAntallFeriedager(perioder, Forelder.farMedmor);
    return {
        dagerTotalt,
        dagerForLite,
        dagerForMye,
        dagerErOk,
        dagerAvFellesperiode,
        dagerMedFerie
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
    const dagerMedFerie = getAntallFeriedager(perioder, Forelder.farMedmor);
    return {
        dagerTotalt,
        dagerForLite,
        dagerForMye,
        dagerErOk,
        dagerAvFellesperiode,
        dagerMedFerie
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
        if (Features.avrundGraderingPerPeriode) {
            return Math.ceil(dager * (100 / gradering));
        }
        return dager * (100 / gradering);
    }
    return dager;
};
