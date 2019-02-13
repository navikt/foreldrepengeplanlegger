import { Dictionary } from 'lodash';
import { Periode, Situasjon, Uttaksdatoer, UttakFørTerminPeriode } from '../../types';
import { RegelKey } from './regelKeys';

export interface Regelgrunnlag {
    perioder: Periode[];
    periodeFørTermin: UttakFørTerminPeriode | undefined;
    familiehendelsesdato: Date;
    situasjon: Situasjon;
    erMor: boolean;
    uttaksdatoer: Uttaksdatoer;
    navnMor: string;
    navnFarMedmor?: string;
}

export type RegelTest = (key: RegelKey, grunnlag: Regelgrunnlag) => RegelTestresultat;

export interface Regel {
    key: RegelKey;
    test: (key: RegelKey, grunnlag: Regelgrunnlag) => RegelTestresultat;
}

export enum RegelAlvorlighet {
    'ULOVLIG' = 'ulovlig',
    'INFO' = 'info'
}

export interface RegelTestresultat {
    key: RegelKey;
    passerer: boolean;
    regelbrudd?: Regelbrudd;
}

export interface Regelbrudd {
    periodeId?: string;
    key: RegelKey;
    feilmelding: {
        intlKey: string;
        values?: any;
    };
    alvorlighet: RegelAlvorlighet;
}

export type PeriodeRegelTestresultat = Dictionary<RegelTestresultat[]>;

export interface UttaksplanRegelTestresultat {
    resultat: RegelTestresultat[];
    resultatPerPeriode: PeriodeRegelTestresultat;
    regelbrudd: Regelbrudd[];
}
