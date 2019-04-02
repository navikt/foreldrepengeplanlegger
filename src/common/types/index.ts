export * from '../intl/types';

export type DateValue = Date | undefined;

export type Dekningsgrad = '80' | '100';

export interface Tidsperiode {
    fom: Date;
    tom: Date;
}

export interface Avgrensninger {
    minDato?: Date;
    maksDato?: Date;
    ugyldigeTidsperioder?: Tidsperiode[];
    helgedagerIkkeTillatt?: boolean;
}
