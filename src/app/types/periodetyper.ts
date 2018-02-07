import { Tidsperiode, Forelder } from 'app/types';

export enum Periodetype {
	'Stonadsperiode' = 'Stønadsperiode',
	'Utsettelse' = 'Utsettelse',
	'SammenslattPeriode' = 'SammenslattPeriode'
}

export enum StonadskontoType {
	/** Kvote forbeholdt mor */
	'Modrekvote' = 'Modrekvote',
	/** Kvote forbehold medforelder */
	'Fedrekvote' = 'Fedrekvote',
	/** Felleskvote som kan fordeles mellom mor og medforelder */
	'Fellesperiode' = 'Fellesperiode',
	/** Når det kun er en forsørger/forelder */
	'Foreldrepenger' = 'Foreldrepenger',
	/** Mors permisjon før fødsel */
	'ForeldrepengerForFodsel' = 'ForeldrepengerForFodsel'
}

export enum UtsettelseArsakType {
	'Ferie' = 'ferie',
	'Arbeid' = 'arbeid',
	'UbetaltPermisjon' = 'ubetaltPermisjon'
}

interface PeriodeBase {
	id?: string;
	type: Periodetype;
	tidsperiode: Tidsperiode;
	fastPeriode?: boolean;
}

export type Stonadskontoer =
	| StonadskontoType.Fedrekvote
	| StonadskontoType.Modrekvote
	| StonadskontoType.Fellesperiode
	| StonadskontoType.ForeldrepengerForFodsel;

export interface Stonadsperiode extends PeriodeBase {
	type: Periodetype.Stonadsperiode;
	konto: Stonadskontoer;
	forelder: Forelder;
}

export interface Utsettelsesperiode extends PeriodeBase {
	type: Periodetype.Utsettelse;
	arsak: UtsettelseArsakType;
	forelder: Forelder;
}

export interface SammenslattPeriode extends PeriodeBase {
	type: Periodetype.SammenslattPeriode;
	perioder: Periode[];
	forelder: Forelder;
	tidsperiode: Tidsperiode;
}

export type Periode = Stonadsperiode | Utsettelsesperiode | SammenslattPeriode;
