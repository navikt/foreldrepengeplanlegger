import { combineReducers } from 'redux';

import formReducer from './form';

const PlanleggerAppReducer = combineReducers({ form: formReducer });

export default PlanleggerAppReducer;
