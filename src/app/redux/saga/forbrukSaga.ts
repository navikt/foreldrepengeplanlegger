import { all, put, select, takeLatest } from 'redux-saga/effects';
import { AppState } from '../reducers/rootReducer';
import {
    updateForbruk,
    updateTilgjengeligeDager,
    updateOmForeldre,
    setUttaksplanValidering
} from '../actions/common/commonActionCreators';
import { CommonActionKeys } from '../actions/common/commonActionDefinitions';
import { selectForbruk, selectTilgjengeligeDager } from '../selectors';
import { getInformasjonOmForeldre } from '../../utils/common';
import { ApiActionKeys } from '../actions/api/apiActionDefinitions';
import { getUttaksdatoer } from '../../utils/uttaksdatoer';
import groupBy from 'lodash.groupby';
import { Regelgrunnlag, RegelTestresultat } from '../../utils/regler/types';
import { sjekkUttaksplanOppMotRegler } from '../../utils/regler/regelUtils';

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

function* validerUttaksplan() {
    const appState: AppState = yield select(stateSelector);
    const { common } = appState;
    const { skjemadata, familiehendelsesdato, perioder, periodeFørTermin } = common;

    if (skjemadata) {
        const regelgrunnlag: Regelgrunnlag = {
            erMor: skjemadata.erMor === true,
            familiehendelsesdato,
            periodeFørTermin,
            perioder,
            situasjon: skjemadata.situasjon,
            uttaksdatoer: getUttaksdatoer(familiehendelsesdato)
        };
        const resultat = sjekkUttaksplanOppMotRegler(regelgrunnlag);
        const feil = resultat.filter(
            (r) => r.passerer === false && r.regelbrudd && r.regelbrudd.periodeId !== undefined
        );
        const resultatPerPeriode = groupBy(feil, (r: RegelTestresultat) => r.regelbrudd!.periodeId);
        yield put(setUttaksplanValidering({ resultat, resultatPerPeriode }));
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
                CommonActionKeys.SET_UTTAKSDAGER_FØR_TERMIN,
                CommonActionKeys.SET_ØNSKET_FORDELING,
                CommonActionKeys.UPDATE_TILGJENGELIGE_DAGER,
                CommonActionKeys.SET_PERIODER,
                CommonActionKeys.ADD_PERIODE,
                CommonActionKeys.UPDATE_PERIODE,
                CommonActionKeys.REMOVE_PERIODE,
                CommonActionKeys.MOVE_PERIODE,
                CommonActionKeys.NY_PERIODE_CHANGE
            ],
            updateForbrukSaga
        )
    ]);
    yield all([
        takeLatest(
            [
                CommonActionKeys.SET_STØNADSKONTOER,
                CommonActionKeys.SET_UTTAKSDAGER_FØR_TERMIN,
                CommonActionKeys.SET_ØNSKET_FORDELING,
                CommonActionKeys.UPDATE_TILGJENGELIGE_DAGER,
                CommonActionKeys.SET_PERIODER,
                CommonActionKeys.ADD_PERIODE,
                CommonActionKeys.UPDATE_PERIODE,
                CommonActionKeys.REMOVE_PERIODE,
                CommonActionKeys.MOVE_PERIODE
            ],
            validerUttaksplan
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
