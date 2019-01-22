import { createStore, compose, applyMiddleware } from 'redux';
import createRootReducer from './reducers/rootReducer';
import rootSaga from './saga/rootSaga';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';

export const history = createBrowserHistory();
export const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    createRootReducer(history),
    compose(
        applyMiddleware(sagaMiddleware, routerMiddleware(history)),
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    )
);

sagaMiddleware.run(rootSaga);

export default store;
