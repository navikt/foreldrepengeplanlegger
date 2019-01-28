import { AppState } from '../redux/reducers/rootReducer';
import { ApiState } from '../redux/reducers/apiReducer';
import { CommonState } from '../redux/reducers/commonReducer';

const STORAGE_KEY = 'nav-foreldrepengeplanlegger';

export const getStorage = (): AppState | undefined => {
    const data = sessionStorage.getItem(STORAGE_KEY);
    if (data) {
        const skjemadata = JSON.parse(data) as ApiState;
        console.log(skjemadata);
    }
    return undefined;
};

export const setStorage = (state: CommonState): void => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};
