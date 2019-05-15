import { Regel, RegelAlvorlighet } from './types';
import { harFarEllerMedmorUttakFørsteSeksUkerTest } from './tester/harFarEllerMedmorUttakFørsteSeksUkerTest';
import { inneholderPlanenFerieMedUttaksdagerTest } from './tester/inneholderPlanenFerieMedUttaksdagerTest';
import { starterUttakInnenfor12UkerFørTerminTest } from './tester/starterUttakInnenfor12UkerFørTerminTest';
import { erPlanenInnenforSisteMuligeUttaksdagTest } from './tester/erPlanenInnenforSisteMuligeUttaksdagTest';
import { erFarMedmorsUttakErInnenforMaksAntallDagerTest } from './tester/erFarMedmorsUttakErInnenforMaksAntallDagerTest';
import { erMorsUttakErInnenforMaksAntallDagerTest } from './tester/erMorsUttakErInnenforMaksAntallDagerTest';
import { erAlleUttakErInnenforMaksAntallDagerTest } from './tester/erAlleUttakErInnenforMaksAntallDagerTest';
import {
    harFarMedmorUtsettelseFørsteSeksUkerTest,
    harMorUtsettelseFørsteSeksUkerTest
} from './tester/inneholderUtsettelseFørsteSeksUkerTest';
import { harForeldreForMangeFeriedagerTest } from './tester/harForelderForMangeFeriedagerTest';
import { avslutterPlanenMedUtsettelseTest } from './tester/avslutterPlanenMedUtsettelseTest';

import { utsetterMorPgaArbeidTest } from './tester/utsetterMorPgaArbeidTest';
import { brukerFarMedmorAvFellesperiodeTest } from './tester/brukerFarMedmorAvFellesperiodeTest';
import { utsetterFarMedmorPgaArbeidTest } from './tester/utsetterFarMedmorPgaArbeidTest';
import { bareFarHarRettEttBarnAktivitetskravMorTest } from './tester/bareFarHarRettEttBarnAktivitetskravMorTest';
import { bareFarHarRettFlerbarnsukerAktivitetskravMorTest } from './tester/bareFarHarRettFlerbarnsukerAktivitetskravMorTest';
import { erAlleTilgjengeligeDagerBruktTest } from './tester/erAlleTilgjengeligeDagerBruktTest';
import { harUlønnetPermisjonUtsettelsesårsak } from './tester/harUlønnetPermisjonUtsettelsesårsak';
import { harAvsluttendeUlønnedePermisjoner } from './tester/harAvsluttendeUlønnedePermisjoner';

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
    'morUtsetterFørsteSeksUker' = 'morUtsetterFørsteSeksUker',
    'farMedmorUtsetterFørsteSeksUker' = 'farMedmorUtsetterFørsteSeksUker',
    'harForeldreForMangeFeriedager' = 'morHarForMangeFeriedager',
    'farMedmorHarForMangeFeriedager' = 'farMedmorHarForMangeFeriedager',
    'bareFarHarRettEttBarnAktivitetskravMorInfo' = 'bareFarHarRettEttBarnAktivitetskravMorInfo',
    'bareFarHarRettFlerbarnsukerAktivitetskravMorInfo' = 'bareFarHarRettFlerbarnsukerAktivitetskravMorInfo',
    'erAlleTilgjengeligeDagerBrukt' = 'erAlleTilgjengeligeDagerBrukt',
    'erUlønnetPermisjon' = 'erUlønnetPermisjon',
    'avlutterUttaksplanMedUtsettelse' = 'avlutterUttaksplanMedUtsettelse',
    'harUlønnetPermisjonValgtÅrsak' = 'harUlønnetPermisjonValgtÅrsak',
    'harAvsluttendeUlønnedePermisjoner' = 'avsluttendeUlønnedePermisjoner'
}

const feilRegler: Regel[] = [
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
        key: RegelKey.avlutterUttaksplanMedUtsettelse,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: avslutterPlanenMedUtsettelseTest
    },
    {
        key: RegelKey.harUlønnetPermisjonValgtÅrsak,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: harUlønnetPermisjonUtsettelsesårsak
    }
];

const advarselRegler: Regel[] = [
    {
        key: RegelKey.uttakForFarEllerMedmorFørsteSeksUkerInfo,
        alvorlighet: RegelAlvorlighet.ADVARSEL,
        test: harFarEllerMedmorUttakFørsteSeksUkerTest
    },
    {
        key: RegelKey.erAlleTilgjengeligeDagerBrukt,
        alvorlighet: RegelAlvorlighet.ADVARSEL,
        test: erAlleTilgjengeligeDagerBruktTest,
        kategori: 'fordeling'
    }
];

const infoRegler: Regel[] = [
    {
        key: RegelKey.ferieMedUttaksdagerInfo,
        alvorlighet: RegelAlvorlighet.INFO,
        test: inneholderPlanenFerieMedUttaksdagerTest
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
        key: RegelKey.morUtsetterPgaArbeidInfo,
        alvorlighet: RegelAlvorlighet.INFO,
        test: utsetterMorPgaArbeidTest
    },
    {
        key: RegelKey.farMedmorUtsetterPgaArbeidInfo,
        alvorlighet: RegelAlvorlighet.INFO,
        test: utsetterFarMedmorPgaArbeidTest
    },
    {
        key: RegelKey.harAvsluttendeUlønnedePermisjoner,
        alvorlighet: RegelAlvorlighet.INFO,
        test: harAvsluttendeUlønnedePermisjoner
    }
];

const uttaksplanRegler: Regel[] = [...feilRegler, ...advarselRegler, ...infoRegler];

export const ReglerAngåendeFordeling = [];

export default uttaksplanRegler;
