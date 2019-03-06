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

export type UttaksplanFarge = 'lilla' | 'blaa' | 'gronn' | 'lillaBlaa' | 'gul' | 'graa';

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
    dagerForeldrepengerFørFødsel: number;
    dagerEtterTermin: number;
    dagerMor: number;
    dagerFar: number;
    dagerFelles: number;
    flerbarnsdager: number;
    maksDagerMor: number;
    maksDagerFar: number;
    stønadskontoer: TilgjengeligStønadskonto[];
    dagerForeldrepenger: number;
}

export interface ForbrukPerPeriodetype {
    periodetype: Periodetype;
    uttaksdagerIPeriodene: number;
    fridagerIPeriodene: number;
}

export interface Forbruk {
    skalHaForeldrepengerFørFødsel: boolean;
    ekstradagerFørTermin: number;
    dagerForeldrepengerFørFødsel: number;
    dagerEtterTermin: number;
    dagerGjenstående: number;
    mor: ForelderForbruk;
    farMedmor?: ForelderForbruk;
}

export interface ForelderForbruk {
    dagerTotalt: number;
    dagerEtterTermin: number;
    ekstradagerFørTermin: number;
    dagerForeldrepengerFørFødsel: number;
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

export interface SvgIkonProps {
    title: string;
    width?: number;
    height?: number;
}
