import { Regelgrunnlag, RegelTestresultat, UttaksplanRegelTestresultat, Regelbrudd } from './types';
import uttaksplanRegler from '.';

export const sjekkUttaksplanOppMotRegler = (regelgrunnlag: Regelgrunnlag): RegelTestresultat[] => {
    return uttaksplanRegler.map((regel) => regel.test(regel.key, regelgrunnlag));
};

export const getRegelbruddForPeriode = (
    resultat: UttaksplanRegelTestresultat,
    periodeId: string
): Regelbrudd[] | undefined => {
    if (resultat && resultat.resultatPerPeriode[periodeId]) {
        return resultat.resultatPerPeriode[periodeId]
            .filter((r) => r.passerer === false && r.regelbrudd !== undefined)
            .map((r) => r.regelbrudd!);
    }
    return undefined;
};

export const getRegelbrudd = (resultat: RegelTestresultat[]): Regelbrudd[] => {
    if (resultat) {
        return resultat.filter((r) => r.passerer === false && r.regelbrudd !== undefined).map((r) => r.regelbrudd!);
    }
    return [];
};
