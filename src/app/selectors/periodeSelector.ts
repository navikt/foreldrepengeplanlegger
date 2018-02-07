import { createSelector } from 'reselect';
import { AppState, FormState } from 'app/redux/types';
import {
	Utsettelsesperiode,
	Periode,
	Stonadsperiode,
	Dekningsgrad,
	Grunnfordeling,
	Periodetype,
	StonadskontoType,
	SammenslattPeriode
} from 'app/types';
import { sorterPerioder, leggUtsettelserTilPerioder } from 'app/utils/periodeUtils';
import Periodeberegner from 'app/utils/Periodeberegner';

const formSelector = (state: AppState) => state.form;
const utsettelseSelector = (state: AppState) => state.utsettelse.utsettelser;

/**
 * Henter ut sortert liste med alle stønadsperioder basert på formState
 */
export const getStonadsperioder = createSelector(formSelector, (form: FormState): Stonadsperiode[] => {
	if (!form.termindato || !form.dekningsgrad) {
		return [];
	}
	return opprettStonadsperioder(
		form.termindato,
		form.dekningsgrad,
		form.grunnfordeling,
		form.ukerForelder1 || 0,
		form.ukerForelder2 || 0
	).sort(sorterPerioder);
});

/**
 * Henter ut alle perioder gitt formState og utsettelser
 */
export const getPerioderMedUtsettelser = createSelector(
	getStonadsperioder,
	utsettelseSelector,
	(stonadsperioder: Stonadsperiode[], utsettelser: Utsettelsesperiode[]): Periode[] => {
		return leggUtsettelserTilPerioder(stonadsperioder, utsettelser);
	}
);

/**
 * Returnerer liste hvor påfølgende perioder med samme forelder er slått sammen til en periode
 * Perioder før termin vil ikke blir slått sammen
 */
export const getPerioderForTidslinje = createSelector(
	getStonadsperioder,
	utsettelseSelector,
	(perioder: Stonadsperiode[], utsettelser: Utsettelsesperiode[]): Periode[] => {
		const liste: (Stonadsperiode | SammenslattPeriode)[] = [];
		let stonadsperioderSammeForelder: Stonadsperiode[] = [];
		perioder.forEach((p, index) => {
			const forrige = stonadsperioderSammeForelder[stonadsperioderSammeForelder.length - 1];
			if (!forrige || p.forelder === forrige.forelder) {
				stonadsperioderSammeForelder.push(p);
			} else {
				if (stonadsperioderSammeForelder.length === 1) {
					liste.push(forrige);
				} else {
					liste.push(lagSammenslattPeriode(stonadsperioderSammeForelder));
				}
				stonadsperioderSammeForelder = [p];
			}
		});
		if (stonadsperioderSammeForelder.length === 1) {
			liste.push(stonadsperioderSammeForelder[0]);
		} else if (stonadsperioderSammeForelder.length > 1) {
			liste.push(lagSammenslattPeriode(stonadsperioderSammeForelder));
		}
		return leggUtsettelserTilPerioder(liste, utsettelser);
	}
);

const lagSammenslattPeriode = (perioder: Stonadsperiode[]): SammenslattPeriode => ({
	type: Periodetype.SammenslattPeriode,
	forelder: perioder[0].forelder,
	tidsperiode: {
		startdato: perioder[0].tidsperiode.startdato,
		sluttdato: perioder[perioder.length - 1].tidsperiode.sluttdato
	},
	perioder: perioder.map((sp) => sp)
});

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
const opprettStonadsperioder = (
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
			konto: StonadskontoType.ForeldrepengerForFodsel,
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
