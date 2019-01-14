import { Tidsperiode } from 'common/types';
import { Forelder } from '.';

export enum Periodetype {
    'Uttak' = 'uttak',
    'Utsettelse' = 'utsettelse',
    'UbetaltPermisjon' = 'ubetaltPermisjon'
}

export enum UtsettelsesårsakType {
    'Ferie' = 'ferie',
    'Arbeid' = 'arbeid'
}

export interface PeriodeBase {
    id: string;
    type: Periodetype;
    tidsperiode: Tidsperiode;
    forelder: Forelder;
    gradering?: number;
    fixed?: boolean;
}

export interface Uttaksperiode extends PeriodeBase {
    type: Periodetype.Uttak;
    fixed: false;
}

export interface Utsettelsesperiode extends PeriodeBase {
    type: Periodetype.Utsettelse;
    årsak: UtsettelsesårsakType;
    fixed: true;
}

export interface UbetaltPermisjon extends PeriodeBase {
    type: Periodetype.UbetaltPermisjon;
    fixed: true;
}

export type Periode = Uttaksperiode | Utsettelsesperiode | UbetaltPermisjon;

export function isUtsettelse(periode: Periode): periode is Utsettelsesperiode {
    return periode.type === Periodetype.Utsettelse;
}

export function isUttak(periode: Periode): periode is Uttaksperiode {
    return periode.type === Periodetype.Uttak;
}

export function isUbetaltPermisjon(periode: Periode): periode is UbetaltPermisjon {
    return periode.type === Periodetype.UbetaltPermisjon;
}
