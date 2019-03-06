import {
    Forelder,
    Periode,
    Forbruk,
    Periodetype,
    TilgjengeligeDager,
    UttakFørTerminPeriode,
    isUttakFørTermin,
    MorsForbruk,
    ForelderForbruk
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

export const getMorsForbruk = (allePerioder: Periode[], tilgjengeligeDager: TilgjengeligeDager): MorsForbruk => {
    const morsPerioder = allePerioder.filter(morsPerioderFilter);
    const periodeFørTermin = morsPerioder.find(isUttakFørTermin);
    const perioderEtterTermin = morsPerioder.filter((p) => p.type !== Periodetype.UttakFørTermin);
    const dagerFørTermin = getAlleDagerFørTermin(periodeFørTermin);
    const ekstradagerFørTermin = Math.max(0, dagerFørTermin - tilgjengeligeDager.dagerForeldrepengerFørFødsel);
    const dagerEtterTermin = Periodene(perioderEtterTermin).getBrukteUttaksdager();
    const dagerTotalt = Periodene(morsPerioder).getBrukteUttaksdager();
    return {
        dagerEtterTermin,
        dagerForeldrepengerFørFødsel: dagerFørTermin - ekstradagerFørTermin,
        ekstradagerFørTermin,
        dagerTotalt
    };
};
export const getFarsForbruk = (perioder: Periode[]): ForelderForbruk => {
    const dagerTotalt = Periodene(perioder.filter(farsPerioderFilter)).getBrukteUttaksdager();
    return {
        dagerTotalt
    };
};

export const getForbruk = (perioder: Periode[], tilgjengeligeDager: TilgjengeligeDager): Forbruk => {
    const forbrukMor = getMorsForbruk(perioder, tilgjengeligeDager);
    const forbrukFarMedmor = getFarsForbruk(perioder);
    const skalHaForeldrepengerFørFødsel = forbrukMor.dagerForeldrepengerFørFødsel > 0;
    const dagerForeldrepengerFørFødsel = forbrukMor.dagerForeldrepengerFørFødsel - forbrukMor.ekstradagerFørTermin;
    const ekstradagerFørTermin = forbrukMor.ekstradagerFørTermin;
    const dagerEtterTermin = forbrukFarMedmor.dagerTotalt + forbrukMor.dagerEtterTermin;
    const dagerGjenstående = tilgjengeligeDager.dagerEtterTermin - dagerEtterTermin - ekstradagerFørTermin;

    return {
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
