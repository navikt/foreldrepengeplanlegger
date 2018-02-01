import { PlanleggerActionTypes, PlanleggerActionTypeKeys } from 'app/redux/actions/actionTypes';
import { grunnfordeling } from 'app/data/grunnfordeling';
import { FormState } from '../types';
import { getAntallUkerFellesperiode } from 'app/utils/periodeUtils';

const getDefaultState = (): FormState => {
	const ukerFellesperiode = getAntallUkerFellesperiode(grunnfordeling, '100%');
	const ukerForelder1 = Math.round(ukerFellesperiode / 2);
	const ukerForelder2 = ukerFellesperiode - ukerForelder1;

	return {
		termindato: new Date(),
		navnForelder1: 'Kari',
		navnForelder2: 'Ola',
		dekningsgrad: '100%',
		ukerFellesperiode,
		ukerForelder1,
		ukerForelder2,
		grunnfordeling
	};
};

const beregnUkerForelder2 = (ukerFellesperiode: number | undefined, ukerForelder1: number | undefined): number =>
	ukerFellesperiode ? ukerFellesperiode - (ukerForelder1 || 0) : 0;

const refordelFellesperiode = (
	nesteUkerFellesperiode: number | undefined,
	ukerFellesperiode: number | undefined,
	ukerForelder1: number | undefined
) => {
	if (!ukerFellesperiode || !nesteUkerFellesperiode || !ukerForelder1) {
		return {
			ukerForelder1: 0,
			ukerForelder2: 0
		};
	}
	const diff = (nesteUkerFellesperiode - (ukerFellesperiode || 0)) / 2;
	let nyUkerForelder1 = Math.max(ukerForelder1 + diff, 0);
	return {
		ukerForelder1: nyUkerForelder1,
		ukerForelder2: beregnUkerForelder2(ukerFellesperiode, nyUkerForelder1)
	};
};

const FormReducer = (state = getDefaultState(), action: PlanleggerActionTypes) => {
	switch (action.type) {
		case PlanleggerActionTypeKeys.SET_NAVN_FORELDER1:
			return { ...state, navnForelder1: action.navn };
		case PlanleggerActionTypeKeys.SET_NAVN_FORELDER2:
			return { ...state, navnForelder2: action.navn };
		case PlanleggerActionTypeKeys.SET_TERMINDATO:
			return { ...state, termindato: action.termindato };
		case PlanleggerActionTypeKeys.SETT_DEKNINGSGRAD:
			const ukerFellesperiode = getAntallUkerFellesperiode(grunnfordeling, action.dekningsgrad);
			const { ukerForelder1, ukerForelder2 } = refordelFellesperiode(
				ukerFellesperiode,
				ukerFellesperiode,
				state.ukerForelder1
			);
			return {
				...state,
				dekningsgrad: action.dekningsgrad,
				ukerFellesperiode: ukerFellesperiode,
				ukerForelder1,
				ukerForelder2
			};
		case PlanleggerActionTypeKeys.SET_UKER_FORELDER1:
			return {
				...state,
				ukerForelder1: action.uker,
				ukerForelder2: beregnUkerForelder2(state.ukerFellesperiode, action.uker)
			};
		default:
			return state;
	}
};

export default FormReducer;
