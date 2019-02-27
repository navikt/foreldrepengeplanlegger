import { takeEvery, all, put } from 'redux-saga/effects';
import {
    CommonActionKeys,
    NavigerTilSideAction,
    SubmitSkjemadataAction
} from '../actions/common/commonActionDefinitions';
import { AppRoutes, Side } from '../../routes';
import { getStønadskontoer } from '../actions/api/apiActionCreators';
import { navigerTilSide } from '../actions/common/commonActionCreators';

function navigerTilSideSaga(action: NavigerTilSideAction) {
    const { history, side } = action;
    switch (side) {
        case Side.DEKNINGSGRAD:
            history.push(AppRoutes.dekningsgradside);
            return;
        case Side.UTTAKSPLAN:
            history.push(AppRoutes.uttaksplanside);
            return;
        default:
            history.push(AppRoutes.startside);
    }
}

function* submitSkjemadataSaga(action: SubmitSkjemadataAction) {
    yield put(getStønadskontoer());
    yield put(navigerTilSide(Side.DEKNINGSGRAD, action.history));
}

function* stønadskontoerSaga() {
    yield all([takeEvery(CommonActionKeys.SUBMIT_SKJEMADATA, submitSkjemadataSaga)]);
    yield all([takeEvery(CommonActionKeys.NAVIGER_TIL_SIDE, navigerTilSideSaga)]);
}

export default stønadskontoerSaga;
