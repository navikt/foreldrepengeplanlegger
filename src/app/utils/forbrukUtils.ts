import { Forelder, Periode, Periodetype, ForbrukPerPeriodetype, ForelderForbruk, Forbruk } from '../types';
import groupby from 'lodash.groupby';
import { Periodene } from './Periodene';

export const getForbrukIPerioder = (perioder: Periode[]): ForelderForbruk => {
    const perioderGruppertPåType = groupby(perioder, (periode) => periode.type);
    const forbrukPerPeriodetype: ForbrukPerPeriodetype[] = [];
    Object.keys(perioderGruppertPåType).forEach((key) => {
        const periodetype = key as Periodetype;
        forbrukPerPeriodetype.push({
            periodetype,
            uttaksdagerIPeriodene: Periodene(perioderGruppertPåType[key]).getAntallUttaksdager(),
            helligdagerIPeriodene: Periodene(perioderGruppertPåType[key]).getAntallFeriedager()
        });
    });
    return {
        forbrukPerPeriodetype,
        brukteUttaksdager: Periodene(perioder).getAntallUttaksdager()
    };
};

export const getForbruk = (perioder: Periode[]): Forbruk => {
    return {
        forelder1: getForbrukIPerioder(perioder.filter((p) => p.forelder === Forelder.forelder1)),
        forelder2: getForbrukIPerioder(perioder.filter((p) => p.forelder === Forelder.forelder2))
    };
};
