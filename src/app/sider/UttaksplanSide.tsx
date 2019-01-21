import * as React from 'react';
import Uttaksplan from '../components/uttaksplan/Uttaksplan';
import { Link } from 'react-router-dom';
import { DispatchProps } from '../redux/types';
import { Periode } from '../types';
import { addPeriode, updatePeriode, removePeriode, movePeriode } from '../redux/actions/common/commonActionCreators';
import { AppState } from '../redux/reducers';
import { connect } from 'react-redux';

interface StateProps {
    perioder: Periode[];
}

type Props = StateProps & DispatchProps;

class UttaksplanSide extends React.Component<Props, {}> {
    render() {
        const { perioder, dispatch } = this.props;
        return (
            <>
                <Link to="/">Tilbake</Link>
                <Uttaksplan
                    perioder={perioder}
                    sortable={true}
                    lockable={true}
                    onAdd={(periode) => dispatch(addPeriode(periode))}
                    onUpdate={(periode) => dispatch(updatePeriode(periode))}
                    onRemove={(periode) => dispatch(removePeriode(periode))}
                    onMove={(periode, toIndex) => dispatch(movePeriode(periode, toIndex))}
                />
            </>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        perioder: state.common.perioder
    };
};

export default connect(mapStateToProps)(UttaksplanSide);
