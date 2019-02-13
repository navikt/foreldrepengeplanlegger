import { starterInnenfor12UkerFørTerminRegel } from './tester/starterInnenfor12UkerFørTermin';
import { erInnenforSisteMuligeUttaksdagRegel } from './tester/erInnenforSisteMuligeUttaksdag';
import { Regel } from './types';
import { uttakForFarEllerMedmorFørsteSeksUkerInfoRegel } from './tester/uttakForFarEllerMedmorF\u00F8rsteSeksUkerInfo';

const uttaksplanRegler: Regel[] = [
    starterInnenfor12UkerFørTerminRegel,
    erInnenforSisteMuligeUttaksdagRegel,
    uttakForFarEllerMedmorFørsteSeksUkerInfoRegel
];

export default uttaksplanRegler;
