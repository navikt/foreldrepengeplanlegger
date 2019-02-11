import { Forelder, Periode, Periodetype, ForbrukPerPeriodetype, ForelderForbruk, Forbruk } from '../types';
import groupby from 'lodash.groupby';
import { Periodene } from './Periodene';

export const getForbrukIPerioder = (perioder: Periode[]): ForelderForbruk => {
    const perioderGruppertPåType = groupby(perioder, (periode) => periode.type);
    const forbrukPerPeriodetype: ForbrukPerPeriodetype[] = [];
    Object.keys(perioderGruppertPåType).forEach((key) => {
        const periodetype = key as Periodetype;
        const uttaksdagerIPeriodene = Periodene(perioderGruppertPåType[key]).getBrukteUttaksdager();
        const fridagerIPeriodene = Periodene(perioderGruppertPåType[key]).getAntallFeriedager();
        forbrukPerPeriodetype.push({
            periodetype,
            uttaksdagerIPeriodene,
            fridagerIPeriodene
        });
    });
    return {
        forbrukPerPeriodetype,
        brukteUttaksdager: Periodene(perioder).getBrukteUttaksdager()
    };
};

export const getForbruk = (perioder: Periode[], dagerTotalt: number): Forbruk => {
    const forbrukFarMedmor = getForbrukIPerioder(perioder.filter((p) => p.forelder === Forelder.farMedmor));
    const forbrukMor = getForbrukIPerioder(perioder.filter((p) => p.forelder === Forelder.mor));

    const dagerGjenstaende =
        dagerTotalt - forbrukFarMedmor.brukteUttaksdager - (forbrukMor ? forbrukMor.brukteUttaksdager : 0);

    const dagerForMye = dagerGjenstaende < 0 ? dagerGjenstaende * -1 : 0;
    const pst = 100 / (dagerTotalt + dagerForMye);

    return {
        farMedmor: forbrukFarMedmor,
        mor: forbrukMor,
        fordeling: {
            dagerTotalt,
            dagerGjenstaende,
            overforbruk: dagerForMye
                ? {
                      uttaksdager: dagerForMye,
                      pst: pst * dagerForMye
                  }
                : undefined,
            farMedmor: forbrukFarMedmor
                ? {
                      uttaksdager: forbrukFarMedmor.brukteUttaksdager,
                      pst: pst * forbrukFarMedmor.brukteUttaksdager
                  }
                : undefined,
            mor: {
                uttaksdager: forbrukMor.brukteUttaksdager,
                pst: pst * forbrukMor.brukteUttaksdager
            }
        }
    };
};
