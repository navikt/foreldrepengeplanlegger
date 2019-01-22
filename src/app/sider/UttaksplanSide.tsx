import * as React from 'react';
import Uttaksplan from '../components/uttaksplan/Uttaksplan';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { DispatchProps } from '../redux/types';
import { Periode } from '../types';
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
import RadioGroup from 'common/components/skjema/radioGroup/RadioGroup';
import { Dekningsgrad } from 'common/types';
import { TilgjengeligStønadskonto } from '../types/st\u00F8nadskontoer';
import TilgjengeligeDager from '../components/tilgjengeligeDager/TilgjengeligeDager';
import { getStønadskontoer } from '../redux/actions/api/apiActionCreators';

interface StateProps {
    perioder: Periode[];
    dekningsgrad: Dekningsgrad;
    familiehendelsesdato: Date;
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[];
    stønadskontoerLastet: boolean;
}

type Props = StateProps & DispatchProps & RouteComponentProps;

class UttaksplanSide extends React.Component<Props, {}> {
    componentWillMount() {
        if (this.props.stønadskontoerLastet === false) {
            this.props.dispatch(getStønadskontoer(this.props.history));
        }
    }
    render() {
        const { perioder, dekningsgrad, tilgjengeligeStønadskontoer, dispatch } = this.props;
        return (
            <>
                <Link to="/">Tilbake</Link>
                <Block>
                    <RadioGroup
                        name="dekningsgrad"
                        legend="Hvor lang periode med foreldrepenger ønsker du/dere?"
                        options={[
                            {
                                label: '49 uker med 100 prosent foreldrepenger',
                                value: '100'
                            },
                            {
                                label: '59 uker med 80 prosent foreldrepenger',
                                value: '80'
                            }
                        ]}
                        onChange={(dg) => dispatch(setDekningsgrad(dg as Dekningsgrad))}
                        checked={dekningsgrad}
                        twoColumns={true}
                    />
                </Block>

                <TilgjengeligeDager tilgjengeligeStønadskontoer={tilgjengeligeStønadskontoer} />

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
    const { stønadskontoer } = state.api;
    return {
        perioder: state.common.perioder,
        dekningsgrad: state.common.dekningsgrad || '100',
        familiehendelsesdato: state.common.familiehendelsesdato,
        tilgjengeligeStønadskontoer: state.common.tilgjengeligeStønadskontoer,
        stønadskontoerLastet: stønadskontoer.loaded === true
    };
};

export default connect(mapStateToProps)(withRouter(UttaksplanSide));
