import { combineReducers } from 'redux';
import formReducer, { FormState } from './form';

export interface AppState {
	form: FormState;
}

const PlanleggerAppReducer = combineReducers({ formReducer });

export default PlanleggerAppReducer;
