export enum Forelder {
    'forelder1' = 'forelder1',
    'forelder2' = 'forelder2'
}

export enum Periodetype {
    'UTTAK' = 'uttak',
    'UTSETTELSE' = 'utsettelse',
    'UBETALT_PERMISJON' = 'ubetalt'
}

export enum Utsettelsesårsak {
    'FERIE' = 'ferie',
    'ARBEID' = 'arbeid'
}

export interface Periode {
    id: string;
    type: Periodetype;
    tidsperiode: {
        fom: Date;
        tom: Date;
    };
    forelder: Forelder;
    gradering?: number;
}

export interface Uttaksperiode extends Periode {
    type: Periodetype.UTTAK;
}

export interface Utsettelsesperiode extends Periode {
    type: Periodetype.UTSETTELSE;
    årsak: Utsettelsesårsak;
}

export interface UbetaltPermisjonPeriode extends Periode {
    type: Periodetype.UBETALT_PERMISJON;
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
