import { Regel } from './types';
import { starterInnenfor12UkerFørTerminRegel } from './tester/starterInnenfor12UkerFørTermin';
import { erInnenforSisteMuligeUttaksdagRegel } from './tester/erInnenforSisteMuligeUttaksdag';
import { uttakForFarEllerMedmorFørsteSeksUkerInfoRegel } from './tester/uttakForFarEllerMedmorF\u00F8rsteSeksUkerInfo';
import { farMedmorsUttakErInnenforMaksAntallDagerRegel } from './tester/farMedmorsUttakErInnenforMaksAntallDager';
import { morsUttakErInnenforMaksAntallDagerRegel } from './tester/morsUttakErInnenforMaksAntallDager';
import { alleUttakErInnenforMaksAntallDagerRegel } from './tester/alleUttakErInnenforMaksAntallDager';

const uttaksplanRegler: Regel[] = [
    starterInnenfor12UkerFørTerminRegel,
    erInnenforSisteMuligeUttaksdagRegel,
    uttakForFarEllerMedmorFørsteSeksUkerInfoRegel,
    farMedmorsUttakErInnenforMaksAntallDagerRegel,
    morsUttakErInnenforMaksAntallDagerRegel,
    alleUttakErInnenforMaksAntallDagerRegel
];

export default uttaksplanRegler;
