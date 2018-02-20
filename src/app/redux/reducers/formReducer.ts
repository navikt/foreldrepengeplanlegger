import {
	PlanleggerActionTypes,
	PlanleggerActionTypeKeys
} from 'app/redux/actions/actionTypes';
import { grunnfordeling } from 'app/data/grunnfordeling';
import { FormState } from '../types';
import { getAntallUkerFellesperiode } from 'app/utils/periodeUtils';
import { normaliserDato } from 'app/utils';
import { FellesperiodeFordeling } from 'app/types';

const getDefaultState = (): FormState => {
	const ukerFellesperiode = getAntallUkerFellesperiode(grunnfordeling, '100%');
	const ukerForelder1 = Math.round(ukerFellesperiode / 2);
	const ukerForelder2 = ukerFellesperiode - ukerForelder1;

	return {
		termindato: new Date(),
		navnForelder1: undefined,
		navnForelder2: undefined,
		dekningsgrad: '100%',
		ukerFellesperiode,
		fellesperiodeukerForelder1: ukerForelder1,
		fellesperiodeukerForelder2: ukerForelder2,
		grunnfordeling
	};
};

const beregnUkerForelder2 = (
	ukerFellesperiode: number | undefined,
	ukerForelder1: number | undefined
): number => (ukerFellesperiode ? ukerFellesperiode - (ukerForelder1 || 0) : 0);

export const refordelFellesperiode = (
	ukerFellesperiode: number,
	nesteUkerFellesperiode: number,
	ukerForelder1: number
): FellesperiodeFordeling => {
	const diff = (nesteUkerFellesperiode - (ukerFellesperiode || 0)) / 2;
	let nyUkerForelder1 = Math.max(ukerForelder1 + diff, 0);
	return {
		ukerForelder1: nyUkerForelder1,
		ukerForelder2: beregnUkerForelder2(nesteUkerFellesperiode, nyUkerForelder1)
	};
};

const FormReducer = (
	state = getDefaultState(),
	action: PlanleggerActionTypes
): FormState => {
	switch (action.type) {
		case PlanleggerActionTypeKeys.SET_NAVN_FORELDER1:
			return { ...state, navnForelder1: action.navn };
		case PlanleggerActionTypeKeys.SET_NAVN_FORELDER2:
			return { ...state, navnForelder2: action.navn };
		case PlanleggerActionTypeKeys.SET_TERMINDATO:
			return { ...state, termindato: normaliserDato(action.termindato) };
		case PlanleggerActionTypeKeys.SETT_DEKNINGSGRAD:
			if (!action.dekningsgrad) {
				return state;
			}
			const ukerFellesperiode = getAntallUkerFellesperiode(
				grunnfordeling,
				state.dekningsgrad
			);
			const nesteUkerFellesperiode = getAntallUkerFellesperiode(
				grunnfordeling,
				action.dekningsgrad
			);
			const { ukerForelder1, ukerForelder2 } = refordelFellesperiode(
				ukerFellesperiode,
				nesteUkerFellesperiode,
				state.fellesperiodeukerForelder1
			);
			return {
				...state,
				dekningsgrad: action.dekningsgrad,
				ukerFellesperiode: nesteUkerFellesperiode,
				fellesperiodeukerForelder1: ukerForelder1,
				fellesperiodeukerForelder2: ukerForelder2
			};
		case PlanleggerActionTypeKeys.SET_UKER_FORELDER1:
			return {
				...state,
				fellesperiodeukerForelder1: action.uker,
				fellesperiodeukerForelder2: beregnUkerForelder2(
					state.ukerFellesperiode,
					action.uker
				)
			};
		default:
			return state;
	}
};

export default FormReducer;
