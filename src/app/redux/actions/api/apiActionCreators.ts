import { ApiActionTypes, ApiActionKeys } from './apiActionDefinitions';
import { ApiState } from '../../reducers/apiReducer';

export function updateApi(state: Partial<ApiState>): ApiActionTypes {
    return {
        type: ApiActionKeys.UPDATE_API,
        state
    };
}

export function getStønadskontoer(): ApiActionTypes {
    return {
        type: ApiActionKeys.GET_STONADSKONTOER
    };
}
