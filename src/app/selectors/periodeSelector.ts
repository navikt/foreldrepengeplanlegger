import { createSelector } from 'reselect';
import { AppState, FormState } from 'app/redux/types';
import {
	Utsettelsesperiode,
	Periode,
	Stonadsperiode,
	Dekningsgrad,
	Grunnfordeling,
	Periodetype,
	StonadskontoType
} from 'app/types';
import { sorterPerioder, leggUtsettelserTilPerioder } from 'app/utils/periodeUtils';
import Periodeberegner from 'app/utils/Periodeberegner';

const formSelector = (state: AppState) => state.form;
const utsettelseSelector = (state: AppState) => state.utsettelse.utsettelser;

/**
 * Henter ut alle perioder gitt formState og utsettelser
 */
export const periodeSelector = createSelector(
	formSelector,
	utsettelseSelector,
	(form: FormState, utsettelser: Utsettelsesperiode[]): Periode[] => {
		if (!form.termindato || !form.dekningsgrad) {
			return [];
		}
		const stonadsperioder: Stonadsperiode[] = getStonadsperioder(
			form.termindato,
			form.dekningsgrad,
			form.grunnfordeling,
			form.ukerForelder1 || 0,
			form.ukerForelder2 || 0
		).sort(sorterPerioder);
		return leggUtsettelserTilPerioder(stonadsperioder, utsettelser);
	}
);

/**
 * Setter opp basisoppsett for perioder uten utsettelser hvor
 * mor tar første del av permisjonen og fedrekvote er etter
 * fellesperiode
 * @param termindato
 * @param dekningsgrad
 * @param grunnfordeling
 * @param fellesukerForelder1
 * @param fellesukerForelder2
 */
const getStonadsperioder = (
	termindato: Date,
	dekningsgrad: Dekningsgrad,
	grunnfordeling: Grunnfordeling,
	fellesukerForelder1: number,
	fellesukerForelder2: number
): Stonadsperiode[] => {
	const periodeberegner = Periodeberegner(
		termindato,
		dekningsgrad,
		fellesukerForelder1,
		fellesukerForelder2,
		grunnfordeling
	);
	const perioder: Stonadsperiode[] = [
		{
			type: Periodetype.Stonadsperiode,
			forelder: 'forelder1',
			konto: StonadskontoType.Modrekvote,
			tidsperiode: periodeberegner.getModrekvotePreTermin(),
			fastPeriode: true
		},
		{
			type: Periodetype.Stonadsperiode,
			forelder: 'forelder1',
			konto: StonadskontoType.Modrekvote,
			tidsperiode: periodeberegner.getModrekvotePostTermin(),
			fastPeriode: true
		},
		{
			type: Periodetype.Stonadsperiode,
			forelder: 'forelder2',
			konto: StonadskontoType.Fedrekvote,
			tidsperiode: periodeberegner.getFedrekvote()
		}
	];
	if (fellesukerForelder1 > 0) {
		perioder.push({
			type: Periodetype.Stonadsperiode,
			forelder: 'forelder1',
			konto: StonadskontoType.Fellesperiode,
			tidsperiode: periodeberegner.getFellesperiodeForelder1()
		});
	}
	if (fellesukerForelder2 > 0) {
		perioder.push({
			type: Periodetype.Stonadsperiode,
			forelder: 'forelder2',
			konto: StonadskontoType.Fellesperiode,
			tidsperiode: periodeberegner.getFellesperiodeForelder2()
		});
	}
	return perioder;
};
