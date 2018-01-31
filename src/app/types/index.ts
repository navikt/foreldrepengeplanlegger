export * from './periodetyper';

export type Dekningsgrad = '80%' | '100%';

export type Forelder = 'forelder1' | 'forelder2';

export interface Tidsperiode {
	startdato: Date;
	sluttdato: Date;
}

export interface Soknadsdata {
	termindato: Date;
	dekningsgrad: Dekningsgrad;
	fellesukerForelder1: number;
	fellesukerForelder2: number;
}

export interface Grunnfordeling {
	antallUkerTotalt100: number;
	antallUkerTotalt80: number;
	antallUkerForelder1ForFodsel: number;
	antallUkerForelder1EtterFodsel: number;
	antallUkerForelder1Totalt: number;
	antallUkerForelder2Totalt: number;
	tidligstUkerUttakForelder1: number;
}
