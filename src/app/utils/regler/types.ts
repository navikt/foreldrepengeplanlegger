import { Dictionary } from 'lodash';
import {
    Periode,
    Situasjon,
    Uttaksdatoer,
    UttakFørTerminPeriode,
    Forbruk,
    TilgjengeligeDager,
    Forelder
} from '../../types';
import { RegelKey } from './regelKeys';
import { InjectedIntl } from 'react-intl';

type FeilIntlMessage = (intl: InjectedIntl) => string;

export enum RegelAlvorlighet {
    'ULOVLIG' = 'ulovlig',
    'VIKTIG' = 'viktig',
    'INFO' = 'info'
}

export interface UttaksplanRegelTestresultat {
    resultat: RegelTestresultat[];
    resultatPerPeriode: Dictionary<RegelTestresultat[]>;
    regelbrudd: Regelbrudd[];
}

export interface Regelgrunnlag {
    perioder: Periode[];
    periodeFørTermin: UttakFørTerminPeriode | undefined;
    familiehendelsesdato: Date;
    situasjon: Situasjon;
    forelderVedAleneomsorg?: Forelder;
    erDeltOmsorg: boolean;
    uttaksdatoer: Uttaksdatoer;
    navnMor: string;
    navnFarMedmor?: string;
    forbruk?: Forbruk;
    tilgjengeligeDager?: TilgjengeligeDager;
    antallBarn: number;
}

export interface Regel {
    key: RegelKey;
    test: RegelTest;
    erRelevant?: (grunnlag: Regelgrunnlag) => boolean;
    overstyresAvRegel?: RegelKey;
    overstyrerRegler?: RegelKey[];
}

export type RegelTest = (regel: Regel, grunnlag: Regelgrunnlag) => RegelTestresultat;

export interface RegelTestresultat {
    key: RegelKey;
    passerer: boolean;
    regelbrudd?: Regelbrudd;
}

export interface Regelbrudd {
    periodeId?: string;
    key: RegelKey;
    feilmelding: RegelbruddIntlFeilmelding;
    alvorlighet: RegelAlvorlighet;
    overstyresAvRegel?: RegelKey;
    overstyrerRegler?: RegelKey[];
}

export interface RegelbruddIntlFeilmelding {
    intlKey: string;
    values?: { [key: string]: string | number | Date | FeilIntlMessage | undefined };
}
