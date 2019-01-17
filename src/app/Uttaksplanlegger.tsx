import * as React from 'react';
import Uttaksplan from './components/uttaksplan/Uttaksplan';
import { Periode, Periodetype } from './types/periodetyper';
import { UttaksplanBuilder } from './utils/Builder';
import { Forelder } from './types';
import { getUttaksinfoFromPeriode } from './utils/periodeinfo';

const periode1: Periode = {
    forelder: Forelder.forelder1,
    id: '89658209-22972-6250-27502-00358020458507',
    tidsperiode: {
        fom: new Date('Mon Jan 14 2019 00:00:00 GMT+0100'),
        tom: new Date('Fri Feb 08 2019 00:00:00 GMT+0100')
    },
    type: Periodetype.Uttak
};
const periode2: Periode = {
    forelder: Forelder.forelder1,
    id: '77701867-4877-12517-0900-7334518603539',
    tidsperiode: {
        fom: new Date('Mon Feb 11 2019 00:00:00 GMT+0100'),
        tom: new Date('Fri Feb 15 2019 00:00:00 GMT+0100')
    },
    type: Periodetype.Ferie
};
const periode3: Periode = {
    forelder: Forelder.forelder2,
    id: '56204685-2952-7449-7913-90900854017945',
    tidsperiode: {
        fom: new Date('Mon Feb 18 2019 00:00:00 GMT+0100'),
        tom: new Date('Fri Mar 15 2019 00:00:00 GMT+0100')
    },
    type: Periodetype.Uttak
};

const mockPerioder: Periode[] = [periode1, periode2, periode3].map((periode: Periode): Periode => ({
    ...periode,
    uttaksinfo: getUttaksinfoFromPeriode(periode)
}));

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
            perioder: mockPerioder
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
        const nyePerioder = UttaksplanBuilder(this.state.perioder, this.props.familiehendelsesdato)
            .oppdaterPeriode(periode)
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
