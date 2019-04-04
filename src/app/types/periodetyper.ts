import { Tidsperiode } from 'common/types';
import { Forelder, Uttaksinfo } from '.';
import { isValidTidsperiode } from '../utils/Tidsperioden';

export enum Periodetype {
    'Uttak' = 'uttak',
    'UttakFørTermin' = 'uttakFørTermin',
    'GradertUttak' = 'gradertUttak',
    'Ferie' = 'ferie',
    'Arbeid' = 'arbeid',
    'UlønnetPermisjon' = 'ulønnetPermisjon'
}

export enum Utsettelsesårsak {
    'ferie' = 'ferie',
    'arbeidHeltid' = 'arbeidHeltid'
}

export interface PeriodeBase {
    id: string;
    type: Periodetype;
    tidsperiode: Tidsperiode;
    forelder: Forelder;
    medforelder?: Forelder;
    fixed?: boolean;
    uttaksinfo?: Uttaksinfo;
    gradering?: number;
}

export interface Uttaksperiode extends PeriodeBase {
    type: Periodetype.Uttak;
}

export interface GradertUttaksperiode extends PeriodeBase {
    type: Periodetype.GradertUttak;
}

export interface UttakFørTerminPeriode extends PeriodeBase {
    type: Periodetype.UttakFørTermin;
    skalIkkeHaUttakFørTermin?: boolean;
}

export interface Ferieperiode extends PeriodeBase {
    type: Periodetype.Ferie;
}

export interface Arbeidsperiode extends PeriodeBase {
    type: Periodetype.Arbeid;
}

export interface UlønnetPermisjon extends PeriodeBase {
    type: Periodetype.UlønnetPermisjon;
    utsettelsesårsak: Utsettelsesårsak | undefined;
}

export type Utsettelsesperiode = Ferieperiode | Arbeidsperiode;

export type Periode =
    | Uttaksperiode
    | UttakFørTerminPeriode
    | GradertUttaksperiode
    | Utsettelsesperiode
    | UlønnetPermisjon
    | Ferieperiode;

export function isKomplettPeriode(periode: Partial<Periode> | undefined): periode is Periode {
    return (
        periode !== undefined &&
        isValidTidsperiode(periode.tidsperiode) &&
        periode.type !== undefined &&
        periode.forelder !== undefined &&
        ((periode.type === Periodetype.GradertUttak && periode.gradering !== undefined) || true)
    );
}
export function isUttakOrGradertUttak(periode: Periode): periode is Uttaksperiode | GradertUttaksperiode {
    return periode.type === Periodetype.Uttak || periode.type === Periodetype.GradertUttak;
}

export function isUttak(periode: Periode): periode is Uttaksperiode {
    return periode.type === Periodetype.Uttak;
}

export function isUttakFørTermin(periode: Periode): periode is UttakFørTerminPeriode {
    return periode.type === Periodetype.UttakFørTermin;
}

export function isGradertUttak(periode: Periode): periode is GradertUttaksperiode {
    return periode.type === Periodetype.GradertUttak;
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

export function isUlønnetPermisjon(periode: Periode): periode is UlønnetPermisjon {
    return periode.type === Periodetype.UlønnetPermisjon;
}
