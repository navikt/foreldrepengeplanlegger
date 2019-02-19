import { Regel } from './types';
import { starterInnenfor12UkerFørTerminRegel } from './tester/starterInnenfor12UkerFørTermin';
import { erInnenforSisteMuligeUttaksdagRegel } from './tester/erInnenforSisteMuligeUttaksdag';
import { uttakForFarEllerMedmorFørsteSeksUkerInfoRegel } from './tester/uttakForFarEllerMedmorF\u00F8rsteSeksUkerInfo';
import { farMedmorsUttakErInnenforMaksAntallDagerRegel } from './tester/farMedmorsUttakErInnenforMaksAntallDager';
import { morsUttakErInnenforMaksAntallDagerRegel } from './tester/morsUttakErInnenforMaksAntallDager';
import { alleUttakErInnenforMaksAntallDagerRegel } from './tester/alleUttakErInnenforMaksAntallDager';
import { ferieMedUttaksdagerInfoRegel } from './tester/ferieMedUttaksdagerInfo';
import { førstePeriodeErUttakAvForeldrepengerRegel } from './tester/førstePeriodeErUttakAvForeldrepenger';

const uttaksplanRegler: Regel[] = [
    uttakForFarEllerMedmorFørsteSeksUkerInfoRegel,
    ferieMedUttaksdagerInfoRegel,
    starterInnenfor12UkerFørTerminRegel,
    erInnenforSisteMuligeUttaksdagRegel,
    farMedmorsUttakErInnenforMaksAntallDagerRegel,
    morsUttakErInnenforMaksAntallDagerRegel,
    alleUttakErInnenforMaksAntallDagerRegel,
    førstePeriodeErUttakAvForeldrepengerRegel
];

export default uttaksplanRegler;
