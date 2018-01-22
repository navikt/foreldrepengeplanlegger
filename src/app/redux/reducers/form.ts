import { Dekningsgrad, Grunndata } from '../../types';
import { PlanleggerActionTypes, PlanleggerActionTypeKeys } from '../actionTypes';
import { getUkerFellesperiode } from '../../utils/tidsberegninger';

import { grunndata } from '../../data/grunndata';

export interface FormInput {
	key: string;
	value: string;
	savedValue: string;
}

export interface FormState {
	navnForelder1?: string;
	navnForelder2?: string;
	termindato?: Date;
	ukerForelder1?: number;
	ukerForelder2?: number;
	dekningsgrad?: Dekningsgrad;
	ukerFellesperiode: number;
	grunndata: Grunndata;
}

const antallUkerFellesperiode = getUkerFellesperiode(grunndata, '80%');

const defaultState: FormState = {
	navnForelder1: '',
	navnForelder2: '',
	ukerFellesperiode: antallUkerFellesperiode,
	ukerForelder1: Math.round(antallUkerFellesperiode / 2),
	grunndata
};

const FormReducer = (state = defaultState, action: PlanleggerActionTypes) => {
	switch (action.type) {
		case PlanleggerActionTypeKeys.SET_NAVN_FORELDER1:
			return { ...state, navnForelder1: action.navn };
		case PlanleggerActionTypeKeys.SET_NAVN_FORELDER2:
			return { ...state, navnForelder2: action.navn };
		case PlanleggerActionTypeKeys.SET_TERMINDATO:
			return { ...state, termindato: action.termindato };
		case PlanleggerActionTypeKeys.SETT_DEKNINGSGRAD:
			return {
				...state,
				dekningsgrad: action.dekningsgrad,
				ukerFellesperiode: getUkerFellesperiode(grunndata, action.dekningsgrad)
			};
		case PlanleggerActionTypeKeys.SET_UKER_FORELDER1:
			return {
				...state,
				ukerForelder1: action.uker,
				ukerForelder2: state.ukerFellesperiode - action.uker
			};
		default:
			return state;
	}
};

export default FormReducer;
