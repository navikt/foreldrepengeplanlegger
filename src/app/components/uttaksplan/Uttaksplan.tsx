import * as React from 'react';
import Knapp, { Flatknapp } from 'nav-frontend-knapper';
import Periodeskjema from '../periodeskjema/Periodeskjema';
import Block from 'common/components/block/Block';
import { Periode, Periodetype } from '../../types/periodetyper';
import PeriodeDevBar from '../../dev/PeriodeDevBar';
import { PeriodelisteProps } from '../periodeliste/types';
import Knapperad from 'common/components/knapperad/Knapperad';
import FordelingGraf from '../fordelingGraf/FordelingGraf';
import { Forbruk, OmForeldre, Uttaksdatoer, TilgjengeligeDager } from '../../types';
import Periodeliste from '../periodeliste/Periodeliste';
import { Systemtittel } from 'nav-frontend-typografi';
import LinkButton from 'common/components/linkButton/LinkButton';
import { isPeriodeFixed } from '../../utils/typeUtils';
import { Uttaksdagen } from '../../utils/Uttaksdagen';
import BekreftDialog from 'common/components/dialog/BekreftDialog';
import { getForbruk } from '../../utils/forbrukUtils';
import BEMHelper from 'common/utils/bem';

import './uttaksplan.less';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/utils/i18nUtils';
import FocusContainer from 'common/components/focusContainer/FocusContainer';
import { RegelAvvik } from '../../utils/regler/types';

interface State {
    visSkjema: boolean;
    visBekreftSlettPeriodeDialog: boolean;
    visBekreftSlettPlanDialog: boolean;
    valgtPeriode?: Periode;
}

interface OwnProps {
    periodeFørTermin?: Periode;
    perioder: Periode[];
    omForeldre: OmForeldre;
    forbruk: Forbruk;
    uttaksdatoer: Uttaksdatoer;
    nyPeriode: Partial<Periode> | undefined;
    nyPeriodeId: string;
    tilgjengeligeDager: TilgjengeligeDager;
    regelAvvik: RegelAvvik[];
    onResetApp: () => void;
    onNyPeriodeChange?: (periode?: Periode) => void;
}

type Props = OwnProps & PeriodelisteProps & InjectedIntlProps;

const bem = BEMHelper('uttaksplan');

