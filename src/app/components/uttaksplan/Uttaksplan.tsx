import * as React from 'react';
import Periodeliste from '../periodeliste/Periodeliste';
import Knapp from 'nav-frontend-knapper';
import Periodeskjema from '../periodeskjema/Periodeskjema';
import Block from 'common/components/block/Block';
import { Periode } from '../../types/periodetyper';
import PeriodeDevBar from '../../dev/PeriodeDevBar';

interface Props {
    perioder: Periode[];
    onAdd: (periode: Periode) => void;
    onDelete: (periode: Periode) => void;
    onUpdate: (periode: Periode) => void;
}

interface State {
    visSkjema: boolean;
}

class Uttaksplan extends React.Component<Props, State> {
    constructor(props: Props) {
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
        const { perioder, onDelete, onAdd, onUpdate } = this.props;
        const { visSkjema } = this.state;

        return (
            <div className="content">
                <h1>Perioder</h1>

                <Block animated={false}>
                    <Periodeliste perioder={perioder} onDelete={onDelete} />
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

                <PeriodeDevBar perioder={perioder} onAdd={onAdd} onDelete={onDelete} onUpdate={onUpdate} />
            </div>
        );
    }
}
export default Uttaksplan;
