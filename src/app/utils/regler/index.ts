import { starterInnenfor12UkerFørTerminRegel } from './tester/starterInnenfor12UkerFørTermin';
import { erInnenforFørsteOgSisteMuligeUttaksdagRegel } from './tester/erInnenforFørsteOgSisteMuligeUttaksdag';
import { Regel } from './types';

const uttaksplanRegler: Regel[] = [starterInnenfor12UkerFørTerminRegel, erInnenforFørsteOgSisteMuligeUttaksdagRegel];

export default uttaksplanRegler;
