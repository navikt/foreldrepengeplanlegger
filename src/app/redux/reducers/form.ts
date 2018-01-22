import { Dekningsgrad } from '../../types';
import { PlanleggerActionTypes, PlanleggerActionTypeKeys } from '../actionTypes';

export interface FormInput {
	key: string;
	value: string;
	savedValue: string;
}

export interface FormState {
	navnForelder1?: string;
	navnForelder2?: string;
	termindato?: Date;
	dagerForelder1r?: number;
	dagerForelder2?: number;
	dekningsgrad?: Dekningsgrad;
}

const defaultState: FormState = {
	navnForelder1: '',
	navnForelder2: ''
};

const FormReducer = (state = defaultState, action: PlanleggerActionTypes) => {
	switch (action.type) {
		case PlanleggerActionTypeKeys.SET_NAVN_FORELDER1:
			return { ...state, navnForelder1: action.navn };
		case PlanleggerActionTypeKeys.SET_NAVN_FORELDER2:
			return { ...state, navnForelder2: action.navn };
		case PlanleggerActionTypeKeys.SET_TERMINDATO:
			return { ...state, termindato: action.termindato };
		default:
			return state;
	}
};

export default FormReducer;
