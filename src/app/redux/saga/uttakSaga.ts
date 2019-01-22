import { takeEvery, all, put, select, call } from 'redux-saga/effects';
import api from '../../api';
import { StønadskontoerDTO, GetTilgjengeligeStønadskontoerParams } from '../../api/types';
import { TilgjengeligStønadskonto, StønadskontoType } from '../../types/st\u00F8nadskontoer';
import { getStønadskontoSortOrder } from '../../utils/st\u00F8nadskontoer';
import { updateApi } from '../actions/api/apiActionCreators';
import { CommonActionKeys, SubmitSkjemadataAction } from '../actions/common/commonActionDefinitions';
import { SituasjonSkjemadata } from '../../types';
import { AppState } from '../reducers';
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

function* getStønadskontoerSaga(action: SubmitSkjemadataAction) {
    try {
        const appState: AppState = yield select(stateSelector);
        const { familiehendelsesdato } = appState.common;

        const params: GetTilgjengeligeStønadskontoerParams = getStønadskontoerRequestParams(
            familiehendelsesdato,
            action.data
        );
        yield put(updateApi({ stønadskontoer: { pending: true, error: undefined, result: undefined } }));
        const response = yield call(api.getUttakskontoer, params);
        const stønadskontoer: StønadskontoerDTO = response.data;
        const tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[] = Object.keys(stønadskontoer.kontoer).map(
            (konto) => ({
                konto: konto as StønadskontoType,
                dager80: stønadskontoer.kontoer[konto].d80,
                dager100: stønadskontoer.kontoer[konto].d100
            })
        );
        yield put(
            updateApi({
                stønadskontoer: {
                    pending: false,
                    result: tilgjengeligeStønadskontoer.sort(
                        (a: TilgjengeligStønadskonto, b: TilgjengeligStønadskonto) =>
                            getStønadskontoSortOrder(a.konto) > getStønadskontoSortOrder(b.konto) ? 1 : -1
                    )
                }
            })
        );
    } catch (error) {
        yield put(
            updateApi({
                stønadskontoer: { pending: false, result: undefined, error }
            })
        );
    }
}

function* uttakSaga() {
    yield all([takeEvery(CommonActionKeys.SUBMIT_SKJEMADATA, getStønadskontoerSaga)]);
}

export default uttakSaga;
