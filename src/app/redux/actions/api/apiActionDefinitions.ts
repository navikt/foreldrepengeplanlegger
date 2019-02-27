import { ApiState } from '../../reducers/apiReducer';

export enum ApiActionKeys {
    'UPDATE_API' = 'updateApi',
    'GET_STONADSKONTOER' = 'getStonadskontoer'
}

export interface UpdateApiAction {
    type: ApiActionKeys.UPDATE_API;
    state: Partial<ApiState>;
}

export interface GetStonadskontoerAction {
    type: ApiActionKeys.GET_STONADSKONTOER;
}

export type ApiActionTypes = GetStonadskontoerAction | UpdateApiAction;
