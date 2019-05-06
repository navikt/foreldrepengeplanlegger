import * as React from 'react';
import { render } from 'react-dom';
import Modal from 'nav-frontend-modal';
import IntlProvider from './intl/IntlProvider';
import { Normaltekst } from 'nav-frontend-typografi';
import Uttaksplanlegger from './Uttaksplanlegger';
import { registerDevUtils } from './dev/devUtils';

import './styles/app.less';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './redux/configureStore';
import { Provider } from 'react-redux';

const root = document.getElementById('app');
Modal.setAppElement('#appContainer');
registerDevUtils();

const store = configureStore();

render(
    <Provider store={store}>
        <Normaltekst tag="div">
            <IntlProvider>
                <BrowserRouter>
                    <Uttaksplanlegger />
                </BrowserRouter>
            </IntlProvider>
        </Normaltekst>
    </Provider>,
    root
);
