import { ApiState } from '../../reducers/apiReducer';
import { History } from 'history';

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
    history: History;
}

export type ApiActionTypes = GetStonadskontoerAction | UpdateApiAction;
