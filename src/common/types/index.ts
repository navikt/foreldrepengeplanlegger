export type Dekningsgrad = '80' | '100';

export type UttaksplanFarge = 'lilla' | 'blaa' | 'gronn' | 'gul' | 'graa' | 'hvit';

export interface Tidsperiode {
    fom: Date;
    tom: Date;
}

export interface UkerOgDager {
    uker: number;
    dager: number;
}

export interface Avgrensninger {
    minDato?: Date;
    maksDato?: Date;
    ugyldigeTidsperioder?: Tidsperiode[];
    helgedagerIkkeTillatt?: boolean;
}
