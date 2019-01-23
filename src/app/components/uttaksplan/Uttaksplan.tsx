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
import { Undertittel } from 'nav-frontend-typografi';

interface State {
    visSkjema: boolean;
}

interface OwnProps {
    perioder: Periode[];
}

type Props = OwnProps & PeriodelisteProps;

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
        const { perioder, onRemove, onAdd, onUpdate } = this.props;
        const { visSkjema } = this.state;

        return (
            <section>
                <Block margin="xxs">
                    <Undertittel tag="h1">Perioder</Undertittel>
                </Block>

                <Block>
                    <div className="periodelisteWrapper">
                        <SorterbarPeriodeliste {...this.props} />
                    </div>
                </Block>

                <Block>
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

                <PeriodeDevBar perioder={perioder} onAdd={onAdd} onDelete={onRemove} onChange={onUpdate} />
            </section>
        );
    }
}

export default Uttaksplan;
