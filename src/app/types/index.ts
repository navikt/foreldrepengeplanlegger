import { Periodetype } from './periodetyper';

export * from './periodetyper';

export enum Forelder {
    'forelder1' = 'forelder1',
    'forelder2' = 'forelder2'
}

export enum Søkersituasjon {
    FØDSEL = 'fødsel',
    ADOPSJON = 'adopsjon',
    FORELDREANSVAR = 'omsorgsovertakelse'
}

export enum Situasjon {
    'farOgMor' = 'farOgMor',
    'bareFar' = 'bareFar',
    'bareMor' = 'bareMor',
    'aleneomsorg' = 'aleneomsorg',
    'farOgFar' = 'farOgFar',
    'morOgMedmor' = 'morOgMedmor'
}

export interface UkerOgDager {
    uker: number;
    dager: number;
}

export interface PeriodeUttaksinfo {
    uttaksdager?: number;
    helligdager?: number;
    ukerOgDager: UkerOgDager;
    uttaksdagerBrukt: number;
}

export type UttaksplanColor = 'purple' | 'blue' | 'green' | 'purpleBlue' | 'yellow' | '';

export interface SituasjonSkjemadata {
    situasjon: Situasjon;
    navnForelder1: string;
    navnForelder2: string;
    antallBarn: number;
    familiehendelsesdato: Date;
}

export enum StønadskontoType {
    /** Kvote forbeholdt mor */
    'Mødrekvote' = 'MØDREKVOTE',
    /** Kvote forbehold medforelder */
    'Fedrekvote' = 'FEDREKVOTE',
    /** Felleskvote som kan fordeles mellom mor og medforelder */
    'Fellesperiode' = 'FELLESPERIODE',
    /** Når det kun er en forsørger/forelder */
    'Foreldrepenger' = 'FORELDREPENGER',
    /** Når det kun er en forsørger/forelder */
    'ForeldrepengerFørFødsel' = 'FORELDREPENGER_FØR_FØDSEL',
    /** Når det kun er en forsørger/forelder */
    'SamtidigUttak' = 'SAMTIDIGUTTAK',
    'Flerbarnsdager' = 'FLERBARNSDAGER',
    'AktivitetsfriKvote' = 'AKTIVITETSFRI_KVOTE'
}

export interface TilgjengeligStønadskonto {
    stønadskontoType: StønadskontoType;
    dager: number;
}

export interface TilgjengeligeDager {
    dagerTotalt: number;
    dagerForbeholdtMor: number;
    dagerForbeholdtFar: number;
    dagerFelles: number;
    stønadskontoer: TilgjengeligStønadskonto[];
}

export interface ForelderForbruk {
    brukteUttaksdager: number;
    forbrukPerPeriodetype: ForbrukPerPeriodetype[];
}

export interface ForbrukPerPeriodetype {
    periodetype: Periodetype;
    uttaksdagerIPeriodene: number;
    helligdagerIPeriodene: number;
}

export interface Forbruk {
    forelder1: ForelderForbruk;
    forelder2?: ForelderForbruk;
}
