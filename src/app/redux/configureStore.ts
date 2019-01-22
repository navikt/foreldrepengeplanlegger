import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer, { AppState } from './reducers/rootReducer';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from './saga/rootSaga';

function configureStore(initialState?: Partial<AppState>) {
    const sagaMiddleware = createSagaMiddleware();
    const composeEnhancer: typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(rootReducer, initialState, composeEnhancer(applyMiddleware(sagaMiddleware)));

    sagaMiddleware.run(rootSaga);

    return store;
}

export default configureStore;
