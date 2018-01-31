import { Tidsperiode } from 'app/types';
import { Forelder } from 'app/redux/types';

export enum Periodetype {
	'Stonadsperiode' = 'Stønadsperiode',
	'Utsettelse' = 'Utsettelse'
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
}

export interface Stonadsperiode extends PeriodeBase {
	type: Periodetype.Stonadsperiode;
	konto: StonadskontoType.Fedrekvote | StonadskontoType.Modrekvote;
	forelder: Forelder;
}

export interface Fellesperiode extends PeriodeBase {
	type: Periodetype.Stonadsperiode;
	konto: StonadskontoType.Fellesperiode;
}

export interface Utsettelsesperiode extends PeriodeBase {
	type: Periodetype.Utsettelse;
	arsak: UtsettelseArsakType;
	forelder: Forelder;
}

export type Periode = Stonadsperiode | Utsettelsesperiode | Fellesperiode;
