import { Dictionary } from 'lodash';
import { Periode, Situasjon, Uttaksdatoer } from '../../types';
import { RegelKey } from './regelKeys';

export interface Regelgrunnlag {
    perioder: Periode[];
    periodeFørTermin: Periode | undefined;
    familiehendelsesdato: Date;
    situasjon: Situasjon;
    erMor: boolean;
    uttaksdatoer: Uttaksdatoer;
}

export type RegelTest = (key: RegelKey, grunnlag: Regelgrunnlag) => RegelTestresultat;

export interface Regel {
    key: RegelKey;
    test: (key: RegelKey, grunnlag: Regelgrunnlag) => RegelTestresultat;
}

export enum RegelAlvorlighet {
    'ULOVLIG' = 'ulovlig',
    'HAR_KRAV' = 'kreverInfo',
    'TIL_INFO' = 'tilInformasjon'
}

export interface RegelTestresultat {
    test: string;
    passerer: boolean;
    regelbrudd?: Regelbrudd;
}

export interface Regelbrudd {
    periodeId?: string;
    feilmelding: {
        intlKey: string;
        meta?: any;
    };
    alvorlighet: RegelAlvorlighet;
}

export type PeriodeRegelTestresultat = Dictionary<RegelTestresultat[]>;

export interface UttaksplanRegelTestresultat {
    resultat: RegelTestresultat[];
    resultatPerPeriode: PeriodeRegelTestresultat;
}
