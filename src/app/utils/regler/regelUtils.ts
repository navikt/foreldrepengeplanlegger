import { Regelgrunnlag, RegelTestresultat, UttaksplanRegelTestresultat, Regelbrudd } from './types';
import uttaksplanRegler from '.';

export const sjekkUttaksplanOppMotRegler = (regelgrunnlag: Regelgrunnlag): RegelTestresultat[] => {
    return uttaksplanRegler
        .filter((regel) => (regel.erRelevant ? regel.erRelevant(regelgrunnlag) : true))
        .map((regel) => regel.test(regel.key, regelgrunnlag, regel.forelderRegel));
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

export const trimRelaterteRegelbrudd = (brudd: Regelbrudd[]): Regelbrudd[] => {
    const regelbrudd: Regelbrudd[] = [];
    brudd.forEach((b) => {
        if (b.forelderRegel === undefined && brudd.some((b2) => b2.key === b.forelderRegel) === false) {
            regelbrudd.push(b);
        }
    });
    return regelbrudd;
};
