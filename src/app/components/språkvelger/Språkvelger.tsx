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

interface OwnProps {
    children: React.ReactNode;
}

type Props = OwnProps & StateProps & DispatchProps;

const Språkvelger: React.FunctionComponent<Props> = ({ dispatch, children }) => (
    <div>
        <div className="no-print">
            <LanguageToggle toggleLanguage={(code: Language) => dispatch(setSpråk(code))} />
        </div>
        {children}
    </div>
);

const mapStateToProps = (state: AppState): StateProps => {
    return {
        språkkode: state.common.present.språkkode,
    };
};

export default connect(mapStateToProps)(Språkvelger);
