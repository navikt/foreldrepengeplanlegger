import { takeEvery, all, put, call } from 'redux-saga/effects';
import api from '../../api';
import { ApiActionKeys, GetStonadskontoerAction } from '../actions/api/apiActionDefinitions';
import { StønadskontoerDTO } from '../../api/types';
import { TilgjengeligStønadskonto, StønadskontoType } from '../../types/st\u00F8nadskontoer';
import { getStønadskontoSortOrder } from '../../utils/st\u00F8nadskontoer';
import { updateApi } from '../actions/api/apiActionCreators';

function* getStønadskontoerSaga(action: GetStonadskontoerAction) {
    try {
        yield put(updateApi({ stønadskontoer: { pending: true, error: undefined, result: undefined } }));
        const response = yield call(api.getUttakskontoer, action.params);
        const stønadskontoer: StønadskontoerDTO = response.data;
        const tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[] = [];
        Object.keys(stønadskontoer.kontoer).map((konto) => {
            tilgjengeligeStønadskontoer.push({
                konto: konto as StønadskontoType,
                dager: stønadskontoer.kontoer[konto]
            });
        });
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
    yield all([takeEvery(ApiActionKeys.GET_STONADSKONTOER, getStønadskontoerSaga)]);
}

export default uttakSaga;
