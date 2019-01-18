import { ApiActionTypes, ApiActionKeys } from './apiActionDefinitions';
import { ApiState } from '../../reducers/apiReducer';
import { GetTilgjengeligeStønadskontoerParams } from '../../../api/types';

export function updateApi(state: Partial<ApiState>): ApiActionTypes {
    return {
        type: ApiActionKeys.UPDATE_API,
        state
    };
}

export function getStønadskontoer(params: GetTilgjengeligeStønadskontoerParams): ApiActionTypes {
    return {
        type: ApiActionKeys.GET_STONADSKONTOER,
        params
    };
}
