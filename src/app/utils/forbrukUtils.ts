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

export const getMorsForbruk = (allePerioder: Periode[], tilgjengeligeDager: TilgjengeligeDager): MorsForbruk => {
    const perioder = allePerioder.filter((p) => p.forelder === Forelder.mor);
    const periodeFørTermin = perioder.find(isUttakFørTermin);
    const perioderEtterTermin = perioder.filter((p) => p.type !== Periodetype.UttakFørTermin);
    const dagerFørTermin = getAlleDagerFørTermin(periodeFørTermin);
    const ekstradagerFørTermin = Math.max(0, dagerFørTermin - tilgjengeligeDager.dagerForeldrepengerFørFødsel);
    const dagerEtterTermin = Periodene(perioderEtterTermin).getBrukteUttaksdager();
    return {
        dagerForeldrepengerFørFødsel: dagerFørTermin - ekstradagerFørTermin,
        ekstradagerFørTermin,
        dagerEtterTermin
    };
};
export const getFarsForbruk = (allePerioder: Periode[]): ForelderForbruk => {
    const perioder = allePerioder.filter((p) => p.forelder === Forelder.farMedmor);
    const perioderEtterTermin = perioder.filter((p) => p.type !== Periodetype.UttakFørTermin);
    const dagerEtterTermin = Periodene(perioderEtterTermin).getBrukteUttaksdager();
    return {
        dagerEtterTermin
    };
};

export const getForbruk = (perioder: Periode[], tilgjengeligeDager: TilgjengeligeDager): Forbruk => {
    const forbrukMor = getMorsForbruk(perioder, tilgjengeligeDager);
    const forbrukFarMedmor = getFarsForbruk(perioder);
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
