import { takeEvery, all, put, select } from 'redux-saga/effects';
import { AppState } from '../reducers/rootReducer';
import { updateForbruk, updateTilgjengeligeDager, updateOmForeldre } from '../actions/common/commonActionCreators';
import { CommonActionKeys } from '../actions/common/commonActionDefinitions';
import { selectForbruk, selectTilgjengeligeDager } from '../selectors';
import { getInformasjonOmForeldre } from '../../utils/common';
import { ApiActionKeys } from '../actions/api/apiActionDefinitions';

const stateSelector = (state: AppState) => state;

function* updateForbrukSaga() {
    const appState: AppState = yield select(stateSelector);
    const { perioder, tilgjengeligeDager } = appState.common;
    if (perioder && tilgjengeligeDager) {
        yield put(updateForbruk(selectForbruk(appState)));
    }
}

function* updateTilgjengeligeDagerSaga() {
    const appState: AppState = yield select(stateSelector);
    yield put(updateTilgjengeligeDager(selectTilgjengeligeDager(appState)));
}

function* updateOmForeldreSaga() {
    const appState: AppState = yield select(stateSelector);
    const { skjemadata } = appState.common;
    if (skjemadata) {
        const omForeldre = getInformasjonOmForeldre(
            skjemadata.situasjon,
            skjemadata.navnForelder1,
            skjemadata.navnForelder2
        );
        yield put(updateOmForeldre(omForeldre));
    }
}

function* forbrukSaga() {
    yield all([takeEvery(CommonActionKeys.SET_DEKNINGSGRAD, updateTilgjengeligeDagerSaga)]);
    yield all([takeEvery(CommonActionKeys.SET_STØNADSKONTOER, updateTilgjengeligeDagerSaga)]);
    yield all([takeEvery(CommonActionKeys.SET_STØNADSKONTOER, updateForbrukSaga)]);
    yield all([takeEvery(CommonActionKeys.UPDATE_TILGJENGELIGE_DAGER, updateForbrukSaga)]);
    yield all([takeEvery(CommonActionKeys.SET_PERIODER, updateForbrukSaga)]);
    yield all([takeEvery(CommonActionKeys.ADD_PERIODE, updateForbrukSaga)]);
    yield all([takeEvery(CommonActionKeys.UPDATE_PERIODE, updateForbrukSaga)]);
    yield all([takeEvery(CommonActionKeys.REMOVE_PERIODE, updateForbrukSaga)]);
    yield all([takeEvery(CommonActionKeys.MOVE_PERIODE, updateForbrukSaga)]);
    yield all([takeEvery(CommonActionKeys.SUBMIT_SKJEMADATA, updateOmForeldreSaga)]);
    yield all([takeEvery(CommonActionKeys.APPLY_STORAGE, updateOmForeldreSaga)]);
    yield all([takeEvery(ApiActionKeys.UPDATE_API, updateOmForeldreSaga)]);
}

export default forbrukSaga;
