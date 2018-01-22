import { Dekningsgrad } from '../../types';
import { PlanleggerActionTypes, PlanleggerActionTypeKeys } from '../actionTypes';
import { getDagerTotaltFromDekningsgrad } from '../../utils/tidsberegninger';

export interface FormInput {
	key: string;
	value: string;
	savedValue: string;
}

export interface FormState {
	navnForelder1?: string;
	navnForelder2?: string;
	termindato?: Date;
	dagerForelder1?: number;
	dagerForelder2?: number;
	dekningsgrad?: Dekningsgrad;
	dagerTilFordeling: number;
}

const initAntallDagerTilFordeling = getDagerTotaltFromDekningsgrad('80%');

const defaultState: FormState = {
	navnForelder1: '',
	navnForelder2: '',
	dagerTilFordeling: initAntallDagerTilFordeling,
	dagerForelder1: Math.round(initAntallDagerTilFordeling / 2)
};

const FormReducer = (state = defaultState, action: PlanleggerActionTypes) => {
	switch (action.type) {
		case PlanleggerActionTypeKeys.SET_NAVN_FORELDER1:
			return { ...state, navnForelder1: action.navn };
		case PlanleggerActionTypeKeys.SET_NAVN_FORELDER2:
			return { ...state, navnForelder2: action.navn };
		case PlanleggerActionTypeKeys.SET_TERMINDATO:
			return { ...state, termindato: action.termindato };
		case PlanleggerActionTypeKeys.SET_DAGER_FORELDER1:
			return {
				...state,
				dagerForelder1: action.dager,
				dagerForelder2: getDagerTotaltFromDekningsgrad(state.dekningsgrad) - action.dager
			};
		default:
			return state;
	}
};

export default FormReducer;
