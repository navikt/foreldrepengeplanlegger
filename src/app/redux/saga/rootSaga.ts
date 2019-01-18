import { all } from 'redux-saga/effects';

import uttakSaga from './uttakSaga';

export default function* rootSaga() {
    yield all([uttakSaga()]);
}
