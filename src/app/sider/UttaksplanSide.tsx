import * as React from 'react';
import Uttaksplan from '../components/uttaksplan/Uttaksplan';
import { Link } from 'react-router-dom';
import { DispatchProps } from '../redux/types';
import { Periode } from '../types';
import {
    addPeriode,
    updatePeriode,
    removePeriode,
    movePeriode,
    setDekningsgrad
} from '../redux/actions/common/commonActionCreators';
import { AppState } from '../redux/reducers';
import { connect } from 'react-redux';
import Block from 'common/components/block/Block';
import RadioGroup from 'common/components/skjema/radioGroup/RadioGroup';
import { Dekningsgrad } from 'common/types';

interface StateProps {
    perioder: Periode[];
    dekningsgrad: Dekningsgrad;
    familiehendelsesdato: Date;
}

type Props = StateProps & DispatchProps;

class UttaksplanSide extends React.Component<Props, {}> {
    render() {
        const { perioder, dekningsgrad, dispatch } = this.props;
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
        perioder: state.common.perioder,
        dekningsgrad: state.common.dekningsgrad || '100',
        familiehendelsesdato: state.common.familiehendelsesdato
    };
};

export default connect(mapStateToProps)(UttaksplanSide);
