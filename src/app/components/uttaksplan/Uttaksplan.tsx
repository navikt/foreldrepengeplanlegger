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
import { Systemtittel, Ingress } from 'nav-frontend-typografi';
import Knapperad from 'common/components/knapperad/Knapperad';

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
                    <Systemtittel tag="h1">Deres plan</Systemtittel>
                </Block>
                <Block margin="s">
                    <Ingress>Fordel dagene deres ved å legge til og justere perioden i listen nedenfor</Ingress>
                </Block>

                <Block>
                    <div className="periodelisteWrapper">
                        <Block margin="s">
                            <SorterbarPeriodeliste {...this.props} />
                        </Block>
                        <Block visible={visSkjema}>
                            <Periodeskjema
                                onCancel={() => this.setState({ visSkjema: false })}
                                onSubmit={(periode) => this.addPeriode(periode)}
                            />
                        </Block>
                        <Block visible={visSkjema !== true}>
                            <Knapperad align="center">
                                <Knapp type="standard" onClick={() => this.setState({ visSkjema: true })}>
                                    Legg til periode
                                </Knapp>
                            </Knapperad>
                        </Block>
                        <Block>
                            <Forbruk forbruk={getForbruk(perioder)} />
                        </Block>
                    </div>
                </Block>

                <PeriodeDevBar perioder={perioder} onAdd={onAdd} onDelete={onRemove} onChange={onUpdate} />
            </section>
        );
    }
}

export default Uttaksplan;
