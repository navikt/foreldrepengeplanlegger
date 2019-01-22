import * as React from 'react';
import { render } from 'react-dom';
import Modal from 'nav-frontend-modal';
import IntlProvider from './intl/IntlProvider';
import { Normaltekst } from 'nav-frontend-typografi';
import Uttaksplanlegger from './Uttaksplanlegger';
import { registerDevUtils } from './dev/devUtils';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';

import './styles/app.less';

const root = document.getElementById('app');

Modal.setAppElement('#appContainer');
registerDevUtils();
const store = configureStore();

render(
    <BrowserRouter>
        <Provider store={store}>
            <IntlProvider>
                <Normaltekst tag="div">
                    <Uttaksplanlegger />
                </Normaltekst>
            </IntlProvider>
        </Provider>
    </BrowserRouter>,
    root
);
