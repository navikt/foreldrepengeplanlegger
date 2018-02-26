import { Permisjonsregler } from 'app/types';
import { isBefore } from 'date-fns';

const reglerTomJuni: Permisjonsregler = {
	antallUkerTotalt100: 49,
	antallUkerFellesperiode100: 26,
	antallUkerTotalt80: 59,
	antallUkerFellesperiode80: 36,
	antallUkerForelder1ForFodsel: 3,
	antallUkerForelder1EtterFodsel: 6,
	antallUkerFedrekvote: 10,
	antallUkerModrekvote: 10,
	maksPermisjonslengdeIAr: 3,
	maksFeriedagerEttAr: 20,
	maksFeriedagerMedOverforing: 50
};

const reglerFomJuli2018: Permisjonsregler = {
	antallUkerTotalt100: 49,
	antallUkerFellesperiode100: 18,
	antallUkerTotalt80: 59,
	antallUkerFellesperiode80: 28,
	antallUkerForelder1ForFodsel: 3,
	antallUkerForelder1EtterFodsel: 6,
	antallUkerFedrekvote: 14,
	antallUkerModrekvote: 14,
	maksPermisjonslengdeIAr: 3,
	maksFeriedagerEttAr: 20,
	maksFeriedagerMedOverforing: 50
};

export const getPermisjonsregler = (termindato: Date): Permisjonsregler =>
	isBefore(termindato, new Date(2018, 6, 1))
		? reglerTomJuni
		: reglerFomJuli2018;
