import { Regel } from './types';
import { starterInnenfor12UkerFørTerminRegel } from './tester/starterInnenfor12UkerFørTermin';
import { erInnenforSisteMuligeUttaksdagRegel } from './tester/erInnenforSisteMuligeUttaksdag';
import { uttakForFarEllerMedmorFørsteSeksUkerInfoRegel } from './info/uttakForFarEllerMedmorFørsteSeksUkerInfo';
import { farMedmorsUttakErInnenforMaksAntallDagerRegel } from './tester/farMedmorsUttakErInnenforMaksAntallDager';
import { morsUttakErInnenforMaksAntallDagerRegel } from './tester/morsUttakErInnenforMaksAntallDager';
import { alleUttakErInnenforMaksAntallDagerRegel } from './tester/alleUttakErInnenforMaksAntallDager';
import { ferieMedUttaksdagerInfoRegel } from './info/ferieMedUttaksdagerInfo';
import { farMedmorBrukerFellesperiodeInfoRegel } from './info/farMedmorBrukerFellesperiodeInfo';
import { morUtsetterPgaArbeidInfoRegel } from './info/morUtsetterPgaArbeidInfo';
import { farMedmorUtsetterPgaArbeidInfoRegel } from './info/farMedmorUtsetterPgaArbeidInfo';
import { forMangeFeriedagerMor, forMangeFeriedagerFarMedmor } from './tester/forMangeFeriedager';
import { bareFarHarRettEttBarnAktivitetskravMorInfoRegel } from './info/bareFarHarRettEttBarnAktivitetskravMorInfo';
import { bareFarHarRettFlerbarnsukerAktivitetskravMorInfoRegel } from './info/bareFarHarRettFlerbarnsukerAktivitetskravMorInfo';
import {
    morUsetterFørsteSeksUkerRegel,
    farMedmormorUsetterFørsteSeksUkerRegel
} from './tester/utsettelseFørsteSeksUker';

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
    forMangeFeriedagerFarMedmor,
    bareFarHarRettEttBarnAktivitetskravMorInfoRegel,
    bareFarHarRettFlerbarnsukerAktivitetskravMorInfoRegel
];

export default uttaksplanRegler;
