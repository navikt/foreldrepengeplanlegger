/** Test av typing for å skille mellom de ulike periodetypene */

export interface Tidsperiode {
	start: Date;
	slutt: Date;
	uker?: number;
	dager?: number;
}

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
	'Ferie',
	'Arbeid',
	'SykdomSkade',
	'InnlagtBarn',
	'Annet'
}

export enum OppholdArsakType {
	'VenterSoknadFraAnnenForelder',
	'ManglendeSoktPeriode'
}

export interface KravTilUttaksplan {
	ukerModrekvoteForTermin: number;
	ukerModrekvoteEtterFodsel: number;
	ukerFedrekvote: number;
}
