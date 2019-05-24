import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Situasjonsskjema from '../components/situasjonsskjema/Situasjonsskjema';
import { AppState } from '../redux/reducers/rootReducer';
import { connect } from 'react-redux';
import { DispatchProps } from '../redux/types';
import { SituasjonSkjemadata } from '../types';
import { submitSkjemadata, resetApp } from '../redux/actions/common/commonActionCreators';
import LoadContainer from 'common/components/loadContainer/LoadContainer';

interface StateProps {
    henterStønadskontoer?: boolean;
    skjemadata?: SituasjonSkjemadata;
}

type Props = StateProps & DispatchProps & RouteComponentProps<any>;

class Skjemaside extends React.Component<Props, {}> {
    render() {
        const { henterStønadskontoer, skjemadata, dispatch } = this.props;
        return (
            <LoadContainer loading={henterStønadskontoer} overlay={true}>
                <Situasjonsskjema
                    onSubmit={(data) => dispatch(submitSkjemadata(data, this.props.history))}
                    onReset={() => {
                        dispatch(resetApp());
                    }}
                    skjemadata={skjemadata}
                />
            </LoadContainer>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        skjemadata: state.common.present.skjemadata,
        henterStønadskontoer: state.api.stønadskontoer.pending
    };
};

export default connect(mapStateToProps)(withRouter(Skjemaside));
