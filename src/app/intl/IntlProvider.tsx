import * as React from 'react';
import { connect } from 'react-redux';
import { addLocaleData, IntlProvider as Provider } from 'react-intl';

import * as nb from 'react-intl/locale-data/nb';
import * as nn from 'react-intl/locale-data/nn';

import * as nnMessages from './nn_NO.json';
import * as nbMessages from './nb_NO.json';

import { AppState } from 'app/redux/types';
import { Spraak } from 'app/types';

interface Props {
	language: Spraak;
}

class IntlProvider extends React.Component<Props> {
	constructor(props: Props) {
		super(props);
		addLocaleData([...nb, ...nn]);
	}

	render() {
		const messages = this.props.language === 'nb' ? nbMessages : nnMessages;
		return (
			<Provider locale={this.props.language} messages={messages || {}}>
				{this.props.children}
			</Provider>
		);
	}
}

const mapStateToProps = (state: AppState) => ({
	language: state.view.spraak
});

export default connect(mapStateToProps)(IntlProvider);
