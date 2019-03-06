import {
    Forelder,
    Periode,
    ForelderForbruk,
    Forbruk,
    Periodetype,
    TilgjengeligeDager,
    UttakFørTerminPeriode,
    isUttakFørTermin
} from '../types';
import { Periodene } from './Periodene';
import { Perioden } from './Perioden';

const getAlleDagerFørTermin = (periode: UttakFørTerminPeriode | undefined): number => {
    if (periode && periode.skalIkkeHaUttakFørTermin === false) {
        return Perioden(periode).getAntallUttaksdager();
    }
    return 0;
};

export const getForelderForbruk = (
    forelder: Forelder,
    allePerioder: Periode[],
    tilgjengeligeDager: TilgjengeligeDager
): ForelderForbruk => {
    const perioder = allePerioder.filter((p) => p.forelder === forelder);
    const periodeFørTermin = perioder.find(isUttakFørTermin);
    const perioderEtterTermin = perioder.filter((p) => p.type !== Periodetype.UttakFørTermin);
    const dagerFørTermin = getAlleDagerFørTermin(periodeFørTermin);
    const ekstradagerFørTermin = Math.max(0, dagerFørTermin - tilgjengeligeDager.dagerForeldrepengerFørFødsel);
    const dagerEtterTermin = Periodene(perioderEtterTermin).getBrukteUttaksdager();
    return {
        dagerTotalt: ekstradagerFørTermin + dagerEtterTermin,
        dagerForeldrepengerFørFødsel: dagerFørTermin - ekstradagerFørTermin,
        ekstradagerFørTermin,
        dagerEtterTermin
    };
};

export const getForbruk = (perioder: Periode[], tilgjengeligeDager: TilgjengeligeDager): Forbruk => {
    const forbrukMor = getForelderForbruk(Forelder.mor, perioder, tilgjengeligeDager);
    const forbrukFarMedmor = getForelderForbruk(Forelder.farMedmor, perioder, tilgjengeligeDager);
    const skalHaForeldrepengerFørFødsel = forbrukMor.dagerForeldrepengerFørFødsel > 0;
    const dagerForeldrepengerFørFødsel = forbrukMor.dagerForeldrepengerFørFødsel - forbrukMor.ekstradagerFørTermin;
    const ekstradagerFørTermin = forbrukMor.ekstradagerFørTermin;
    const dagerEtterTermin = forbrukFarMedmor.dagerEtterTermin + forbrukMor.dagerEtterTermin;
    const dagerGjenstående =
        dagerEtterTermin - forbrukFarMedmor.dagerEtterTermin - forbrukMor.dagerEtterTermin - ekstradagerFørTermin;

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
