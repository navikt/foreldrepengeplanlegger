import * as React from 'react';
import Knapp, { Flatknapp } from 'nav-frontend-knapper';
import Periodeskjema from '../periodeskjema/Periodeskjema';
import Block from 'common/components/block/Block';
import { Periode, Periodetype } from '../../types/periodetyper';
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
import BekreftDialog from 'common/components/dialog/BekreftDialog';
import InfoDialog from 'common/components/dialog/InfoDialog';

interface State {
    visSkjema: boolean;
    visBekreftSlettDialog: boolean;
    visInfoOmForeldrepengerFørTermin: boolean;
    valgtPeriode?: Periode;
}

interface OwnProps {
    periodeFørTermin?: Periode;
    perioder: Periode[];
    omForeldre: OmForeldre;
    forbruk: Forbruk;
    uttaksdatoer: Uttaksdatoer;
    onResetApp: () => void;
    onNyPeriodeChange?: (periode?: Periode) => void;
}

type Props = OwnProps & PeriodelisteProps;

class Uttaksplan extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.addPeriode = this.addPeriode.bind(this);
        this.slettValgtPeriode = this.slettValgtPeriode.bind(this);
        this.handleNyPeriodeChange = this.handleNyPeriodeChange.bind(this);
        this.handleRemovePeriode = this.handleRemovePeriode.bind(this);
        this.state = {
            visSkjema: false,
            visBekreftSlettDialog: false,
            visInfoOmForeldrepengerFørTermin: false
        };
    }

    addPeriode(periode: Periode) {
        this.props.onAdd({ ...periode, fixed: isPeriodeFixed(periode.type) });
        this.setState({ visSkjema: false });
    }

    slettValgtPeriode() {
        if (this.state.valgtPeriode) {
            this.props.onRemove(this.state.valgtPeriode);
        }
        this.setState({
            visBekreftSlettDialog: false,
            valgtPeriode: undefined
        });
    }

    handleNyPeriodeChange(periode?: Periode) {
        const { onNyPeriodeChange } = this.props;
        if (onNyPeriodeChange) {
            onNyPeriodeChange(periode);
        }
    }

    handleRemovePeriode(periode: Periode) {
        if (periode.type === Periodetype.UttakFørTermin) {
            this.setState({ visInfoOmForeldrepengerFørTermin: true, valgtPeriode: periode });
        } else {
            this.setState({ visBekreftSlettDialog: true, valgtPeriode: periode });
        }
    }

    render() {
        const { perioder, onAdd, onUpdate, onRemove, onResetPlan, forbruk, omForeldre, uttaksdatoer } = this.props;
        const { visSkjema } = this.state;
        const nesteUttaksdag =
            perioder.length > 0
                ? Uttaksdagen(perioder[perioder.length - 1].tidsperiode.tom).neste()
                : uttaksdatoer.førsteUttaksdag;
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
                            <Periodeliste {...this.props} onRemove={this.handleRemovePeriode} />
                        </Block>
                        <Block visible={visSkjema}>
                            <Periodeskjema
                                omForeldre={omForeldre}
                                onCancel={() => this.setState({ visSkjema: false })}
                                onChange={this.handleNyPeriodeChange}
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
                        {forbruk.fordeling && perioder.length > 0 && (
                            <FordelingGraf fordeling={forbruk.fordeling} omForeldre={omForeldre} />
                        )}
                    </Block>
                </div>

                <PeriodeDevBar
                    perioder={perioder}
                    onAdd={onAdd}
                    onDelete={onRemove}
                    onChange={onUpdate}
                    onResetApp={this.props.onResetApp}
                />
                <BekreftDialog
                    tittel="Bekreft fjern periode"
                    isOpen={this.state.visBekreftSlettDialog}
                    avbrytLabel="Avbryt"
                    bekreftLabel="Fjern periode"
                    onBekreft={() => this.slettValgtPeriode()}
                    onAvbryt={() => this.setState({ visBekreftSlettDialog: false, valgtPeriode: undefined })}>
                    Ønsker du å slette perioden?
                </BekreftDialog>
                <InfoDialog
                    størrelse="30"
                    tittel="Perioden kan ikke fjernes"
                    isOpen={this.state.visInfoOmForeldrepengerFørTermin}
                    okLabel="Ok"
                    onOk={() => this.setState({ visInfoOmForeldrepengerFørTermin: false, valgtPeriode: undefined })}>
                    Foreldrepenger før fødsel kan ikke fjernes, men du kan velge at en ikke ønsker å ta ut
                    foreldrepenger før termin, under dato valget for perioden.
                </InfoDialog>
            </section>
        );
    }
}

export default Uttaksplan;
