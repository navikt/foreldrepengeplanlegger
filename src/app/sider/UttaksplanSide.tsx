import * as React from 'react';
import Uttaksplan from '../components/uttaksplan/Uttaksplan';
import { RouteComponentProps, withRouter, Redirect } from 'react-router-dom';
import { DispatchProps } from '../redux/types';
import { Periode, TilgjengeligeDager, SituasjonSkjemadata, Forbruk, OmForeldre, Uttaksdatoer } from '../types';
import {
    addPeriode,
    updatePeriode,
    removePeriode,
    movePeriode,
    resetApp,
    slåSammenPerioder,
    nyPeriodeChange,
    navigerTilSide,
    resetPlan
} from '../redux/actions/common/commonActionCreators';
import { AppState } from '../redux/reducers/rootReducer';
import { connect } from 'react-redux';
import Block from 'common/components/block/Block';
import { Dekningsgrad } from 'common/types';
import { getStønadskontoer } from '../redux/actions/api/apiActionCreators';
import LoadContainer from 'common/components/loadContainer/LoadContainer';
import { ØnsketFordelingForeldrepenger } from '../redux/reducers/commonReducer';
import { getUttaksdatoer } from '../utils/uttaksdatoer';
import { UttaksplanRegelTestresultat } from '../utils/regler/types';
import Oppsummering from '../components/oppsummering/Oppsummering';
import { Side } from '../routes';
import FocusChildOnMountContainer from 'common/components/focusContainer/FocusChildOnMountContainer';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import { Element } from 'nav-frontend-typografi';
import RegelAvvikListe from '../components/regelAvvikListe/RegelAvvikListe';
import { FormattedMessage } from 'react-intl';
import { ActionCreators as undoActions } from 'redux-undo';

interface StateProps {
    periodeFørTermin?: Periode;
    perioder: Periode[];
    dekningsgrad?: Dekningsgrad;
    familiehendelsesdato: Date;
    tilgjengeligeDager?: TilgjengeligeDager;
    stønadskontoerLastet: boolean;
    henterStønadskontoer: boolean;
    dager100: number;
    dager80: number;
    skjemadata: SituasjonSkjemadata;
    forbruk?: Forbruk;
    omForeldre?: OmForeldre;
    ønsketFordeling: ØnsketFordelingForeldrepenger;
    uttaksdatoer: Uttaksdatoer;
    nyPeriode: Partial<Periode> | undefined;
    nyPeriodeId: string;
    regelTestresultat: UttaksplanRegelTestresultat;
    undoAvailable: boolean;
    redoAvailable: boolean;
}

type Props = StateProps & DispatchProps & RouteComponentProps;

class UttaksplanSide extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        if (this.props.stønadskontoerLastet === false && this.props.henterStønadskontoer === false) {
            this.props.dispatch(getStønadskontoer());
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.props.dispatch(undoActions.clearHistory());
        }, 1000);
    }
    render() {
        const {
            perioder,
            periodeFørTermin,
            dekningsgrad,
            tilgjengeligeDager,
            henterStønadskontoer,
            familiehendelsesdato,
            skjemadata,
            forbruk,
            omForeldre,
            uttaksdatoer,
            regelTestresultat,
            nyPeriode,
            nyPeriodeId,
            history,
            undoAvailable,
            redoAvailable,
            dispatch
        } = this.props;

        if ((skjemadata === undefined && henterStønadskontoer === false) || omForeldre === undefined) {
            return <Redirect to="/" />;
        }
        return (
            <LoadContainer loading={henterStønadskontoer}>
                {dekningsgrad && tilgjengeligeDager && (
                    <>
                        <Block>
                            <Oppsummering
                                situasjonProps={{
                                    familiehendelsesdato,
                                    antallBarn: skjemadata.antallBarn,
                                    omForeldre,
                                    situasjon: skjemadata.situasjon,
                                    onRequestChange: () => dispatch(navigerTilSide(Side.START, history))
                                }}
                                dekningProps={
                                    dekningsgrad
                                        ? {
                                              dekningsgrad,
                                              omForeldre,
                                              tilgjengeligeDager,
                                              onRequestChange: () =>
                                                  dispatch(navigerTilSide(Side.DEKNINGSGRAD, history))
                                          }
                                        : undefined
                                }
                            />
                        </Block>

                        <Block visible={omForeldre.erDeltOmsorg} screenOnly={true}>
                            <Veilederinfo stil="normal" type="info">
                                <Element>
                                    <FormattedMessage id="fellesperiode.info.tittel" />
                                </Element>
                                <FormattedMessage id="fellesperiode.info.tekst" />
                            </Veilederinfo>
                        </Block>

                        <div style={{ pageBreakAfter: 'always' }}>
                            <FocusChildOnMountContainer active={true}>
                                <Uttaksplan
                                    nyPeriodeId={nyPeriodeId}
                                    familiehendelsesdato={familiehendelsesdato}
                                    omForeldre={omForeldre}
                                    periodeFørTermin={periodeFørTermin}
                                    perioder={perioder}
                                    forbruk={forbruk!}
                                    nyPeriode={nyPeriode}
                                    regelAvvik={regelTestresultat.avvik}
                                    tilgjengeligeDager={tilgjengeligeDager}
                                    onAdd={(periode) => dispatch(addPeriode(periode))}
                                    onUpdate={(periode) => periode.type === dispatch(updatePeriode(periode))}
                                    onRemove={(periode) => dispatch(removePeriode(periode))}
                                    onMove={(periode, toIndex) => dispatch(movePeriode(periode, toIndex))}
                                    onResetPlan={() => dispatch(resetPlan())}
                                    onResetApp={() => dispatch(resetApp())}
                                    onNyPeriodeChange={(periode) => dispatch(nyPeriodeChange(periode))}
                                    onSlåSammenPerioder={(p1, p2) => dispatch(slåSammenPerioder(p1, p2))}
                                    uttaksdatoer={uttaksdatoer}
                                    regelTestresultat={regelTestresultat}
                                    undo={undoAvailable ? () => dispatch(undoActions.undo()) : undefined}
                                    redo={redoAvailable ? () => dispatch(undoActions.redo()) : undefined}
                                />
                            </FocusChildOnMountContainer>
                        </div>
                        <Block visible={regelTestresultat.avvik.length > 0} marginTop="l">
                            <RegelAvvikListe avvik={regelTestresultat.avvik} />
                        </Block>
                    </>
                )}
            </LoadContainer>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    const { stønadskontoer } = state.api;
    const common = state.common.present;
    return {
        periodeFørTermin: common.periodeFørTermin,
        perioder: common.perioder,
        dekningsgrad: common.dekningsgrad,
        familiehendelsesdato: common.familiehendelsesdato,
        tilgjengeligeDager: common.tilgjengeligeDager,
        stønadskontoerLastet: stønadskontoer.loaded === true,
        henterStønadskontoer: state.api.stønadskontoer.pending === true,
        dager100: common.stønadskontoer100.dager,
        dager80: common.stønadskontoer80.dager,
        skjemadata: common.skjemadata!,
        forbruk: common.forbruk,
        omForeldre: common.omForeldre,
        ønsketFordeling: common.ønsketFordeling,
        uttaksdatoer: getUttaksdatoer(common.familiehendelsesdato),
        regelTestresultat: common.regelTestresultat,
        nyPeriode: common.nyPeriode,
        nyPeriodeId: common.nyPeriodeId,
        undoAvailable: state.common.past.length > 0,
        redoAvailable: state.common.future.length > 0
    };
};

export default connect(mapStateToProps)(withRouter(UttaksplanSide));
