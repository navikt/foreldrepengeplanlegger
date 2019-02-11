import { Regel, Regelgrunnlag, RegelTestResultat } from '../../types';

import starterInnenfor12UkerFørTermin from './starterInnenfor12UkerFørTermin';

const uttaksplanRegler: Regel[] = [starterInnenfor12UkerFørTermin];

export const sjekkUttaksplanOppMotRegler = (regelgrunnlag: Regelgrunnlag): RegelTestResultat[] => {
    return uttaksplanRegler.map((regel) => regel.test(regelgrunnlag));
};

export default uttaksplanRegler;

export enum REGLER {
    'starterInnenfor12UkerFørTermin' = 'starterInnenfor12UkerFørTermin'
}
