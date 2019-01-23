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
import { TilgjengeligeDager } from '../types/st\u00F8nadskontoer';
import { getStønadskontoer } from '../redux/actions/api/apiActionCreators';
import LoadContainer from '../components/loadContainer/LoadContainer';
import { Collapse } from 'react-collapse';
import TilgjengeligeDagerOversikt from '../components/tilgjengeligeDagerOversikt/TilgjengeligeDagerOversikt';

interface StateProps {
    perioder: Periode[];
    dekningsgrad: Dekningsgrad;
    familiehendelsesdato: Date;
    tilgjengeligeDager: TilgjengeligeDager;
    stønadskontoerLastet: boolean;
    henterStønadskontoer: boolean;
}

type Props = StateProps & DispatchProps & RouteComponentProps;

class UttaksplanSide extends React.Component<Props, {}> {
    componentDidMount() {
        if (this.props.stønadskontoerLastet === false) {
            this.props.dispatch(getStønadskontoer(this.props.history));
        }
    }
    render() {
        const { perioder, dekningsgrad, tilgjengeligeDager, henterStønadskontoer, dispatch } = this.props;
        return (
            <Collapse isOpened={true} forceInitialAnimation={false}>
                <LoadContainer loading={henterStønadskontoer} overlay={false}>
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
                    <Block visible={henterStønadskontoer === false && tilgjengeligeDager.harTilgjengeligeDager}>
                        <TilgjengeligeDagerOversikt
                            tilgjengeligeDager={tilgjengeligeDager}
                            dekningsgrad={dekningsgrad}
                        />
                        <Uttaksplan
                            perioder={perioder}
                            sortable={true}
                            lockable={true}
                            onAdd={(periode) => dispatch(addPeriode(periode))}
                            onUpdate={(periode) => dispatch(updatePeriode(periode))}
                            onRemove={(periode) => dispatch(removePeriode(periode))}
                            onMove={(periode, toIndex) => dispatch(movePeriode(periode, toIndex))}
                        />
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
        henterStønadskontoer: state.api.stønadskontoer.pending === true
    };
};

export default connect(mapStateToProps)(withRouter(UttaksplanSide));
