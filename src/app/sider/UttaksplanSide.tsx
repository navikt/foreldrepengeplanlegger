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
import Regelbrudd from '../components/regelbrudd/Regelbrudd';

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
}

type Props = StateProps & DispatchProps & RouteComponentProps;

class UttaksplanSide extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        if (this.props.stønadskontoerLastet === false && this.props.henterStønadskontoer === false) {
            this.props.dispatch(getStønadskontoer());
        }
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
                                              situasjon: skjemadata.situasjon,
                                              tilgjengeligeDager,
                                              onRequestChange: () =>
                                                  dispatch(navigerTilSide(Side.DEKNINGSGRAD, history))
                                          }
                                        : undefined
                                }
                            />
                        </Block>

                        <Uttaksplan
                            nyPeriodeId={nyPeriodeId}
                            familiehendelsesdato={familiehendelsesdato}
                            omForeldre={omForeldre}
                            periodeFørTermin={periodeFørTermin}
                            perioder={perioder}
                            forbruk={forbruk!}
                            nyPeriode={nyPeriode}
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
                        />
                        <Block visible={regelTestresultat.regelbrudd.length > 0} marginTop="l">
                            <Regelbrudd regelbrudd={regelTestresultat.regelbrudd} />
                        </Block>
                    </>
                )}
            </LoadContainer>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    const { stønadskontoer } = state.api;
    return {
        periodeFørTermin: state.common.periodeFørTermin,
        perioder: state.common.perioder,
        dekningsgrad: state.common.dekningsgrad,
        familiehendelsesdato: state.common.familiehendelsesdato,
        tilgjengeligeDager: state.common.tilgjengeligeDager,
        stønadskontoerLastet: stønadskontoer.loaded === true,
        henterStønadskontoer: state.api.stønadskontoer.pending === true,
        dager100: state.common.stønadskontoer100.dager,
        dager80: state.common.stønadskontoer80.dager,
        skjemadata: state.common.skjemadata!,
        forbruk: state.common.forbruk,
        omForeldre: state.common.omForeldre,
        ønsketFordeling: state.common.ønsketFordeling,
        uttaksdatoer: getUttaksdatoer(state.common.familiehendelsesdato),
        regelTestresultat: state.common.regelTestresultat,
        nyPeriode: state.common.nyPeriode,
        nyPeriodeId: state.common.nyPeriodeId
    };
};

export default connect(mapStateToProps)(withRouter(UttaksplanSide));
