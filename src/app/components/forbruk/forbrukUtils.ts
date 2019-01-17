import { Forelder, Periode, Periodetype } from '../../types';
import { ForbrukPeriode, ForelderForbruk } from './Forbruk';
import groupby from 'lodash.groupby';
import { Tidsperioden } from '../../utils/Tidsperioden';

export const getUttaksdagerIPerioder = (perioder: Periode[]): number => {
    return perioder.reduce((dager, periode) => dager + Tidsperioden(periode.tidsperiode).getAntallUttaksdager(), 0);
};

export const getPeriodeforbrukForForelder = (forelder: Forelder, perioder: Periode[]): ForbrukPeriode[] => {
    const fPerioder = perioder.filter((p) => p.forelder === forelder);
    const perioderGruppertPåType = groupby(fPerioder, (periode) => periode.type);

    const brukteDager: ForbrukPeriode[] = [];
    Object.keys(perioderGruppertPåType).forEach((key) => {
        brukteDager.push({
            periodetype: key as Periodetype,
            dager: getUttaksdagerIPerioder(perioderGruppertPåType[key])
        });
    });
    return brukteDager;
};

export const getForbruk = (perioder: Periode[]): ForelderForbruk[] => {
    const fPerioder = groupby(perioder, (p) => p.forelder);
    const data: ForelderForbruk[] = [];
    Object.keys(fPerioder).forEach((key) => {
        data.push({
            forelder: key as Forelder,
            periodeForbruk: getPeriodeforbrukForForelder(key as Forelder, fPerioder[key])
        });
    });
    return data;
};
