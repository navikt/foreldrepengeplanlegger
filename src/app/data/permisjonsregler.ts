import { Permisjonsregler } from 'app/types';
import { isBefore } from 'date-fns';
import { getPermisjonStartdato } from 'app/utils/permisjonUtils';

const antallUkerForelder1FørFødsel = 3;

const reglerTomJuni: Permisjonsregler = {
	antallUkerForelder1FørFødsel,
	antallUkerForelder1EtterFødsel: 6,
	maksPermisjonslengdeIÅr: 3,
	maksFeriedagerEttÅr: 21,
	maksFeriedagerMedOverføring: 52,

	dekning80: {
		antallUkerTotalt: 59,
		antallUkerFellesperiode: 36,
		antallUkerFedrekvote: 10,
		antallUkerMødrekvote: 10
	},

	dekning100: {
		antallUkerTotalt: 49,
		antallUkerFellesperiode: 26,
		antallUkerFedrekvote: 10,
		antallUkerMødrekvote: 10
	}
};

const reglerFomJuli2018: Permisjonsregler = {
	antallUkerForelder1FørFødsel,
	antallUkerForelder1EtterFødsel: 6,
	maksPermisjonslengdeIÅr: 3,
	maksFeriedagerEttÅr: 21,
	maksFeriedagerMedOverføring: 52,

	dekning80: {
		antallUkerTotalt: 59,
		antallUkerFellesperiode: 26,
		antallUkerFedrekvote: 15,
		antallUkerMødrekvote: 15
	},

	dekning100: {
		antallUkerTotalt: 49,
		antallUkerFellesperiode: 16,
		antallUkerFedrekvote: 15,
		antallUkerMødrekvote: 15
	}
};

const reglerFomJanuar2019: Permisjonsregler = {
	antallUkerForelder1FørFødsel,
	antallUkerForelder1EtterFødsel: 6,
	maksPermisjonslengdeIÅr: 3,
	maksFeriedagerEttÅr: 21,
	maksFeriedagerMedOverføring: 52,

	dekning80: {
		antallUkerTotalt: 59,
		antallUkerFellesperiode: 18,
		antallUkerFedrekvote: 19,
		antallUkerMødrekvote: 19
	},

	dekning100: {
		antallUkerTotalt: 49,
		antallUkerFellesperiode: 18,
		antallUkerFedrekvote: 15,
		antallUkerMødrekvote: 15
	}
};

export const erFørsteUttaksdagFør2019 = (termindato: Date): boolean => {
	const førsteUttaksdag = getPermisjonStartdato(
		termindato,
		antallUkerForelder1FørFødsel
	);
	return isBefore(førsteUttaksdag, new Date(2019, 0, 1));
};

export const getPermisjonsregler = (termindato: Date): Permisjonsregler => {
	return erFørsteUttaksdagFør2019(termindato)
		? getPermisjonsreglerFom13April(termindato)
		: reglerFomJanuar2019;
};

export const getPermisjonsreglerFom13April = (
	termindato: Date
): Permisjonsregler =>
	isBefore(termindato, new Date(2018, 6, 1))
		? reglerTomJuni
		: reglerFomJuli2018;
