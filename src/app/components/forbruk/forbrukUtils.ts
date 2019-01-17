import { Forelder, Periode, Periodetype } from '../../types';
import { ForbrukPeriode, ForelderForbruk } from './Forbruk';
import groupby from 'lodash.groupby';
import { Tidsperioden } from '../../utils/Tidsperioden';

export const summerForbrukIPerioder = (perioder: Periode[]): number => {
    return perioder.reduce((dager, periode) => {
        if (periode.uttaksinfo) {
            return dager + periode.uttaksinfo.uttaksdagerBrukt;
        }
        return dager;
    }, 0);
};

export const getUttaksdagerIPerioder = (perioder: Periode[]): number => {
    return perioder.reduce((dager, periode) => {
        return dager + Tidsperioden(periode.tidsperiode).getAntallUttaksdager();
    }, 0);
};

export const getHelligdagerIPerioder = (perioder: Periode[]): number => {
    return perioder.reduce((dager, periode) => {
        return dager + Tidsperioden(periode.tidsperiode).getAntallHelligdager();
    }, 0);
};

export const getEnForeldersForbruk = (forelder: Forelder, perioder: Periode[]): ForbrukPeriode[] => {
    const fPerioder = perioder.filter((p) => p.forelder === forelder);
    const perioderGruppertPåType = groupby(fPerioder, (periode) => periode.type);

    const brukteDager: ForbrukPeriode[] = [];
    Object.keys(perioderGruppertPåType).forEach((key) => {
        const periodetype = key as Periodetype;
        brukteDager.push({
            periodetype,
            uttaksdagerIPeriodene: getUttaksdagerIPerioder(perioderGruppertPåType[key]),
            helligdagerIPeriodene: getHelligdagerIPerioder(perioderGruppertPåType[key])
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
            periodeForbruk: getEnForeldersForbruk(key as Forelder, fPerioder[key]),
            brukteUttaksdager: summerForbrukIPerioder(fPerioder[key])
        });
    });
    return data;
};
