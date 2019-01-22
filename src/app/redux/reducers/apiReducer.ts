import { AxiosError } from 'axios';
import { ApiActionTypes, ApiActionKeys } from '../actions/api/apiActionDefinitions';
import { TilgjengeligStønadskonto } from '../../types/st\u00F8nadskontoer';

export interface ApiRequest<T> {
    result?: T;
    error?: AxiosError;
    pending?: boolean;
}

export const getDefaultApiState = (): ApiState => ({
    stønadskontoer: {}
});

export interface ApiState {
    stønadskontoer: ApiRequest<TilgjengeligStønadskonto[]>;
}

const apiReducer = (state = getDefaultApiState(), action: ApiActionTypes): ApiState => {
    switch (action.type) {
        case ApiActionKeys.UPDATE_API:
            return {
                ...state,
                ...action.state
            };

        case ApiActionKeys.GET_STONADSKONTOER:
            return {
                ...state,
                stønadskontoer: {
                    pending: true,
                    result: undefined,
                    error: undefined
                }
            };
    }
    return state;
};

export default apiReducer;
