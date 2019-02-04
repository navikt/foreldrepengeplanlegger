import * as React from 'react';
import Knapp, { Flatknapp } from 'nav-frontend-knapper';
import Periodeskjema from '../periodeskjema/Periodeskjema';
import Block from 'common/components/block/Block';
import { Periode } from '../../types/periodetyper';
import PeriodeDevBar from '../../dev/PeriodeDevBar';
import { PeriodelisteProps } from '../periodeliste/types';
import Knapperad from 'common/components/knapperad/Knapperad';
import FordelingGraf from '../fordelingGraf/FordelingGraf';
import { Forbruk, OmForeldre } from '../../types';
import Periodeliste from '../periodeliste/Periodeliste';
import { Systemtittel } from 'nav-frontend-typografi';

interface State {
    visSkjema: boolean;
}

interface OwnProps {
    periodeFørTermin?: Periode;
    perioder: Periode[];
    omForeldre: OmForeldre;
    forbruk: Forbruk;
    onResetApp: () => void;
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
        const { perioder, onAdd, onUpdate, onRemove, onResetPlan, forbruk, omForeldre } = this.props;
        const { visSkjema } = this.state;
        return (
            <section>
                <div className="periodelisteWrapper">
                    <Block animated={true}>
                        <Block margin="s">
                            <Systemtittel>Deres plan</Systemtittel>
                        </Block>
                        <Block margin="s">
                            <Periodeliste {...this.props} />
                        </Block>
                        <Block visible={visSkjema}>
                            <Periodeskjema
                                omForeldre={omForeldre}
                                onCancel={() => this.setState({ visSkjema: false })}
                                onSubmit={(periode) => this.addPeriode(periode)}
                            />
                        </Block>
                        <Block visible={visSkjema !== true} margin="l">
                            <Knapperad align="center">
                                <Knapp type="standard" onClick={() => this.setState({ visSkjema: true })}>
                                    Legg til ny periode
                                </Knapp>
                                <div className="dev">
                                    {onResetPlan && <Flatknapp onClick={() => onResetPlan()}>Reset</Flatknapp>}
                                </div>
                            </Knapperad>
                        </Block>
                        {forbruk.fordeling && <FordelingGraf fordeling={forbruk.fordeling} omForeldre={omForeldre} />}
                    </Block>
                </div>

                <PeriodeDevBar
                    perioder={perioder}
                    onAdd={onAdd}
                    onDelete={onRemove}
                    onChange={onUpdate}
                    onResetApp={this.props.onResetApp}
                />
            </section>
        );
    }
}

export default Uttaksplan;
