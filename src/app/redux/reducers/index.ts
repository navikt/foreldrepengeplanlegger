import { combineReducers } from 'redux';

import formReducer from './formReducer';
import utsettelseReducer from './utsettelseReducer';

const PlanleggerAppReducer = combineReducers({
	form: formReducer,
	utsettelse: utsettelseReducer
});

export default PlanleggerAppReducer;
