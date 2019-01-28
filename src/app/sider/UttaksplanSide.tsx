import * as React from 'react';
import Uttaksplan from '../components/uttaksplan/Uttaksplan';
import { RouteComponentProps, withRouter, Redirect } from 'react-router-dom';
import { DispatchProps } from '../redux/types';
import { Periode, TilgjengeligeDager, SituasjonSkjemadata } from '../types';
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
import { Collapse } from 'react-collapse';
import TilgjengeligeDagerOversikt from '../components/tilgjengeligeDagerOversikt/TilgjengeligeDagerOversikt';
import LoadContainer from 'common/components/loadContainer/LoadContainer';
import DekningsgradValg from '../components/dekningsgradValg/DekningsgradValg';
import Situasjonsoppsummering from '../components/situasjonOppsummering/SituasjonOppsummering';

interface StateProps {
    perioder: Periode[];
    dekningsgrad: Dekningsgrad;
    familiehendelsesdato: Date;
    tilgjengeligeDager?: TilgjengeligeDager;
    stønadskontoerLastet: boolean;
    henterStønadskontoer: boolean;
    dager100: number;
    dager80: number;
    skjemadata: SituasjonSkjemadata;
}

type Props = StateProps & DispatchProps & RouteComponentProps;

class UttaksplanSide extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
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
            familiehendelsesdato,
            dager100,
            dager80,
            skjemadata,
            dispatch
        } = this.props;
        const visInnhold = henterStønadskontoer === false && tilgjengeligeDager !== undefined;
        if (skjemadata === undefined && henterStønadskontoer === false) {
            return <Redirect to="/" />;
        }
        return (
            <Collapse isOpened={true} forceInitialAnimation={false}>
                <Situasjonsoppsummering
                    familiehendelsesdato={familiehendelsesdato}
                    antallBarn={skjemadata.antallBarn}
                    navnForelder1={skjemadata.navnForelder1}
                    navnForelder2={skjemadata.navnForelder2}
                    situasjon={skjemadata.situasjon}
                />
                <LoadContainer loading={henterStønadskontoer} overlay={false}>
                    <Block>
                        <DekningsgradValg
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
                                    lockable={true}
                                    perioder={perioder}
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
        dager80: state.common.stønadskontoer80.dager,
        skjemadata: state.common.skjemadata!
    };
};

export default connect(mapStateToProps)(withRouter(UttaksplanSide));
