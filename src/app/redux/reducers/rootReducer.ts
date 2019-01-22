import common, { CommonState } from './commonReducer';
import { combineReducers } from 'redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { History } from 'history';

interface MainState {
    router: ConnectedRouter;
    common: CommonState;
}

export type AppState = MainState;

export default (history: History) => combineReducers({ common, router: connectRouter(history) });
