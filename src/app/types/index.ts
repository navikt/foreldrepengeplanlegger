import { Periodetype } from './periodetyper';
import { Situasjon, ForeldreparForelder } from 'common/components/foreldrepar/foreldreparTypes';
import { Holiday } from 'date-holidays';
export * from 'common/components/foreldrepar/foreldreparTypes';
export * from './periodetyper';

export enum Forelder {
    'farMedmor' = 'farMedmor',
    'mor' = 'mor'
}

export enum Søkersituasjon {
    FØDSEL = 'fødsel',
    ADOPSJON = 'adopsjon',
    FORELDREANSVAR = 'omsorgsovertakelse'
}

export interface UkerOgDager {
    uker: number;
    dager: number;
}

export interface Uttaksinfo {
    antallUttaksdager?: number;
    antallFridager?: number;
    ukerOgDager: UkerOgDager;
    ukerOgDagerBrukt: UkerOgDager;
    antallUttaksdagerBrukt: number;
    fridager: Holiday[];
}

export type UttaksplanColor = 'purple' | 'blue' | 'green' | 'purpleBlue' | 'yellow' | 'gray';

export interface SituasjonSkjemadata {
    situasjon: Situasjon;
    navnMor: string;
    navnFarMedmor?: string;
    antallBarn: number;
    familiehendelsesdato: Date;
    erMor?: boolean;
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
    flerbarnsdager: number;
    dagerFørTermin: number;
    stønadskontoer: TilgjengeligStønadskonto[];
    dagerForeldrepenger: number;
}

export interface TilgjengeligeUker {
    ukerTotalt: number;
    ukerForbeholdtMor: number;
    ukerForbeholdtFar: number;
    ukerFelles: number;
    ukerFørTermin: number;
}

export interface ForelderForbruk {
    brukteUttaksdager: number;
    forbrukPerPeriodetype: ForbrukPerPeriodetype[];
}

export interface ForbrukPerPeriodetype {
    periodetype: Periodetype;
    uttaksdagerIPeriodene: number;
    fridagerIPeriodene: number;
}

export interface Fordeling {
    dagerTotalt: number;
    dagerGjenstående: number;
    mor: {
        uttaksdager: number;
        pst: number;
    };
    farMedmor?: {
        uttaksdager: number;
        pst: number;
    };
    overforbruk?: {
        uttaksdager: number;
        pst: number;
    };
}

export interface Forbruk {
    mor: ForelderForbruk;
    farMedmor?: ForelderForbruk;
    fordeling: Fordeling;
}

export interface SvgIkonProps {
    title: string;
    width?: number;
    height?: number;
}

export interface Forelderinfo {
    navn: string;
    ikonRef: ForeldreparForelder;
}

export interface OmForeldre {
    antallForeldre: number;
    mor: Forelderinfo;
    farMedmor?: Forelderinfo;
    forelderVedIkkeDeltPlan?: Forelder;
}

export interface Uttaksdatoer {
    førsteUttaksdag: Date;
    førFødsel: {
        førsteMuligeUttaksdag: Date;
        førsteUttaksdagForeldrepengerFørFødsel: Date;
        sisteUttaksdagFørFødsel: Date;
    };
    etterFødsel: {
        sisteUttaksdagInnenforSeksUker: Date;
        førsteUttaksdagEtterSeksUker: Date;
        sisteMuligeUttaksdag: Date;
    };
}
