import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import PlanleggerApp from './Planlegger.app';
import reducers from './redux/reducers';

function configureStore() {
	/* tslint:disable */
	const devtools: any =
		/* tslint:disable-next-line */
		window['devToolsExtension']
			? /* tslint:disable-next-line */
				window['devToolsExtension']()
			: (f: any) => f;
	/* tslint:enable */
	return createStore(reducers, devtools);
}

const store = configureStore();

const root = document.getElementById('app');
render(
	<Provider store={store}>
		<BrowserRouter>
			<PlanleggerApp />
		</BrowserRouter>
	</Provider>,
	root
);
