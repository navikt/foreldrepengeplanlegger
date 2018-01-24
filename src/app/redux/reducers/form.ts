import { PlanleggerActionTypes, PlanleggerActionTypeKeys } from 'app/redux/actions/actionTypes';
import { getUkerFellesperiode } from 'app/utils/tidsberegninger';
import { grunndata } from 'app/data/grunndata';
import { FormState } from '../types';

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
