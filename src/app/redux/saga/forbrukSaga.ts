import { all, put, select, takeLatest } from 'redux-saga/effects';
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
        const omForeldre = getInformasjonOmForeldre(skjemadata.situasjon, skjemadata.navnMor, skjemadata.navnFarMedmor);
        yield put(updateOmForeldre(omForeldre));
    }
}

function* forbrukSaga() {
    yield all([
        takeLatest(
            [CommonActionKeys.SET_DEKNINGSGRAD, CommonActionKeys.SET_STØNADSKONTOER],
            updateTilgjengeligeDagerSaga
        )
    ]);
    yield all([
        takeLatest(
            [
                CommonActionKeys.SET_STØNADSKONTOER,
                CommonActionKeys.SET_ØNSKET_FORDELING,
                CommonActionKeys.UPDATE_TILGJENGELIGE_DAGER,
                CommonActionKeys.SET_PERIODER,
                CommonActionKeys.ADD_PERIODE,
                CommonActionKeys.UPDATE_PERIODE,
                CommonActionKeys.REMOVE_PERIODE,
                CommonActionKeys.MOVE_PERIODE
            ],
            updateForbrukSaga
        )
    ]);
    yield all([
        takeLatest(
            [CommonActionKeys.SUBMIT_SKJEMADATA, CommonActionKeys.APPLY_STORAGE, ApiActionKeys.UPDATE_API],
            updateOmForeldreSaga
        )
    ]);
}

export default forbrukSaga;
