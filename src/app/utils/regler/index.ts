import { Regel } from './types';
import { starterInnenfor12UkerFørTerminRegel } from './tester/starterInnenfor12UkerFørTermin';
import { erInnenforSisteMuligeUttaksdagRegel } from './tester/erInnenforSisteMuligeUttaksdag';
import { uttakForFarEllerMedmorFørsteSeksUkerInfoRegel } from './tester/uttakForFarEllerMedmorF\u00F8rsteSeksUkerInfo';
import { farMedmorsUttakErInnenforMaksAntallDagerRegel } from './tester/farMedmorsUttakErInnenforMaksAntallDager';
import { morsUttakErInnenforMaksAntallDagerRegel } from './tester/morsUttakErInnenforMaksAntallDager';
import { alleUttakErInnenforMaksAntallDagerRegel } from './tester/alleUttakErInnenforMaksAntallDager';
import { ferieMedUttaksdagerInfoRegel } from './tester/ferieMedUttaksdagerInfo';
import { farMedmorBrukerFellesperiodeInfoRegel } from './tester/farMedmorBrukerFellesperiodeInfo';
import { morUtsetterPgaArbeidInfoRegel } from './tester/morUtsetterPgaArbeidInfo';
import { farMedmorUtsetterPgaArbeidInfoRegel } from './tester/farMedmorUtsetterPgaArbeidInfo';
import {
    morUsetterFørsteSeksUkerRegel,
    farMedmormorUsetterFørsteSeksUkerRegel
} from './tester/utsettelseFørsteSeksUker';
import { forMangeFeriedagerMor, forMangeFeriedagerFarMedmor } from './tester/forMangeFeriedager';

const uttaksplanRegler: Regel[] = [
    uttakForFarEllerMedmorFørsteSeksUkerInfoRegel,
    ferieMedUttaksdagerInfoRegel,
    starterInnenfor12UkerFørTerminRegel,
    erInnenforSisteMuligeUttaksdagRegel,
    farMedmorsUttakErInnenforMaksAntallDagerRegel,
    morsUttakErInnenforMaksAntallDagerRegel,
    alleUttakErInnenforMaksAntallDagerRegel,
    farMedmorBrukerFellesperiodeInfoRegel,
    morUtsetterPgaArbeidInfoRegel,
    farMedmorUtsetterPgaArbeidInfoRegel,
    morUsetterFørsteSeksUkerRegel,
    farMedmormorUsetterFørsteSeksUkerRegel,
    forMangeFeriedagerMor,
    forMangeFeriedagerFarMedmor
];

export default uttaksplanRegler;
