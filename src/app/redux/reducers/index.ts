import { combineReducers } from 'redux';

import formReducer from './form';
import utsettelseReducer from './utsettelse';

const PlanleggerAppReducer = combineReducers({ form: formReducer, utsettelse: utsettelseReducer });

export default PlanleggerAppReducer;
