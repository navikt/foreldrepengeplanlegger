import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Modal from 'nav-frontend-modal';
import store from './redux';
import IntlProvider from './intl/IntlProvider';

import './styles/app.less';

import { Normaltekst } from 'nav-frontend-typografi';
import Uttaksplanlegger from './Uttaksplanlegger';

Modal.setAppElement('#appContainer');
const root = document.getElementById('app');

render(
    <Provider store={store}>
        <IntlProvider>
            <Router>
                <Normaltekst tag="div">
                    <Uttaksplanlegger />
                </Normaltekst>
            </Router>
        </IntlProvider>
    </Provider>,
    root
);
