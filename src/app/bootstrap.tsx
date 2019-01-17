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
import { registerDevUtils } from './dev/devUtils';

Modal.setAppElement('#appContainer');
const root = document.getElementById('app');

registerDevUtils();

render(
    <Provider store={store}>
        <IntlProvider>
            <Router>
                <Normaltekst tag="div">
                    <Uttaksplanlegger familiehendelsesdato={new Date(2019, 0, 10)} />
                </Normaltekst>
            </Router>
        </IntlProvider>
    </Provider>,
    root
);
