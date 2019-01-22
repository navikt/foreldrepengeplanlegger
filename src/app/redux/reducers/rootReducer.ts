import common, { CommonState } from './commonReducer';
import { combineReducers } from 'redux';

interface MainState {
    common: CommonState;
}

export type AppState = MainState;

export default combineReducers({ common });
