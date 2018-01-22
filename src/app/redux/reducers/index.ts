import { combineReducers } from 'redux';
import form, { FormState } from './form';

export interface AppState {
	form: FormState;
}

const PlanleggerAppReducer = combineReducers({ form });

export default PlanleggerAppReducer;
