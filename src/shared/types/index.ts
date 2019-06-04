import { ForeldreparForelder } from 'shared/types/foreldreparTypes';

export * from './regelTypes';
export * from './forbrukTypes';
export * from './foreldreparTypes';

export enum Forelder {
    'farMedmor' = 'farMedmor',
    'mor' = 'mor'
}

export interface Forelderinfo {
    navn: string;
    ikonRef: ForeldreparForelder;
}

export interface OmForeldre {
    mor: Forelderinfo;
    farMedmor?: Forelderinfo;
    bareMor: boolean;
    bareFar: boolean;
    forelderVedAleneomsorg?: Forelder;
    erDeltOmsorg: boolean;
}
