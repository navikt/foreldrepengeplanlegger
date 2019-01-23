import { AxiosError } from 'axios';
import { ApiActionTypes, ApiActionKeys } from '../actions/api/apiActionDefinitions';
import { GetStønadskontoerDTO } from '../../api/types';

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
    stønadskontoer: ApiRequest<GetStønadskontoerDTO[]>;
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
