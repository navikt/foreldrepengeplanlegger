import { Periode } from 'app/types/periodetyper';

export * from './periodetyper';

export type Dekningsgrad = 'dekning80' | 'dekning100';

export type Forelder = 'forelder1' | 'forelder2';

export type Spraak = 'nb' | 'nn';

export interface Tidsperiode {
	startdato: Date;
	sluttdato: Date;
}

interface AntallPermisjonsuker {
	/** Totalt antall uker */
	antallUkerTotalt: number;
	/** Mødrekvote */
	antallUkerMødrekvote: number;
	/** Fedrekvote */
	antallUkerFedrekvote: number;
	/** Antall uker som kan fordeles */
	antallUkerFellesperiode: number;
}

export interface Permisjonsregler {
	/** Antall uker som er forbeholdt mor før fødsel */
	antallUkerForelder1FørFødsel: number;
	/** Antall uker som er forbeholdt mor etter fødsel */
	antallUkerForelder1EtterFødsel: number;
	/** Frist for når en må ta ut siste permisjonsdag */
	maksPermisjonslengdeIÅr: number;
	/** Maks feriedager i ett år */
	maksFeriedagerEttÅr: number;
	/** Maks feriedager med overføring fra foregående år og forskudd fra nest år */
	maksFeriedagerMedOverføring: number;

	dekning80: AntallPermisjonsuker;
	dekning100: AntallPermisjonsuker;
}

export interface Periodesplitt {
	perioderFor: Periode[];
	perioderEtter: Periode[];
}

export interface FellesperiodeFordeling {
	ukerForelder1: number;
	ukerForelder2: number;
}
