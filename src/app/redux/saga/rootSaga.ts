import { all } from 'redux-saga/effects';

import stønadskontoerSaga from './stønadskontoerSaga';
import forbrukSaga from './forbrukSaga';

export default function*() {
    yield all([stønadskontoerSaga(), forbrukSaga()]);
}
