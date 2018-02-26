import { Permisjonsregler } from 'app/types';
import { isBefore } from 'date-fns';

const reglerTomJuni: Permisjonsregler = {
	antallUkerTotalt100: 49,
	antallUkerFellesperiode100: 26,
	antallUkerTotalt80: 59,
	antallUkerFellesperiode80: 36,
	antallUkerForelder1FørFødsel: 3,
	antallUkerForelder1EtterFødsel: 6,
	antallUkerFedrekvote: 10,
	antallUkerMødrekvote: 10,
	maksPermisjonslengdeIÅr: 3,
	maksFeriedagerEttÅr: 20,
	maksFeriedagerMedOverføring: 50
};

const reglerFomJuli2018: Permisjonsregler = {
	antallUkerTotalt100: 49,
	antallUkerFellesperiode100: 18,
	antallUkerTotalt80: 59,
	antallUkerFellesperiode80: 28,
	antallUkerForelder1FørFødsel: 3,
	antallUkerForelder1EtterFødsel: 6,
	antallUkerFedrekvote: 14,
	antallUkerMødrekvote: 14,
	maksPermisjonslengdeIÅr: 3,
	maksFeriedagerEttÅr: 20,
	maksFeriedagerMedOverføring: 50
};

export const getPermisjonsregler = (termindato: Date): Permisjonsregler =>
	isBefore(termindato, new Date(2018, 6, 1))
		? reglerTomJuni
		: reglerFomJuli2018;
