export * from './perioder';

export type Dekningsgrad = '80%' | '100%';

export function assertNever(x: never): never {
	throw new Error('Unexpected object: ' + x);
}

import { Tidsperiode, KravTilUttaksplan } from './perioder';

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
