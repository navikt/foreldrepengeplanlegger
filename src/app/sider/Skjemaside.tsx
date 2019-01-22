import * as React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import Situasjonsskjema from '../components/situasjonsskjema/Situasjonsskjema';
import { AppState } from '../redux/reducers/rootReducer';
import { connect } from 'react-redux';
import { DispatchProps } from '../redux/types';
import { SituasjonSkjemadata } from '../types';
import { submitSkjemadata } from '../redux/actions/common/commonActionCreators';

interface StateProps {
    skjemadata?: SituasjonSkjemadata;
}

type Props = StateProps & DispatchProps & RouteComponentProps<any>;

class Skjemaside extends React.Component<Props, {}> {
    render() {
        const { dispatch } = this.props;
        return (
            <>
                <Situasjonsskjema onSubmit={(data) => dispatch(submitSkjemadata(data, this.props.history))} />
                <Link to="/plan">Gå til plan</Link>
            </>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        skjemadata: state.common.skjemadata
    };
};

export default connect(mapStateToProps)(withRouter(Skjemaside));