class Uttaksplan extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.addPeriode = this.addPeriode.bind(this);
        this.slettValgtPeriode = this.slettValgtPeriode.bind(this);
        this.handleNyPeriodeChange = this.handleNyPeriodeChange.bind(this);
        this.handleRemovePeriode = this.handleRemovePeriode.bind(this);
        this.state = {
            visSkjema: props.perioder.length === 0,
            visBekreftSlettPeriodeDialog: false,
            visBekreftSlettPlanDialog: false
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
            visBekreftSlettPeriodeDialog: false,
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
        if (periode.type !== Periodetype.UttakFørTermin) {
            this.setState({ visBekreftSlettPeriodeDialog: true, valgtPeriode: periode });
        }
    }

    handleSlettPlan() {
        this.setState({ visBekreftSlettPlanDialog: true });
    }

    render() {
        const {
            perioder,
            onAdd,
            onUpdate,
            onRemove,
            onResetPlan,
            forbruk,
            omForeldre,
            uttaksdatoer,
            nyPeriode,
            periodeFørTermin,
            tilgjengeligeDager,
            nyPeriodeId,
            regelAvvik,
            intl
        } = this.props;
        const { visSkjema } = this.state;
        const nesteUttaksdag =
            perioder.length > 0
                ? Uttaksdagen(perioder[perioder.length - 1].tidsperiode.tom).neste()
                : uttaksdatoer.førsteUttaksdag;

        const visFordelingGraf = perioder.length > 0 || periodeFørTermin !== undefined;

        return (
            <section className={bem.classNames(bem.block, bem.modifierConditional('visSkjema', visSkjema))}>
                <div className="periodelisteWrapper">
                    <Block margin="none">
                        <Block margin="s">
                            <div className="periodeliste__header">
                                <div className="periodeliste__title">
                                    <FocusContainer active={true}>
                                        <Systemtittel>
                                            {omForeldre.erDeltOmsorg ? (
                                                <FormattedMessage id="uttaksplan.deresPlan" />
                                            ) : (
                                                <FormattedMessage id="uttaksplan.dinPlan" />
                                            )}
                                        </Systemtittel>
                                    </FocusContainer>
                                </div>
                                {onResetPlan && perioder.length > 0 && (
                                    <div className="periodeliste__reset">
                                        <LinkButton color="red" onClick={() => this.handleSlettPlan()}>
                                            <FormattedMessage id="uttaksplan.slettPlanKnapp" />
                                        </LinkButton>
                                    </div>
                                )}
                            </div>
                        </Block>
                        <Block>
                            <Periodeliste
                                {...this.props}
                                onRemove={this.handleRemovePeriode}
                                nyPeriodeId={nyPeriodeId}
                                visSkjema={visSkjema}
                                nyPeriodeSkjema={
                                    <Block margin="s">
                                        <Periodeskjema
                                            perioder={perioder}
                                            periodeFørTermin={periodeFørTermin}
                                            nyPeriode={nyPeriode}
                                            nyPeriodeId={nyPeriodeId}
                                            omForeldre={omForeldre}
                                            onCancel={() => this.setState({ visSkjema: false })}
                                            onChange={this.handleNyPeriodeChange}
                                            onSubmit={(periode) => this.addPeriode(periode)}
                                            nesteUttaksdag={nesteUttaksdag}
                                            førsteUttaksdag={uttaksdatoer.førsteUttaksdag}
                                            sisteUttaksdag={uttaksdatoer.etterFødsel.sisteMuligeUttaksdag}
                                            førsteUttaksdagFørTermin={uttaksdatoer.førFødsel.førsteMuligeUttaksdag}
                                            forbruk={getForbruk(
                                                [...perioder, ...(periodeFørTermin ? [periodeFørTermin] : [])],
                                                tilgjengeligeDager,
                                                omForeldre
                                            )}
                                        />
                                    </Block>
                                }
                            />
                        </Block>

                        <Block visible={visSkjema !== true} margin="xl">
                            <Knapperad align="center">
                                <Knapp type="standard" onClick={() => this.setState({ visSkjema: true })}>
                                    <FormattedMessage id="uttaksplan.leggTilKnapp" />
                                </Knapp>
                                <div className="dev">
                                    {onResetPlan && <Flatknapp onClick={() => onResetPlan()}>Reset</Flatknapp>}
                                </div>
                            </Knapperad>
                        </Block>
                        {visFordelingGraf && (
                            <FordelingGraf
                                forbruk={forbruk}
                                omForeldre={omForeldre}
                                tilgjengeligeDager={tilgjengeligeDager}
                                regelAvvik={regelAvvik}
                            />
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
                    tittel={getMessage(intl, 'uttaksplan.slettPeriodeDialog.tittel')}
                    isOpen={this.state.visBekreftSlettPeriodeDialog}
                    avbrytLabel={getMessage(intl, 'uttaksplan.slettPeriodeDialog.avbrytKnapp')}
                    bekreftLabel={getMessage(intl, 'uttaksplan.slettPeriodeDialog.jaSlettKnapp')}
                    onBekreft={() => this.slettValgtPeriode()}
                    onAvbryt={() => this.setState({ visBekreftSlettPeriodeDialog: false, valgtPeriode: undefined })}>
                    <FormattedMessage id="uttaksplan.slettPeriodeDialog.tekst" />
                </BekreftDialog>

                {onResetPlan && (
                    <BekreftDialog
                        tittel={getMessage(intl, 'uttaksplan.slettPlanDialog.tittel')}
                        isOpen={this.state.visBekreftSlettPlanDialog}
                        avbrytLabel={getMessage(intl, 'uttaksplan.slettPlanDialog.avbrytKnapp')}
                        bekreftLabel={getMessage(intl, 'uttaksplan.slettPlanDialog.jaSlettKnapp')}
                        onBekreft={() => {
                            onResetPlan();
                            this.setState({ visBekreftSlettPlanDialog: false });
                        }}
                        onAvbryt={() => this.setState({ visBekreftSlettPlanDialog: false })}>
                        <FormattedMessage id="uttaksplan.slettPlanDialog.tekst" />
                    </BekreftDialog>
                )}
            </section>
        );
    }
}

export default injectIntl(Uttaksplan);
