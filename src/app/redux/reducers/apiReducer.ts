import { AxiosError } from 'axios';
import { ApiActionTypes, ApiActionKeys } from '../actions/api/apiActionDefinitions';
import { TilgjengeligStønadskonto } from '../../types/st\u00F8nadskontoer';

export interface ApiRequest<T> {
    result?: T;
    error?: AxiosError;
    pending?: boolean;
    loaded?: boolean;
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
    }
    return state;
};

export default apiReducer;
