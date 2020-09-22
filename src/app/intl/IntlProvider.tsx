import React from 'react';
import { connect } from 'react-redux';
import { IntlProvider as Provider } from 'react-intl';
import moment from 'moment';

import nnMessages from './languageFiles/nn_NO.json';
import nbMessages from './languageFiles/nb_NO.json';
import nnMessagesCommon from '../../common/intl/nn_NO.json';
import nbMessagesCommon from '../../common/intl/nb_NO.json';
import { AppState } from '../redux/reducers/rootReducer';

interface StateProps {
    språkkode: Language;
}

export type Language = 'nb' | 'nn';
const DEFAULT_LANG = 'nb';

class IntlProvider extends React.Component<StateProps> {
    constructor(props: StateProps) {
        super(props);
        moment.locale(props.språkkode || DEFAULT_LANG);
    }

    render() {
        const { språkkode } = this.props;

        const messages =
            språkkode === 'nb'
                ? {
                      ...nbMessages,
                      ...nbMessagesCommon,
                  }
                : {
                      ...nnMessages,
                      ...nnMessagesCommon,
                  };

        return (
            <Provider key={språkkode} locale={språkkode} messages={messages || {}}>
                {this.props.children}
            </Provider>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    språkkode: state.common.present.språkkode,
});

export default connect(mapStateToProps)(IntlProvider);
