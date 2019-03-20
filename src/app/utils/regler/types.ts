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
import { InjectedIntl } from 'react-intl';
import { RegelKey } from '.';

type FeilIntlMessage = (intl: InjectedIntl) => string;

export enum RegelAlvorlighet {
    'FEIL' = 'feil',
    'ADVARSEL' = 'advarsel',
    'INFO' = 'info'
}

export interface UttaksplanRegelTestresultat {
    resultat: RegelStatus[];
    avvikPerPeriode: Dictionary<RegelAvvik[]>;
    avvik: RegelAvvik[];
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
    alvorlighet: RegelAlvorlighet;
    overstyresAvRegel?: RegelKey;
    overstyrerRegler?: RegelKey[];
}

export type RegelTest = (grunnlag: Regelgrunnlag) => RegelTestresultat;

export interface RegelTestresultat {
    passerer: boolean;
    info?: RegelTestresultatInfoObject;
    periodeId?: string;
}

export type RegelTestresultatInfoObject = Partial<RegelTestresultatInfo> | Array<Partial<RegelTestresultatInfo>>;

export interface RegelStatus {
    key: RegelKey;
    passerer: boolean;
    regelAvvik?: RegelAvvik[];
}

export interface RegelAvvik {
    id: string;
    key: RegelKey;
    periodeId?: string;
    info: RegelTestresultatInfo;
    alvorlighet: RegelAlvorlighet;
    overstyresAvRegel?: RegelKey;
    overstyrerRegler?: RegelKey[];
}

export interface RegelTestresultatInfo {
    intlKey: string;
    values?: { [key: string]: string | number | Date | FeilIntlMessage | undefined };
    periodeId?: string;
}
