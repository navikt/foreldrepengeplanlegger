import { takeEvery, all, put, select, call } from 'redux-saga/effects';
import api from '../../api';
import { GetStønadskontoerDTO, GetTilgjengeligeStønadskontoerParams } from '../../api/types';
import { getStønadskontoSortOrder } from '../../utils/kontoUtils';
import { updateApi } from '../actions/api/apiActionCreators';
import {
    CommonActionKeys,
    SubmitSkjemadataAction,
    GetStønadskontoerAction
} from '../actions/common/commonActionDefinitions';
import { setStønadskontoer } from '../actions/common/commonActionCreators';
import { SituasjonSkjemadata, TilgjengeligStønadskonto, StønadskontoType } from '../../types';
import { AppState } from '../reducers/rootReducer';
import situasjonsregler from '../../utils/situasjonsregler';

const getStønadskontoerRequestParams = (
    familiehendelsesdato: Date,
    data: SituasjonSkjemadata
): GetTilgjengeligeStønadskontoerParams => {
    return {
        antallBarn: data.antallBarn,
        erFødsel: true,
        familiehendelsesdato,
        farHarAleneomsorg: situasjonsregler.harFarAleneomsorg(data.situasjon),
        farHarRett: situasjonsregler.harFarRett(data.situasjon),
        morHarAleneomsorg: situasjonsregler.harMorAleneomsorg(data.situasjon),
        morHarRett: situasjonsregler.harMorRett(data.situasjon),
        startdatoUttak: new Date()
    };
};

const stateSelector = (state: AppState) => state;

const sortStønadskonto = (a: TilgjengeligStønadskonto, b: TilgjengeligStønadskonto) =>
    getStønadskontoSortOrder(a.stønadskontoType) > getStønadskontoSortOrder(b.stønadskontoType) ? 1 : -1;

function* getStønadskontoer(params: GetTilgjengeligeStønadskontoerParams) {
    try {
        yield put(updateApi({ stønadskontoer: { pending: true, error: undefined, result: undefined } }));
        const response = yield call(api.getUttakskontoer, params);
        const stønadskontoer: GetStønadskontoerDTO = response.data;
        const kontoer80: TilgjengeligStønadskonto[] = [];
        const kontoer100: TilgjengeligStønadskonto[] = [];
        Object.keys(stønadskontoer.kontoer).forEach((konto) => {
            kontoer80.push({
                dager: stønadskontoer.kontoer[konto].d80,
                stønadskontoType: konto as StønadskontoType
            });
            kontoer100.push({
                dager: stønadskontoer.kontoer[konto].d100,
                stønadskontoType: konto as StønadskontoType
            });
        });
        kontoer80.sort(sortStønadskonto);
        kontoer100.sort(sortStønadskonto);
        yield put(
            updateApi({
                stønadskontoer: {
                    loaded: true,
                    pending: false,
                    result: response.data
                }
            })
        );
        yield put(setStønadskontoer(kontoer80, kontoer100));
    } catch (error) {
        yield put(
            updateApi({
                stønadskontoer: { pending: false, result: undefined, error, loaded: false }
            })
        );
    }
}

function* getStønadskontoerSaga(action: SubmitSkjemadataAction | GetStønadskontoerAction) {
    const appState: AppState = yield select(stateSelector);
    const { skjemadata, familiehendelsesdato } = appState.common;

    if (skjemadata) {
        const params: GetTilgjengeligeStønadskontoerParams = getStønadskontoerRequestParams(
            familiehendelsesdato,
            skjemadata
        );
        try {
            yield call(getStønadskontoer, params);
            // action.history.push('/plan');
        } catch (error) {
            action.history.replace('/');
        }
    } else {
        action.history.replace('/');
    }
}

function* stønadskontoerSaga() {
    yield all([
        takeEvery(CommonActionKeys.GET_STØNADSKONTOER, getStønadskontoerSaga),
        takeEvery(CommonActionKeys.SUBMIT_SKJEMADATA, getStønadskontoerSaga)
    ]);
}

export default stønadskontoerSaga;
