import { Grunnfordeling, Tidsperiode, Dekningsgrad } from 'app/types';
import { getPeriodeSluttdato, normaliserDato } from 'app/utils/periodeUtils';
import { addWeeks, addYears } from 'date-fns';
import { getForsteUttaksdagEtterDato, getForsteUttaksdagPaEllerEtterDato } from 'app/utils/uttaksdagerUtils';

const Periodeberegner = (
	termindato: Date,
	dekningsgrad: Dekningsgrad,
	fellesukerForelder1: number,
	fellesukerForelder2: number,
	grunnfordeling: Grunnfordeling
) => {
	termindato = normaliserDato(termindato);
	const getModrekvotePreTermin = (): Tidsperiode => {
		const startdato = getStartdato();
		return {
			startdato,
			sluttdato: getPeriodeSluttdato(startdato, grunnfordeling.antallUkerForelder1ForFodsel)
		};
	};

	const getModrekvotePostTermin = (): Tidsperiode => {
		return {
			startdato: termindato,
			sluttdato: getPeriodeSluttdato(termindato, grunnfordeling.antallUkerForelder1Totalt)
		};
	};

	const getFellesperiodeForelder1 = (): Tidsperiode => {
		const startdato = getForsteUttaksdagEtterDato(getModrekvotePostTermin().sluttdato);
		return {
			startdato,
			sluttdato: getPeriodeSluttdato(startdato, fellesukerForelder1)
		};
	};

	const getFellesperiodeForelder2 = (): Tidsperiode => {
		const startdato = getForsteUttaksdagEtterDato(getFellesperiodeForelder1().sluttdato);
		return {
			startdato,
			sluttdato: getPeriodeSluttdato(startdato, fellesukerForelder2)
		};
	};

	const getFedrekvote = (): Tidsperiode => {
		const startdato = getForsteUttaksdagEtterDato(getFellesperiodeForelder2().sluttdato);
		return {
			startdato,
			sluttdato: getPeriodeSluttdato(startdato, grunnfordeling.antallUkerForelder2Totalt)
		};
	};

	const getStartdato = (): Date => {
		return getForsteUttaksdagPaEllerEtterDato(addWeeks(termindato, -1 * grunnfordeling.antallUkerForelder1ForFodsel));
	};

	const getForsteMuligeUtsettelsesdag = (): Date => {
		return getForsteUttaksdagEtterDato(getPeriodeSluttdato(termindato, grunnfordeling.antallUkerForelder1EtterFodsel));
	};

	const getSistePermisjonsdag = (): Date => {
		return addYears(termindato, grunnfordeling.maksPermisjonslengdeIAr);
	};

	return {
		getModrekvotePreTermin,
		getModrekvotePostTermin,
		getFellesperiodeForelder1,
		getFellesperiodeForelder2,
		getFedrekvote,
		getForsteMuligeUtsettelsesdag,
		getSistePermisjonsdag
	};
};

export default Periodeberegner;
