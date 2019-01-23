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
