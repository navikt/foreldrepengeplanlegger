import { Tidsperiode } from 'common/types';
import { Forelder } from '.';

export enum Periodetype {
    'Uttak' = 'uttak',
    'Ferie' = 'ferie',
    'Arbeid' = 'arbeid',
    'UbetaltPermisjon' = 'ubetaltPermisjon'
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

export interface Ferieperiode extends PeriodeBase {
    type: Periodetype.Ferie;
    fixed: true;
}

export interface Arbeidsperiode extends PeriodeBase {
    type: Periodetype.Arbeid;
    fixed: true;
}

export interface UbetaltPermisjon extends PeriodeBase {
    type: Periodetype.UbetaltPermisjon;
    fixed: true;
}

export type Utsettelsesperiode = Ferieperiode | Arbeidsperiode;

export type Periode = Uttaksperiode | Utsettelsesperiode | UbetaltPermisjon;

export function isUttak(periode: Periode): periode is Uttaksperiode {
    return periode.type === Periodetype.Uttak;
}

export function isUtsettelse(periode: Periode): periode is Utsettelsesperiode {
    return periode.type === Periodetype.Ferie || periode.type === Periodetype.Arbeid;
}

export function isFerie(periode: Periode): periode is Ferieperiode {
    return periode.type === Periodetype.Ferie;
}

export function isArbeid(periode: Periode): periode is Arbeidsperiode {
    return periode.type === Periodetype.Arbeid;
}

export function isUbetaltPermisjon(periode: Periode): periode is UbetaltPermisjon {
    return periode.type === Periodetype.UbetaltPermisjon;
}
