export * from '../intl/types';

export type DateValue = Date | undefined;

export type Dekningsgrad = '80' | '100';

export interface Tidsperiode {
    fom: Date;
    tom: Date;
}
