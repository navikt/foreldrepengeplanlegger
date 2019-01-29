import { takeEvery, all, put, select } from 'redux-saga/effects';
import { AppState } from '../reducers/rootReducer';
import { getForbruk } from '../../utils/forbrukUtils';
import { updateForbruk } from '../actions/common/commonActionCreators';
import { Forelder } from '../../types';
import { CommonActionKeys } from '../actions/common/commonActionDefinitions';
const stateSelector = (state: AppState) => state;

function* updateForbrukSaga() {
    const appState: AppState = yield select(stateSelector);
    const forbruk = getForbruk(appState.common.perioder);
    yield put(
        updateForbruk({
            forelder1: forbruk[Forelder.forelder1],
            forelder2: forbruk[Forelder.forelder2]
        })
    );
}

function* forbrukSaga() {
    yield all([takeEvery(CommonActionKeys.SET_STØNADSKONTOER, updateForbrukSaga)]);
    yield all([takeEvery(CommonActionKeys.SET_PERIODER, updateForbrukSaga)]);
    yield all([takeEvery(CommonActionKeys.ADD_PERIODE, updateForbrukSaga)]);
    yield all([takeEvery(CommonActionKeys.UPDATE_PERIODE, updateForbrukSaga)]);
    yield all([takeEvery(CommonActionKeys.REMOVE_PERIODE, updateForbrukSaga)]);
    yield all([takeEvery(CommonActionKeys.MOVE_PERIODE, updateForbrukSaga)]);
}

export default forbrukSaga;
