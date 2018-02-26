import { Periode } from 'app/types/periodetyper';

export * from './periodetyper';

export type Dekningsgrad = '80%' | '100%';

export type Forelder = 'forelder1' | 'forelder2';

export interface Tidsperiode {
	startdato: Date;
	sluttdato: Date;
}

export interface Grunnfordeling {
	/** Totalt antall uker ved 80% */
	antallUkerTotalt80: number;
	/** Totalt antall uker ved 100% */
	antallUkerTotalt100: number;
	/** Antall uker som er forbeholdt mor før fødsel */
	antallUkerForelder1ForFodsel: number;
	/** Antall uker som er forbeholdt mor etter fødsel */
	antallUkerForelder1EtterFodsel: number;
	/** Mødrekvote */
	antallUkerModrekvote: number;
	/** Fedrekvote */
	antallUkerFedrekvote: number;
	/** Antall uker som kan fordeles ved 80% */
	antallUkerFellesperiode80: number;
	/** Antall uker som kan fordeles ved 100% */
	antallUkerFellesperiode100: number;
	/** Frist for når en må ta ut siste permisjonsdag */
	maksPermisjonslengdeIAr: number;
	/** Maks feriedager i ett år */
	maksFeriedagerEttAr: number;
	/** Maks feriedager med overføring fra foregående år og forskudd fra nest år */
	maksFeriedagerMedOverforing: number;
}

export interface Periodesplitt {
	perioderFor: Periode[];
	perioderEtter: Periode[];
}

export interface FellesperiodeFordeling {
	ukerForelder1: number;
	ukerForelder2: number;
}
