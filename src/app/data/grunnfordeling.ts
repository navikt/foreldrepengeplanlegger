import { Grunnfordeling } from 'app/types';
import { isBefore } from 'date-fns';

const grunnfordelingTomJuni: Grunnfordeling = {
	antallUkerTotalt100: 49,
	antallUkerFellesperiode100: 26,
	antallUkerTotalt80: 59,
	antallUkerFellesperiode80: 36,
	antallUkerForelder1ForFodsel: 3,
	antallUkerForelder1EtterFodsel: 6,
	antallUkerFedrekvote: 10,
	antallUkerModrekvote: 10,
	maksPermisjonslengdeIAr: 3
};

const grunnfordelingFomJuli2018: Grunnfordeling = {
	antallUkerTotalt100: 49,
	antallUkerFellesperiode100: 18,
	antallUkerTotalt80: 59,
	antallUkerFellesperiode80: 28,
	antallUkerForelder1ForFodsel: 3,
	antallUkerForelder1EtterFodsel: 6,
	antallUkerFedrekvote: 14,
	antallUkerModrekvote: 14,
	maksPermisjonslengdeIAr: 3
};

export const getGrunnfordeling = (termindato: Date): Grunnfordeling =>
	isBefore(termindato, new Date(2018, 6, 1))
		? grunnfordelingTomJuni
		: grunnfordelingFomJuli2018;
