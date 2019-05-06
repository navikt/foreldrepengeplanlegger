import * as React from 'react';
import { connect } from 'react-redux';
import { DispatchProps } from '../../redux/types';
import { setSpråk } from '../../redux/actions/common/commonActionCreators';
import { Language } from '../../intl/IntlProvider';
import LanguageToggle from '../../intl/languageToggle/LanguageToggle';
import { AppState } from '../../redux/reducers/rootReducer';

interface StateProps {
    språkkode: Language;
}

type Props = StateProps & DispatchProps;

const Språkvelger: React.StatelessComponent<Props> = ({ dispatch }) => (
    <LanguageToggle toggleLanguage={(code: Language) => dispatch(setSpråk(code))} />
);

const mapStateToProps = (state: AppState): StateProps => {
    return {
        språkkode: state.common.språkkode
    };
};

export default connect(mapStateToProps)(Språkvelger);
