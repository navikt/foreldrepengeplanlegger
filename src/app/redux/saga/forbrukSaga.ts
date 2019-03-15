import { all, put, select, takeLatest } from 'redux-saga/effects';
import { AppState } from '../reducers/rootReducer';
import groupBy from 'lodash.groupby';
import {
    updateForbruk,
    updateTilgjengeligeDager,
    updateOmForeldre,
    setUttaksplanValidering,
    validerUttaksplan
} from '../actions/common/commonActionCreators';
import { CommonActionKeys } from '../actions/common/commonActionDefinitions';
import { selectForbruk, selectTilgjengeligeDager } from '../selectors';
import { getOmForeldre, getAntallForeldreISituasjon } from '../../utils/common';
import { ApiActionKeys } from '../actions/api/apiActionDefinitions';
import { getUttaksdatoer } from '../../utils/uttaksdatoer';
import { Regelgrunnlag, RegelTestresultat } from '../../utils/regler/types';
import { sjekkUttaksplanOppMotRegler, getRegelbrudd } from '../../utils/regler/regelUtils';

const stateSelector = (state: AppState) => state;

function* updateForbrukSaga() {
    const appState: AppState = yield select(stateSelector);
    const { perioder, tilgjengeligeDager } = appState.common;
    if (perioder && tilgjengeligeDager) {
        yield put(updateForbruk(selectForbruk(appState)));
        yield put(validerUttaksplan());
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
        const omForeldre = getOmForeldre(
            skjemadata.situasjon,
            skjemadata.navnMor,
            skjemadata.navnFarMedmor,
            skjemadata.forelderVedAleneomsorg
        );
        yield put(updateOmForeldre(omForeldre));
    }
}
function* validerUttaksplanSaga() {
    const appState: AppState = yield select(stateSelector);
    const { common } = appState;
    const { skjemadata, familiehendelsesdato, perioder, periodeFørTermin, forbruk, tilgjengeligeDager } = common;

    if (skjemadata) {
        const regelgrunnlag: Regelgrunnlag = {
            erDeltOmsorg: getAntallForeldreISituasjon(skjemadata.situasjon) === 2,
            forelderVedAleneomsorg: skjemadata.forelderVedAleneomsorg,
            familiehendelsesdato,
            periodeFørTermin,
            perioder,
            situasjon: skjemadata.situasjon,
            uttaksdatoer: getUttaksdatoer(familiehendelsesdato),
            navnMor: skjemadata.navnMor,
            navnFarMedmor: skjemadata.navnFarMedmor,
            forbruk,
            tilgjengeligeDager,
            antallBarn: skjemadata.antallBarn
        };
        const resultat = sjekkUttaksplanOppMotRegler(regelgrunnlag);
        const feil = resultat.filter(
            (r) => r.passerer === false && r.regelbrudd && r.regelbrudd.periodeId !== undefined
        );
        const resultatPerPeriode = groupBy(feil, (r: RegelTestresultat) => r.regelbrudd!.periodeId);
        const regelbrudd = getRegelbrudd(resultat);
        yield put(setUttaksplanValidering({ resultat, resultatPerPeriode, regelbrudd }));
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
                CommonActionKeys.NY_PERIODE_CHANGE,
                CommonActionKeys.RESET_PLAN,
                CommonActionKeys.LAG_FORSLAG_TIL_PLAN
            ],
            updateForbrukSaga
        )
    ]);
    yield all([
        takeLatest([CommonActionKeys.VALIDER_UTTAKSPLAN, CommonActionKeys.SET_DEKNINGSGRAD], validerUttaksplanSaga)
    ]);

    yield all([
        takeLatest(
            [CommonActionKeys.SUBMIT_SKJEMADATA, CommonActionKeys.APPLY_STORAGE, ApiActionKeys.UPDATE_API],
            updateOmForeldreSaga
        )
    ]);
}

export default forbrukSaga;
