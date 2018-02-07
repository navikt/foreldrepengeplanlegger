import { addYears } from 'date-fns';
import { Grunnfordeling, Tidsperiode, Dekningsgrad, Stonadsperiode, Periodetype, StonadskontoType } from 'app/types';
import { getPeriodeSluttdato, sorterPerioder } from 'app/utils/periodeUtils';
import { normaliserDato } from 'app/utils';
import {
	getForsteUttaksdagEtterDato,
	trekkUttaksdagerFraDato,
	getForsteUttaksdagPaEllerEtterDato
} from 'app/utils/uttaksdagerUtils';

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

	const getPakrevdModrekvotePostTermin = (): Tidsperiode => {
		return {
			startdato: termindato,
			sluttdato: getPeriodeSluttdato(termindato, grunnfordeling.antallUkerForelder1EtterFodsel)
		};
	};

	const getModrekvotePostTermin = (): Tidsperiode => {
		const startdato = getForsteUttaksdagEtterDato(getPakrevdModrekvotePostTermin().sluttdato);
		return {
			startdato,
			sluttdato: getPeriodeSluttdato(
				startdato,
				grunnfordeling.antallUkerModrekvote - grunnfordeling.antallUkerForelder1EtterFodsel
			)
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
			sluttdato: getPeriodeSluttdato(startdato, grunnfordeling.antallUkerFedrekvote)
		};
	};

	const getStartdato = (): Date => {
		return trekkUttaksdagerFraDato(termindato, -1 * (grunnfordeling.antallUkerForelder1ForFodsel * 5));
	};

	const getSistePermisjonsdag = (): Date => {
		return getForsteUttaksdagPaEllerEtterDato(addYears(termindato, grunnfordeling.maksPermisjonslengdeIAr));
	};

	/**
	 * Setter opp basisoppsett for perioder uten utsettelser hvor
	 * mor tar første del av permisjonen og fedrekvote er etter
	 * fellesperiode
	 */
	const opprettStonadsperioder = (): Stonadsperiode[] => {
		const perioder: Stonadsperiode[] = [
			{
				type: Periodetype.Stonadsperiode,
				forelder: 'forelder1',
				konto: StonadskontoType.ForeldrepengerForFodsel,
				tidsperiode: getModrekvotePreTermin(),
				fastPeriode: true
			},
			{
				type: Periodetype.Stonadsperiode,
				forelder: 'forelder1',
				konto: StonadskontoType.Modrekvote,
				tidsperiode: getPakrevdModrekvotePostTermin(),
				fastPeriode: true
			},
			{
				type: Periodetype.Stonadsperiode,
				forelder: 'forelder1',
				konto: StonadskontoType.Modrekvote,
				tidsperiode: getModrekvotePostTermin(),
				fastPeriode: false
			},
			{
				type: Periodetype.Stonadsperiode,
				forelder: 'forelder2',
				konto: StonadskontoType.Fedrekvote,
				tidsperiode: getFedrekvote()
			}
		];
		if (fellesukerForelder1 > 0) {
			perioder.push({
				type: Periodetype.Stonadsperiode,
				forelder: 'forelder1',
				konto: StonadskontoType.Fellesperiode,
				tidsperiode: getFellesperiodeForelder1()
			});
		}
		if (fellesukerForelder2 > 0) {
			perioder.push({
				type: Periodetype.Stonadsperiode,
				forelder: 'forelder2',
				konto: StonadskontoType.Fellesperiode,
				tidsperiode: getFellesperiodeForelder2()
			});
		}
		return perioder.sort(sorterPerioder);
	};

	return {
		getModrekvotePreTermin,
		getModrekvotePostTermin,
		getFellesperiodeForelder1,
		getFellesperiodeForelder2,
		getFedrekvote,
		getSistePermisjonsdag,
		opprettStonadsperioder
	};
};

export default Periodeberegner;
