import { takeEvery, all, put, select, call } from 'redux-saga/effects';
import api from '../../api';
import { StønadskontoerDTO, GetTilgjengeligeStønadskontoerParams } from '../../api/types';
import { TilgjengeligStønadskonto, StønadskontoType } from '../../types/st\u00F8nadskontoer';
import { getStønadskontoSortOrder } from '../../utils/st\u00F8nadskontoer';
import { updateApi } from '../actions/api/apiActionCreators';
import {
    CommonActionKeys,
    SubmitSkjemadataAction,
    GetStønadskontoerAction
} from '../actions/common/commonActionDefinitions';
import { setStønadskontoer } from '../actions/common/commonActionCreators';
import { SituasjonSkjemadata } from '../../types';
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

function* getStønadskontoer(params: GetTilgjengeligeStønadskontoerParams) {
    try {
        yield put(updateApi({ stønadskontoer: { pending: true, error: undefined, result: undefined } }));
        const response = yield call(api.getUttakskontoer, params);
        const stønadskontoer: StønadskontoerDTO = response.data;
        const tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[] = Object.keys(stønadskontoer.kontoer).map(
            (konto): TilgjengeligStønadskonto => ({
                stønadskonto: konto as StønadskontoType,
                dager80: stønadskontoer.kontoer[konto].d80,
                dager100: stønadskontoer.kontoer[konto].d100
            })
        );
        yield put(
            updateApi({
                stønadskontoer: {
                    loaded: true,
                    pending: false,
                    result: response.data
                }
            })
        );
        yield put(
            setStønadskontoer(
                tilgjengeligeStønadskontoer.sort(
                    (a: TilgjengeligStønadskonto, b: TilgjengeligStønadskonto) =>
                        getStønadskontoSortOrder(a.stønadskonto) > getStønadskontoSortOrder(b.stønadskonto) ? 1 : -1
                )
            )
        );
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
            action.history.push('/plan');
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
