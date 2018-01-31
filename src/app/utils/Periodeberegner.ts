import { Grunnfordeling, Soknadsdata, Tidsperiode } from 'app/types';
import {
	getForsteUttaksdagPaEllerEtterDato,
	getPeriodesluttDato,
	getForsteUttaksdagEtterDato
} from 'app/utils/periodeUtils';
import { addWeeks } from 'date-fns';

const Periodeberegner = (soknad: Soknadsdata, grunnfordeling: Grunnfordeling) => {
	const getModrekvotePreTermin = (): Tidsperiode => {
		const startdato = getStartdato();
		return {
			startdato,
			sluttdato: getPeriodesluttDato(startdato, grunnfordeling.antallUkerForelder1ForFodsel)
		};
	};

	const getModrekvotePostTermin = (): Tidsperiode => {
		return {
			startdato: soknad.termindato,
			sluttdato: getPeriodesluttDato(soknad.termindato, grunnfordeling.antallUkerForelder1EtterFodsel)
		};
	};

	const getFellesperiodeForelder1 = (): Tidsperiode => {
		const startdato = getForsteUttaksdagEtterDato(getModrekvotePostTermin().sluttdato);
		return {
			startdato,
			sluttdato: getPeriodesluttDato(startdato, soknad.fellesukerForelder1)
		};
	};

	const getFellesperiodeForelder2 = (): Tidsperiode => {
		const startdato = getForsteUttaksdagEtterDato(getFellesperiodeForelder1().sluttdato);
		return {
			startdato,
			sluttdato: getPeriodesluttDato(startdato, soknad.fellesukerForelder2)
		};
	};

	const getFedrekvote = (): Tidsperiode => {
		const startdato = getForsteUttaksdagEtterDato(getFellesperiodeForelder2().sluttdato);
		return {
			startdato,
			sluttdato: getPeriodesluttDato(startdato, grunnfordeling.antallUkerForelder2Totalt)
		};
	};

	const getStartdato = (): Date => {
		return getForsteUttaksdagPaEllerEtterDato(
			addWeeks(soknad.termindato, -1 * grunnfordeling.antallUkerForelder1ForFodsel)
		);
	};

	return {
		getModrekvotePreTermin,
		getModrekvotePostTermin,
		getFellesperiodeForelder1,
		getFellesperiodeForelder2,
		getFedrekvote
	};
};

export default Periodeberegner;
