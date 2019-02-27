import { all } from 'redux-saga/effects';

import stønadskontoerSaga from './stønadskontoerSaga';
import forbrukSaga from './forbrukSaga';
import navigasjonSaga from './navigasjonSaga';

export default function*() {
    yield all([stønadskontoerSaga(), forbrukSaga(), navigasjonSaga()]);
}
