import { Dictionary } from 'lodash';
import { Periode, Uttaksdatoer, UttakFørTerminPeriode, Forbruk, TilgjengeligeDager, Forelder } from '../../app/types';
import { InjectedIntl } from 'react-intl';
import { RegelKey } from '../../app/utils/regler';
import { ForeldreparSituasjon } from 'shared/types/foreldreparTypes';

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
    situasjon: ForeldreparSituasjon;
    forelderVedAleneomsorg?: Forelder;
    erDeltOmsorg: boolean;
    uttaksdatoer: Uttaksdatoer;
    navnMor: string;
    navnFarMedmor?: string;
    forbruk?: Forbruk;
    tilgjengeligeDager?: TilgjengeligeDager;
    antallBarn: number;
}

export type RegelKategori = 'fordeling' | undefined;

export interface Regel {
    key: RegelKey;
    test: RegelTest;
    alvorlighet: RegelAlvorlighet;
    overstyresAvRegel?: RegelKey;
    overstyrerRegler?: RegelKey[];
    slåsSammenVedOppsummering?: boolean;
    skjulesIOppsummering?: boolean;
    skjulesIPeriode?: boolean;
    avvikType?: AvvikType;
    kategori?: RegelKategori;
}

export type RegelTest = (grunnlag: Regelgrunnlag) => RegelTestresultat;

export interface RegelTestresultat {
    passerer: boolean;
    info?: RegelTestresultatInfoObject;
    periodeId?: string;
}

export type RegelTestresultatInfoObject = RegelTestresultatInfo | RegelTestresultatInfo[];

export interface RegelStatus {
    key: RegelKey;
    passerer: boolean;
    regelAvvik?: RegelAvvik[];
}

export type AvvikType = 'forretning' | 'skjema';

export interface RegelAvvik {
    id: string;
    regel: Regel;
    periodeId?: string;
    info: RegelAvvikInfo;
}

type avikValueFunk = (intl: InjectedIntl) => string;

interface AvvikInfo {
    periodeId?: string;
    values?: { [key: string]: string | number | Date | FeilIntlMessage | avikValueFunk | undefined };
    renderAsHtml?: boolean;
}

export interface RegelAvvikInfo extends AvvikInfo {
    intlKey: string;
}

export interface RegelTestresultatInfo extends AvvikInfo {
    intlKey?: string;
}
