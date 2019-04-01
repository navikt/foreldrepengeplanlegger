import { Regel, RegelAlvorlighet } from './types';
import { harFarEllerMedmorUttakFørsteSeksUkerTest } from './info/harFarEllerMedmorUttakFørsteSeksUkerTest';
import { inneholderPlanenFerieMedUttaksdagerTest } from './info/inneholderPlanenFerieMedUttaksdagerTest';
import { starterUttakInnenfor12UkerFørTerminTest } from './tester/starterUttakInnenfor12UkerFørTerminTest';
import { erPlanenInnenforSisteMuligeUttaksdagTest } from './tester/erPlanenInnenforSisteMuligeUttaksdagTest';
import { erFarMedmorsUttakErInnenforMaksAntallDagerTest } from './tester/erFarMedmorsUttakErInnenforMaksAntallDagerTest';
import { erMorsUttakErInnenforMaksAntallDagerTest } from './tester/erMorsUttakErInnenforMaksAntallDagerTest';
import { erAlleUttakErInnenforMaksAntallDagerTest } from './tester/erAlleUttakErInnenforMaksAntallDagerTest';
import {
    harFarMedmorUtsettelseFørsteSeksUkerTest,
    harMorUtsettelseFørsteSeksUkerTest
} from './tester/inneholderUtsettelseF\u00F8rsteSeksUkerTest';
import { harMorUtsettelsePgaArbeidTest } from './info/harMorUtsettelsePgaArbeidTest';
import { brukerFarMedmorAvFellesperiodeTest } from './info/brukerFarMedmorAvFellesperiodeTest';
import { utsetterFarMedmorPgaArbeidTest } from './info/utsetterFarMedmorPgaArbeidTest';
import { harForeldreForMangeFeriedagerTest } from './tester/harForelderForMangeFeriedagerTest';
import { bareFarHarRettEttBarnAktivitetskravMorTest } from './info/bareFarHarRettEttBarnAktivitetskravMorTest';
import { bareFarHarRettFlerbarnsukerAktivitetskravMorTest } from './info/bareFarHarRettFlerbarnsukerAktivitetskravMorTest';
import { erAlleTilgjengeligeDagerBruktTest } from './info/erAlleTilgjengeligeDagerBruktTest';
import { avslutterPlanenMedUtsettelseTest } from './tester/avslutterPlanenMedUtsettelseTest';

export enum RegelKey {
    'alleUttakErInnenforMaksAntallDager' = 'alleUttakErInnenforMaksAntallDager',
    'uttakForFarEllerMedmorFørsteSeksUkerInfo' = 'uttakForFarEllerMedmorFørsteSeksUkerInfo',
    'ferieMedUttaksdagerInfo' = 'ferieMedUttaksdagerInfo',
    'erInnenforSisteMuligeUttaksdag' = 'erInnenforSisteMuligeUttaksdag',
    'starterInnenfor12UkerFørTermin' = 'starterInnenfor12UkerFørTermin',
    'morsUttakErInnenforMaksAntallDager' = 'morsUttakErInnenforMaksAntallDager',
    'morUtsetterPgaArbeidInfo' = 'morUtsetterPgaArbeidInfo',
    'farMedmorsUttakErInnenforMaksAntallDager' = 'farMedmorsUttakErInnenforMaksAntallDager',
    'farMedmorBrukerFellesperiodeInfo' = 'farMedmorBrukerFellesperiodeInfo',
    'farMedmorUtsetterPgaArbeidInfo' = 'farMedmorUtsetterPgaArbeidInfo',
    'morUtsetterFørsteSeksUker' = 'morUsetterFørsteSeksUker',
    'farMedmorUtsetterFørsteSeksUker' = 'farMedmorUtsetterFørsteSeksUker',
    'harForeldreForMangeFeriedager' = 'morHarForMangeFeriedager',
    'farMedmorHarForMangeFeriedager' = 'farMedmorHarForMangeFeriedager',
    'bareFarHarRettEttBarnAktivitetskravMorInfo' = 'bareFarHarRettEttBarnAktivitetskravMorInfo',
    'bareFarHarRettFlerbarnsukerAktivitetskravMorInfo' = 'bareFarHarRettFlerbarnsukerAktivitetskravMorInfo',
    'erAlleTilgjengeligeDagerBrukt' = 'erAlleTilgjengeligeDagerBrukt',
    'erUlønnetPermisjon' = 'erUlønnetPermisjon',
    'avlutterUttaksplanMedUtsettelse' = 'avlutterUttaksplanMedUtsettelse'
}

