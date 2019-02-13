import { starterInnenfor12UkerFørTerminRegel } from './tester/starterInnenfor12UkerFørTermin';
import { erInnenforSisteMuligeUttaksdagRegel } from './tester/erInnenforSisteMuligeUttaksdag';
import { Regel } from './types';

const uttaksplanRegler: Regel[] = [starterInnenfor12UkerFørTerminRegel, erInnenforSisteMuligeUttaksdagRegel];

export default uttaksplanRegler;
