import * as React from 'react';
import Knapp from 'nav-frontend-knapper';
import Periodeskjema from '../periodeskjema/Periodeskjema';
import Block from 'common/components/block/Block';
import { Periode, Periodetype } from '../../types/periodetyper';
import { PeriodelisteProps } from '../periodeliste/types';
import Knapperad from 'common/components/knapperad/Knapperad';
import { Forbruk, OmForeldre, Uttaksdatoer, TilgjengeligeDager } from '../../types';
import Periodeliste from '../periodeliste/Periodeliste';
import { Systemtittel } from 'nav-frontend-typografi';
import LinkButton from 'common/components/linkButton/LinkButton';
import { isPeriodeFixed } from '../../utils/typeUtils';
import { Uttaksdagen } from '../../utils/Uttaksdagen';
import BekreftDialog from 'common/components/dialog/BekreftDialog';
import { getForbruk } from '../../utils/forbrukUtils';
import BEMHelper from 'common/util/bem';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import FocusContainer from 'common/components/focusContainer/FocusContainer';
import { RegelAvvik } from '../../../shared/types/regelTypes';
import { KeyboardActions } from 'common/components/helpers/KeyboardActions';
import { focusElement } from '../../utils/focusUtils';
import IkonLabel from '../ikonLabel/IkonLabel';
import UndoIkon from 'common/components/ikoner/Undo';
import FordelingGrafWrapper from '../fordelingGrafWrapper/FordelingGrafWrapper';

import './uttaksplan.less';

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
    undo?: () => void;
    redo?: () => void;
}

type Props = OwnProps & PeriodelisteProps & InjectedIntlProps;

const bem = BEMHelper('uttaksplan');

class Uttaksplan extends React.Component<Props, State> {
    leggTilKnapp: Knapp | null;
    constructor(props: Props) {
        super(props);
        this.addPeriode = this.addPeriode.bind(this);
        this.slettValgtPeriode = this.slettValgtPeriode.bind(this);
        this.handleNyPeriodeChange = this.handleNyPeriodeChange.bind(this);
        this.handleRemovePeriode = this.handleRemovePeriode.bind(this);
        this.handleCancelLeggTil = this.handleCancelLeggTil.bind(this);
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

    handleCancelLeggTil() {
        this.setState({ visSkjema: false });
        setTimeout(() => {
            if (this.leggTilKnapp !== null) {
                focusElement(this.leggTilKnapp);
            }
        });
    }

    render() {
        const {
            perioder,
            onResetPlan,
            forbruk,
            omForeldre,
            uttaksdatoer,
            nyPeriode,
            periodeFørTermin,
            tilgjengeligeDager,
            nyPeriodeId,
            regelAvvik,
            undo,
            redo,
            intl
        } = this.props;
        const { visSkjema } = this.state;
        const nesteUttaksdag =
            perioder.length > 0
                ? Uttaksdagen(perioder[perioder.length - 1].tidsperiode.tom).neste()
                : uttaksdatoer.førsteUttaksdag;

        const visFordelingGraf = perioder.length > 0 || periodeFørTermin !== undefined;

        return (
            <KeyboardActions
                active={visSkjema}
                actions={
                    visSkjema
                        ? [
                              {
                                  key: 'Escape',
                                  name: 'Lukk skjema',
                                  onAction: this.handleCancelLeggTil
                              }
                          ]
                        : []
                }>
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
                                    <div className="periodeliste__actions no-print">
                                        <LinkButton onClick={undo} disabled={undo === undefined}>
                                            <IkonLabel ikon={<UndoIkon />} placement="right">
                                                <FormattedMessage id="undo.angre" />
                                            </IkonLabel>
                                        </LinkButton>

                                        <LinkButton onClick={redo} disabled={redo === undefined}>
                                            <IkonLabel ikon={<UndoIkon flip={true} />} placement="right">
                                                <FormattedMessage id="undo.gjørom" />
                                            </IkonLabel>
                                        </LinkButton>

                                        {onResetPlan && perioder.length > 0 && (
                                            <LinkButton color="red" onClick={() => this.handleSlettPlan()}>
                                                <FormattedMessage id="uttaksplan.slettPlanKnapp" />
                                            </LinkButton>
                                        )}
                                    </div>
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
                                                onCancel={this.handleCancelLeggTil}
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

                            <Block visible={visSkjema !== true} margin="xl" screenOnly={true}>
                                <Knapperad align="center">
                                    <Knapp
                                        ref={(c) => (this.leggTilKnapp = c)}
                                        type="standard"
                                        onClick={() => this.setState({ visSkjema: true })}>
                                        <FormattedMessage id="uttaksplan.leggTilKnapp" />
                                    </Knapp>
                                </Knapperad>
                            </Block>
                            {visFordelingGraf && (
                                <FordelingGrafWrapper
                                    forbruk={forbruk}
                                    omForeldre={omForeldre}
                                    tilgjengeligeDager={tilgjengeligeDager}
                                    regelAvvik={regelAvvik}
                                />
                            )}
                        </Block>
                    </div>

                    <BekreftDialog
                        tittel={getMessage(intl, 'uttaksplan.slettPeriodeDialog.tittel')}
                        isOpen={this.state.visBekreftSlettPeriodeDialog}
                        avbrytLabel={getMessage(intl, 'uttaksplan.slettPeriodeDialog.avbrytKnapp')}
                        bekreftLabel={getMessage(intl, 'uttaksplan.slettPeriodeDialog.jaSlettKnapp')}
                        onBekreft={() => this.slettValgtPeriode()}
                        onAvbryt={() =>
                            this.setState({ visBekreftSlettPeriodeDialog: false, valgtPeriode: undefined })
                        }>
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
            </KeyboardActions>
        );
    }
}

export default injectIntl(Uttaksplan);
