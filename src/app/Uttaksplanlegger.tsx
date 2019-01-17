import * as React from 'react';
import Uttaksplan from './components/uttaksplan/Uttaksplan';
import { Periode } from './types/periodetyper';
import { UttaksplanBuilder } from './utils/Builder';

interface State {
    perioder: Periode[];
}

interface Props {
    familiehendelsesdato: Date;
}

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
        const nyePerioder = UttaksplanBuilder(this.state.perioder, this.props.familiehendelsesdato)
            .leggTilPeriode(periode)
            .build().perioder;
        this.setState({ perioder: nyePerioder });
    }

    onDeletePeriode(periode: Periode) {
        const nyePerioder = UttaksplanBuilder(this.state.perioder, this.props.familiehendelsesdato)
            .fjernPeriode(periode)
            .build().perioder;
        this.setState({ perioder: nyePerioder });
    }

    onUpdatePeriode(periode: Periode) {
        const nyePerioder = UttaksplanBuilder(
            this.state.perioder.filter((p) => p.id !== periode.id),
            this.props.familiehendelsesdato
        )
            .leggTilPeriode(periode)
            .build().perioder;

        this.setState({ perioder: nyePerioder });
    }

    render() {
        return (
            <div className="content">
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
