import { ForeldreparSituasjon, Forelder } from 'shared/types';

export * from './periodetyper';
export * from 'shared/types';
export * from 'common/types';

export interface Uttaksinfo {
    antallUttaksdager: number;
    antallFridager: number;
    antallUttaksdagerBrukt: number;
}

export interface SituasjonSkjemadata {
    situasjon: ForeldreparSituasjon;
    navnMor: string;
    navnFarMedmor?: string;
    antallBarn: number;
    familiehendelsesdato: Date;
    forelderVedAleneomsorg?: Forelder;
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
