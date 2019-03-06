import { Forelder, Periode, ForelderForbruk, Forbruk, Periodetype } from '../types';
import { Periodene } from './Periodene';
import { Perioden } from './Perioden';

export const getForelderForbruk = (perioder: Periode[]): ForelderForbruk => {
    const periodeFørTermin = perioder.find((p) => p.type === Periodetype.UttakFørTermin);
    const perioderEtterTermin = perioder.filter((p) => p.type !== Periodetype.UttakFørTermin);
    return {
        dagerFørTermin: periodeFørTermin ? Perioden(periodeFørTermin).getAntallUttaksdager() : 0,
        dagerEtterTermin: Periodene(perioderEtterTermin).getBrukteUttaksdager()
    };
};

export const getForbruk = (perioder: Periode[], dagerTotalt: number): Forbruk => {
    const forbrukMor = getForelderForbruk(perioder.filter((p) => p.forelder === Forelder.mor));
    const forbrukFarMedmor = getForelderForbruk(perioder.filter((p) => p.forelder === Forelder.farMedmor));
    const dagerGjenstående = dagerTotalt - forbrukFarMedmor.dagerEtterTermin - forbrukMor.dagerEtterTermin;
    const dagerForMye = dagerGjenstående < 0 ? dagerGjenstående * -1 : 0;
    const dagPst = 100 / (dagerTotalt + dagerForMye);

    return {
        farMedmor: forbrukFarMedmor,
        mor: forbrukMor,
        fordeling: {
            dagerTotalt,
            dagerGjenstående,
            farMedmor: {
                uttaksdager: forbrukFarMedmor.dagerEtterTermin,
                pst: dagPst * forbrukFarMedmor.dagerEtterTermin
            },
            mor: {
                uttaksdager: forbrukMor.dagerEtterTermin,
                pst: dagPst * forbrukMor.dagerEtterTermin
            }
        }
    };
};

export const getDagerGradert = (dager: number, gradering?: number): number => {
    if (gradering && gradering > 0 && gradering < 100) {
        return Math.ceil(dager * (100 / gradering));
    }
    return dager;
};
