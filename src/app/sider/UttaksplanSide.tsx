import * as React from 'react';
import Uttaksplan from '../components/uttaksplan/Uttaksplan';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { DispatchProps } from '../redux/types';
import { Periode, TilgjengeligeDager } from '../types';
import {
    addPeriode,
    updatePeriode,
    removePeriode,
    movePeriode,
    setDekningsgrad
} from '../redux/actions/common/commonActionCreators';
import { AppState } from '../redux/reducers/rootReducer';
import { connect } from 'react-redux';
import Block from 'common/components/block/Block';
import { Dekningsgrad } from 'common/types';
import { getStønadskontoer } from '../redux/actions/api/apiActionCreators';
import LoadContainer from '../components/loadContainer/LoadContainer';
import { Collapse } from 'react-collapse';
import TilgjengeligeDagerOversikt from '../components/tilgjengeligeDagerOversikt/TilgjengeligeDagerOversikt';
import DekningsgradSpørsmål from '../components/dekningsgradSp\u00F8rsm\u00E5l/DekningsgradSp\u00F8rsm\u00E5l';

interface StateProps {
    perioder: Periode[];
    dekningsgrad: Dekningsgrad;
    familiehendelsesdato: Date;
    tilgjengeligeDager?: TilgjengeligeDager;
    stønadskontoerLastet: boolean;
    henterStønadskontoer: boolean;
    dager100: number;
    dager80: number;
}

type Props = StateProps & DispatchProps & RouteComponentProps;

class UttaksplanSide extends React.Component<Props, {}> {
    componentDidMount() {
        if (this.props.stønadskontoerLastet === false) {
            this.props.dispatch(getStønadskontoer(this.props.history));
        }
    }
    render() {
        const {
            perioder,
            dekningsgrad,
            tilgjengeligeDager,
            henterStønadskontoer,
            dager100,
            dager80,
            dispatch
        } = this.props;
        const visInnhold = henterStønadskontoer === false && tilgjengeligeDager !== undefined;
        return (
            <Collapse isOpened={true} forceInitialAnimation={false}>
                <LoadContainer loading={henterStønadskontoer} overlay={false}>
                    <Link to="/">Tilbake</Link>
                    <Block>
                        <DekningsgradSpørsmål
                            dekningsgrad={dekningsgrad}
                            onChange={(dg) => dispatch(setDekningsgrad(dg as Dekningsgrad))}
                            dager100={dager100}
                            dager80={dager80}
                        />
                    </Block>
                    <Block visible={visInnhold}>
                        {tilgjengeligeDager !== undefined && (
                            <>
                                <Block>
                                    <TilgjengeligeDagerOversikt
                                        tilgjengeligeDager={tilgjengeligeDager}
                                        dekningsgrad={dekningsgrad}
                                        visKontoliste={true}
                                    />
                                </Block>
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
                        )}
                    </Block>
                </LoadContainer>
            </Collapse>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    const { stønadskontoer } = state.api;
    return {
        perioder: state.common.perioder,
        dekningsgrad: state.common.dekningsgrad || '100',
        familiehendelsesdato: state.common.familiehendelsesdato,
        tilgjengeligeDager: state.common.tilgjengeligeDager,
        stønadskontoerLastet: stønadskontoer.loaded === true,
        henterStønadskontoer: state.api.stønadskontoer.pending === true,
        dager100: state.common.stønadskontoer100.dager,
        dager80: state.common.stønadskontoer80.dager
    };
};

export default connect(mapStateToProps)(withRouter(UttaksplanSide));