const uttaksplanRegler: Regel[] = [
    {
        key: RegelKey.ferieMedUttaksdagerInfo,
        alvorlighet: RegelAlvorlighet.INFO,
        test: inneholderPlanenFerieMedUttaksdagerTest
    },
    {
        key: RegelKey.starterInnenfor12UkerFørTermin,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: starterUttakInnenfor12UkerFørTerminTest
    },
    {
        key: RegelKey.erInnenforSisteMuligeUttaksdag,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: erPlanenInnenforSisteMuligeUttaksdagTest
    },
    {
        key: RegelKey.farMedmorsUttakErInnenforMaksAntallDager,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: erFarMedmorsUttakErInnenforMaksAntallDagerTest,
        overstyresAvRegel: RegelKey.alleUttakErInnenforMaksAntallDager,
        kategori: 'fordeling'
    },
    {
        key: RegelKey.morsUttakErInnenforMaksAntallDager,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: erMorsUttakErInnenforMaksAntallDagerTest,
        overstyresAvRegel: RegelKey.alleUttakErInnenforMaksAntallDager,
        kategori: 'fordeling'
    },
    {
        key: RegelKey.alleUttakErInnenforMaksAntallDager,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: erAlleUttakErInnenforMaksAntallDagerTest,
        kategori: 'fordeling'
    },
    {
        key: RegelKey.harForeldreForMangeFeriedager,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: harForeldreForMangeFeriedagerTest
    },
    {
        key: RegelKey.morUtsetterFørsteSeksUker,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: harMorUtsettelseFørsteSeksUkerTest
    },
    {
        key: RegelKey.farMedmorUtsetterFørsteSeksUker,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: harFarMedmorUtsettelseFørsteSeksUkerTest
    },
    {
        key: RegelKey.uttakForFarEllerMedmorFørsteSeksUkerInfo,
        alvorlighet: RegelAlvorlighet.ADVARSEL,
        test: harFarEllerMedmorUttakFørsteSeksUkerTest
    },
    {
        key: RegelKey.morUtsetterPgaArbeidInfo,
        alvorlighet: RegelAlvorlighet.INFO,
        test: harMorUtsettelsePgaArbeidTest
    },
    {
        key: RegelKey.bareFarHarRettEttBarnAktivitetskravMorInfo,
        alvorlighet: RegelAlvorlighet.INFO,
        test: bareFarHarRettEttBarnAktivitetskravMorTest
    },
    {
        key: RegelKey.bareFarHarRettFlerbarnsukerAktivitetskravMorInfo,
        alvorlighet: RegelAlvorlighet.INFO,
        test: bareFarHarRettFlerbarnsukerAktivitetskravMorTest,
        overstyrerRegler: [RegelKey.bareFarHarRettEttBarnAktivitetskravMorInfo]
    },
    {
        key: RegelKey.farMedmorBrukerFellesperiodeInfo,
        alvorlighet: RegelAlvorlighet.INFO,
        test: brukerFarMedmorAvFellesperiodeTest
    },
    {
        key: RegelKey.farMedmorUtsetterPgaArbeidInfo,
        alvorlighet: RegelAlvorlighet.INFO,
        test: utsetterFarMedmorPgaArbeidTest
    },
    {
        key: RegelKey.erAlleTilgjengeligeDagerBrukt,
        alvorlighet: RegelAlvorlighet.ADVARSEL,
        test: erAlleTilgjengeligeDagerBruktTest,
        kategori: 'fordeling'
    },
    {
        key: RegelKey.avlutterUttaksplanMedUtsettelse,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: avslutterPlanenMedUtsettelseTest
    }
];

export const ReglerAngåendeFordeling = [];

export default uttaksplanRegler;
