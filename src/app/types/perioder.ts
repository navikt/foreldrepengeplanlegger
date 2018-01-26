/** Test av typing for å skille mellom de ulike periodetypene */

export interface Tidsperiode {
	start: Date;
	slutt: Date;
	uker?: number;
	dager?: number;
}

export type Forelder = 'forelder1' | 'forelder2';

export enum Periodetype {
	'Stonadsperiode',
	'Utsettelse',
	'Opphold'
}

export enum StonadskontoType {
	/** Kvote forbeholdt mor */
	'Modrekvote',
	/** Kvote forbehold medforelder */
	'Fedrekvote',
	/** Felleskvote som kan fordeles mellom mor og medforelder */
	'Fellesperiode',
	/** Når det kun er en forsørger/forelder */
	'Foreldrepenger'
}

export enum UtsettelseArsakType {
	'Ferie' = 'ferie',
	'Arbeid' = 'arbeid',
	'UbetaltPermisjon' = 'ubetaltPermisjon'
}

export interface KravTilUttaksplan {
	ukerModrekvoteForTermin: number;
	ukerModrekvoteEtterFodsel: number;
	ukerFedrekvote: number;
}

export interface UtsettelsePeriode {
	periode?: Tidsperiode;
	arsak?: UtsettelseArsakType;
	forelder?: Forelder;
}
