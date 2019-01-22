import { ApiActionTypes, ApiActionKeys } from './apiActionDefinitions';
import { ApiState } from '../../reducers/apiReducer';
import { History } from 'history';

export function updateApi(state: Partial<ApiState>): ApiActionTypes {
    return {
        type: ApiActionKeys.UPDATE_API,
        state
    };
}

export function getStønadskontoer(history: History): ApiActionTypes {
    return {
        type: ApiActionKeys.GET_STONADSKONTOER,
        history
    };
}
