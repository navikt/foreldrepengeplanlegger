import common, { CommonState } from './commonReducer';
import { combineReducers } from 'redux';
import api, { ApiState } from './apiReducer';

interface MainState {
    common: CommonState;
    api: ApiState;
}

export type AppState = MainState;

export default combineReducers({ common, api });
