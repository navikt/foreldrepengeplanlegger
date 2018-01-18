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

export enum Forelder {
	'mor',
	'medforelder'
}

interface Basisperiode {
	/** Hvilket tidsrom dette perioden er for */
	tidsrom: Tidsperiode;
	/** Hvem som har perioden */
	forelder: Forelder;
}

interface Stonadsperiode extends Basisperiode {
	periodetype: Periodetype.Stonadsperiode;
}

interface Utsettelsesperiode extends Basisperiode {
	periodetype: Periodetype.Utsettelse;
}

interface Oppholdsperiode extends Basisperiode {
	periodetype: Periodetype.Opphold;
}

export interface Modrekvote extends Stonadsperiode {
	stønadskonto: StonadskontoType.Modrekvote;
	prosent?: number;
}

export interface Fedrekvote extends Stonadsperiode {
	stønadskonto: StonadskontoType.Fedrekvote;
	prosent?: number;
}

export interface Fellesperiode extends Stonadsperiode {
	stønadskonto: StonadskontoType.Fellesperiode;
	prosent?: number;
}

export interface Foreldrepenger extends Stonadsperiode {
	stønadskonto: StonadskontoType.Foreldrepenger;
}

export interface Ferie extends Utsettelsesperiode {
	årsak: UtsettelseArsakType.Ferie;
}

export interface Arbeid extends Utsettelsesperiode {
	årsak: UtsettelseArsakType.Arbeid;
	prosent: number;
}

export interface Sykdom extends Utsettelsesperiode {
	årsak: UtsettelseArsakType.SykdomSkade;
}

export interface InnlagtBarn extends Utsettelsesperiode {
	årsak: UtsettelseArsakType.InnlagtBarn;
}

export interface AnnenPeriode extends Utsettelsesperiode {
	årsak: UtsettelseArsakType.Annet;
}

export interface ManglendeSoktPeriode extends Oppholdsperiode {
	årsak: OppholdArsakType.ManglendeSoktPeriode;
}

export interface VenterSoknadFraAnnenForelder extends Oppholdsperiode {
	årsak: OppholdArsakType.ManglendeSoktPeriode;
}

/** Alle gyldige periodetyper som en kan fylle utaksplanen med */
export type Uttaksperiode =
	| Modrekvote
	| Fedrekvote
	| Fellesperiode
	| Foreldrepenger
	| Ferie
	| Arbeid
	| Sykdom
	| InnlagtBarn
	| AnnenPeriode
	| ManglendeSoktPeriode
	| VenterSoknadFraAnnenForelder;

export interface KravTilUttaksplan {
	dagerModrekvoteForTermin: number;
	dagerModrekvoteEtterFodsel: number;
	dagerFedrekvote: number;
}
