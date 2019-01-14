import * as React from 'react';
import Uttaksplan from './components/uttaksplan/Uttaksplan';
import { Periode } from './types';

interface State {
    perioder: Periode[];
}

interface Props {}

class Uttaksplanlegger extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.onAddPeriode = this.onAddPeriode.bind(this);
        this.onUpdatePeriode = this.onUpdatePeriode.bind(this);
        this.onDeletePeriode = this.onDeletePeriode.bind(this);

        this.state = {
            perioder: []
        };
    }

    onAddPeriode(periode: Periode) {
        const nyePerioder = [...this.state.perioder, periode];
        this.setState({ perioder: nyePerioder });
    }

    onDeletePeriode(periode: Periode) {
        const nyePerioder = this.state.perioder.filter((p) => p.id !== periode.id);
        this.setState({ perioder: nyePerioder });
    }

    onUpdatePeriode(periode: Periode) {
        const nyePerioder = [...this.state.perioder, periode];
        this.setState({ perioder: nyePerioder });
    }

    render() {
        return (
            <div>
                <Uttaksplan
                    perioder={this.state.perioder}
                    onAdd={this.onAddPeriode}
                    onDelete={this.onDeletePeriode}
                    onUpdate={this.onUpdatePeriode}
                />
            </div>
        );
    }
}
export default Uttaksplanlegger;
