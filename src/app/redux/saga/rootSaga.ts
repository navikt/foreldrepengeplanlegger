import { all } from 'redux-saga/effects';

import stønadskontoerSaga from './stønadskontoerSaga';

export default function*() {
    yield all([stønadskontoerSaga()]);
}
