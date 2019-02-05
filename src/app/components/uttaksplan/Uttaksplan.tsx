import * as React from 'react';
import Knapp, { Flatknapp } from 'nav-frontend-knapper';
import Periodeskjema from '../periodeskjema/Periodeskjema';
import Block from 'common/components/block/Block';
import { Periode } from '../../types/periodetyper';
import PeriodeDevBar from '../../dev/PeriodeDevBar';
import { PeriodelisteProps } from '../periodeliste/types';
import Knapperad from 'common/components/knapperad/Knapperad';
import FordelingGraf from '../fordelingGraf/FordelingGraf';
import { Forbruk, OmForeldre, Uttaksdatoer } from '../../types';
import Periodeliste from '../periodeliste/Periodeliste';
import { Systemtittel } from 'nav-frontend-typografi';
import LinkButton from 'common/components/linkButton/LinkButton';
import { isPeriodeFixed } from '../../utils/typeUtils';
import { Uttaksdagen } from '../../utils/Uttaksdagen';

interface State {
    visSkjema: boolean;
}

interface OwnProps {
    periodeFørTermin?: Periode;
    perioder: Periode[];
    omForeldre: OmForeldre;
    forbruk: Forbruk;
    uttaksdatoer: Uttaksdatoer;
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
        this.props.onAdd({ ...periode, fixed: isPeriodeFixed(periode.type) });
        this.setState({ visSkjema: false });
    }

    render() {
        const { perioder, onAdd, onUpdate, onRemove, onResetPlan, forbruk, omForeldre, uttaksdatoer } = this.props;
        const { visSkjema } = this.state;
        const nesteUttaksdag = Uttaksdagen(perioder[perioder.length - 1].tidsperiode.tom).neste();
        return (
            <section>
                <div className="periodelisteWrapper">
                    <Block animated={true}>
                        <Block margin="s">
                            <div className="periodeliste__header">
                                <div className="periodeliste__title">
                                    <Systemtittel>Deres plan</Systemtittel>
                                </div>

                                {onResetPlan && (
                                    <div className="periodeliste__reset">
                                        <LinkButton onClick={() => onResetPlan()}>Tøm plan</LinkButton>
                                    </div>
                                )}
                            </div>
                        </Block>
                        <Block margin="s">
                            <Periodeliste {...this.props} />
                        </Block>
                        <Block visible={visSkjema}>
                            <Periodeskjema
                                omForeldre={omForeldre}
                                onCancel={() => this.setState({ visSkjema: false })}
                                onSubmit={(periode) => this.addPeriode(periode)}
                                nesteUttaksdag={nesteUttaksdag}
                                førsteUttaksdag={uttaksdatoer.førsteUttaksdag}
                                sisteUttaksdag={uttaksdatoer.etterFødsel.sisteMuligeUttaksdag}
                                førsteUttaksdagFørTermin={uttaksdatoer.førFødsel.førsteMuligeUttaksdag}
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
