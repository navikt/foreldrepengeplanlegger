export type Dekningsgrad = '80%' | '100%';

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
	'Foreldrepenger',
	/** Når det kun er en forsørger/forelder */
	'ForeldrepengerForFodsel'
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

export interface Tidsperiode {
	startdato: Date;
	sluttdato: Date;
}

export interface Utsettelse {
	id?: string;
	tidsperiode?: Tidsperiode;
	arsak?: UtsettelseArsakType;
	forelder?: Forelder;
}

export interface Uttaksregler {
	periode: Tidsperiode;
	krav: KravTilUttaksplan;
}

export interface Grunndata {
	antallUkerTotalt100: number;
	antallUkerTotalt80: number;
	antallUkerForelder1ForFodsel: number;
	antallUkerForelder1EtterFodsel: number;
	antallUkerForelder1Totalt: number;
	antallUkerForelder2Totalt: number;
	tidligstUkerUttakForelder1: number;
}
