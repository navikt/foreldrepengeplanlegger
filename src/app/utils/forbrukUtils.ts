import { Forelder, Periode, Periodetype, ForbrukPerPeriodetype, ForelderForbruk, Forbruk } from '../types';
import groupby from 'lodash.groupby';
import { Periodene } from './Periodene';

export const getForbrukIPerioder = (perioder: Periode[]): ForelderForbruk => {
    const perioderGruppertPåType = groupby(perioder, (periode) => periode.type);
    const forbrukPerPeriodetype: ForbrukPerPeriodetype[] = [];
    // const brukteUttaksdager = 0;
    Object.keys(perioderGruppertPåType).forEach((key) => {
        const periodetype = key as Periodetype;
        const uttaksdagerIPeriodene = Periodene(perioderGruppertPåType[key]).getBrukteUttaksdager();
        const helligdagerIPeriodene = Periodene(perioderGruppertPåType[key]).getAntallFeriedager();
        forbrukPerPeriodetype.push({
            periodetype,
            uttaksdagerIPeriodene,
            helligdagerIPeriodene
        });
    });
    return {
        forbrukPerPeriodetype,
        brukteUttaksdager: Periodene(perioder).getBrukteUttaksdager()
    };
};

export const getForbruk = (perioder: Periode[], dagerTotalt: number): Forbruk => {
    const forbrukForelder1 = getForbrukIPerioder(perioder.filter((p) => p.forelder === Forelder.forelder1));
    const forbrukForelder2 = getForbrukIPerioder(perioder.filter((p) => p.forelder === Forelder.forelder2));

    const pst = 100 / dagerTotalt;
    const dagerGjenstaende =
        dagerTotalt - forbrukForelder1.brukteUttaksdager - (forbrukForelder2 ? forbrukForelder2.brukteUttaksdager : 0);

    return {
        forelder1: forbrukForelder1,
        forelder2: forbrukForelder2,
        fordeling: {
            dagerTotalt,
            dagerGjenstaende,
            forelder1: {
                uttaksdager: forbrukForelder1.brukteUttaksdager,
                pst: pst * forbrukForelder1.brukteUttaksdager
            },
            forelder2: forbrukForelder2
                ? {
                      uttaksdager: forbrukForelder2.brukteUttaksdager,
                      pst: pst * forbrukForelder2.brukteUttaksdager
                  }
                : undefined
        }
    };
};
