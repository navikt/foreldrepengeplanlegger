import { CommonState } from '../redux/reducers/commonReducer';
import { storageParser } from './parser';

const STORAGE_KEY = 'nav-foreldrepengeplanlegger';

export const getStorage = (): CommonState | undefined => {
    const data = sessionStorage.getItem(STORAGE_KEY);
    return data ? (storageParser(data) as CommonState) : undefined;
};

export const setStorage = (state: CommonState): void => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};
