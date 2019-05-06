import * as React from 'react';
import { addLocaleData, IntlProvider as Provider } from 'react-intl';

import moment from 'moment';

import * as nb from 'react-intl/locale-data/nb';
import * as nn from 'react-intl/locale-data/nn';

import nnMessages from './languageFiles/nn_NO.json';
import nbMessages from './languageFiles/nb_NO.json';
import nnMessagesCommon from '../../common/intl/nn_NO.json';
import nbMessagesCommon from '../../common/intl/nb_NO.json';

import LanguageToggle from './languageToggle/LanguageToggle';

interface State {
    currentLanguage: Language;
}

export type Language = 'nb' | 'nn';
const DEFAULT_LANG = 'nb';

class IntlProvider extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        addLocaleData([...nb, ...nn]);
        this.state = {
            currentLanguage: DEFAULT_LANG
        };
        moment.locale(DEFAULT_LANG);
    }

    setLanguage = (lang: Language) => {
        moment.locale(lang);
        this.setState({
            currentLanguage: lang
        });
    };

    toggleLanguage = (lang: Language) => {
        this.setLanguage(lang);
    };

    render() {
        const messages =
            this.state.currentLanguage === 'nb'
                ? {
                      ...nbMessages,
                      ...nbMessagesCommon
                  }
                : {
                      ...nnMessages,
                      ...nnMessagesCommon
                  };

        return (
            <Provider key={this.state.currentLanguage} locale={this.state.currentLanguage} messages={messages || {}}>
                <div>
                    <div lang={this.state.currentLanguage}>
                        <LanguageToggle toggleLanguage={this.toggleLanguage} />
                    </div>
                    {this.props.children}
                </div>
            </Provider>
        );
    }
}

// const mapStateToProps = (state: AppState): StateProps => ({
//     språkkode: state.common.språkkode
// });

export default IntlProvider;
