import { Regelgrunnlag, RegelTestresultat } from './types';
import uttaksplanRegler from '.';

export const sjekkUttaksplanOppMotRegler = (regelgrunnlag: Regelgrunnlag): RegelTestresultat[] => {
    return uttaksplanRegler.map((regel) => regel.test(regel.key, regelgrunnlag));
};
