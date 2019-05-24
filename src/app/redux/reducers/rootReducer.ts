import common, { CommonState } from './commonReducer';
import undoable, { StateWithHistory } from 'redux-undo';
import { combineReducers, Action } from 'redux';
import api, { ApiState } from './apiReducer';
import { CommonActionTypes, CommonActionKeys } from '../actions/common/commonActionDefinitions';

interface MainState {
    common: StateWithHistory<CommonState>;
    api: ApiState;
}

export type AppState = MainState;

const undoFilterFunc = (action: CommonActionTypes) => {
    switch (action.type) {
        case CommonActionKeys.UPDATE_PERIODE:
        case CommonActionKeys.ADD_PERIODE:
        case CommonActionKeys.REMOVE_PERIODE:
        case CommonActionKeys.SLÅ_SAMMEN_PERIODER:
        case CommonActionKeys.RESET_PLAN:
            return true;
    }
    return false;
};

export default combineReducers({
    common: undoable(common, {
        limit: 20,
        filter: (action: Action) => {
            return undoFilterFunc(action);
        }
    }),
    api
});
