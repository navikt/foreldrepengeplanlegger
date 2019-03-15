import { Regelgrunnlag, RegelTestresultat, UttaksplanRegelTestresultat, Regelbrudd } from './types';
import uttaksplanRegler from '.';

export const sjekkUttaksplanOppMotRegler = (regelgrunnlag: Regelgrunnlag): RegelTestresultat[] => {
    return uttaksplanRegler
        .filter((regel) => (regel.erRelevant ? regel.erRelevant(regelgrunnlag) : true))
        .map((regel) => regel.test(regel, regelgrunnlag));
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

const eksluderteRegelbruddFilter = (brudd: Regelbrudd, idx: number, regelbrudd: Regelbrudd[]): boolean => {
    return (
        brudd.overstyresAvRegel === undefined && regelbrudd.some((b2) => b2.key === brudd.overstyresAvRegel) === false
    );
};

const overstyrteRegelbruddFilter = (brudd: Regelbrudd, idx: number, regelbrudd: Regelbrudd[]): boolean => {
    return true;
};

export const trimRelaterteRegelbrudd = (brudd: Regelbrudd[]): Regelbrudd[] => {
    return brudd.filter(eksluderteRegelbruddFilter).filter(overstyrteRegelbruddFilter);
};
