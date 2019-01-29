import { takeEvery, all, put, select } from 'redux-saga/effects';
import { AppState } from '../reducers/rootReducer';
import { updateForbruk } from '../actions/common/commonActionCreators';
import { CommonActionKeys } from '../actions/common/commonActionDefinitions';
import { selectForbruk } from '../selectors/forbrukSelector';
const stateSelector = (state: AppState) => state;

function* updateForbrukSaga() {
    const appState: AppState = yield select(stateSelector);
    const { perioder, tilgjengeligeDager } = appState.common;
    if (perioder && tilgjengeligeDager) {
        yield put(updateForbruk(selectForbruk(appState)));
    }
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
