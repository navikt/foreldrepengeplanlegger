import * as React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import Situasjonsskjema from '../components/situasjonsskjema/Situasjonsskjema';
import { AppState } from '../redux/reducers/rootReducer';
import { connect } from 'react-redux';
import { DispatchProps } from '../redux/types';
import { SituasjonSkjemadata } from '../types';
import { submitSkjemadata } from '../redux/actions/common/commonActionCreators';
import LoadContainer from '../components/loadContainer/LoadContainer';

interface StateProps {
    henterStønadskontoer?: boolean;
    skjemadata?: SituasjonSkjemadata;
}

type Props = StateProps & DispatchProps & RouteComponentProps<any>;

class Skjemaside extends React.Component<Props, {}> {
    render() {
        const { henterStønadskontoer, dispatch } = this.props;
        return (
            <LoadContainer loading={henterStønadskontoer} overlay={true}>
                <Situasjonsskjema onSubmit={(data) => dispatch(submitSkjemadata(data, this.props.history))} />
                <Link to="/plan">Gå til plan</Link>
            </LoadContainer>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        skjemadata: state.common.skjemadata,
        henterStønadskontoer: state.api.stønadskontoer.pending
    };
};

export default connect(mapStateToProps)(withRouter(Skjemaside));
