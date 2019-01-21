import * as React from 'react';
import Knapp from 'nav-frontend-knapper';
import Periodeskjema from '../periodeskjema/Periodeskjema';
import Block from 'common/components/block/Block';
import { Periode } from '../../types/periodetyper';
import PeriodeDevBar from '../../dev/PeriodeDevBar';
import Forbruk from '../forbruk/Forbruk';
import { getForbruk } from '../forbruk/forbrukUtils';
import SorterbarPeriodeliste from '../periodeliste/SorterbarPeriodeliste';
import { PeriodelisteProps } from '../periodeliste/types';

interface State {
    visSkjema: boolean;
}

class Uttaksplan extends React.Component<PeriodelisteProps, State> {
    constructor(props: PeriodelisteProps) {
        super(props);
        this.addPeriode = this.addPeriode.bind(this);
        this.state = {
            visSkjema: false
        };
    }

    addPeriode(periode: Periode) {
        this.props.onAdd(periode);
        this.setState({ visSkjema: false });
    }

    render() {
        const { perioder, onDelete, onAdd, onChange } = this.props;
        const { visSkjema } = this.state;

        return (
            <div className="content">
                <h1>Perioder</h1>

                <Block animated={false}>
                    <div className="periodelisteWrapper">
                        <SorterbarPeriodeliste {...this.props} />
                    </div>
                </Block>

                <Block animated={false}>
                    <Forbruk forbruk={getForbruk(perioder)} />
                </Block>

                <Block visible={visSkjema}>
                    <Periodeskjema
                        onCancel={() => this.setState({ visSkjema: false })}
                        onSubmit={(periode) => this.addPeriode(periode)}
                    />
                </Block>

                <Block>
                    <Knapp type="standard" onClick={() => this.setState({ visSkjema: true })}>
                        Legg til periode
                    </Knapp>
                </Block>

                <PeriodeDevBar perioder={perioder} onAdd={onAdd} onDelete={onDelete} onChange={onChange} />
            </div>
        );
    }
}
export default Uttaksplan;
