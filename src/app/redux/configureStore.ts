import { createStore, applyMiddleware } from 'redux';
import rootReducer, { AppState } from './reducers/rootReducer';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from './saga/rootSaga';

import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

function configureStore(initialState?: Partial<AppState>) {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(sagaMiddleware)));

    sagaMiddleware.run(rootSaga);

    return store;
}

export default configureStore;
