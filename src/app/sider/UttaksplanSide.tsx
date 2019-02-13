import * as React from 'react';
import Uttaksplan from '../components/uttaksplan/Uttaksplan';
import { RouteComponentProps, withRouter, Redirect, Link } from 'react-router-dom';
import { DispatchProps } from '../redux/types';
import { Periode, TilgjengeligeDager, SituasjonSkjemadata, Forbruk, OmForeldre, Uttaksdatoer } from '../types';
import {
    addPeriode,
    updatePeriode,
    removePeriode,
    movePeriode,
    setDekningsgrad,
    setPerioder,
    resetApp,
    setØnsketFordeling,
    slåSammenPerioder,
    nyPeriodeChange
} from '../redux/actions/common/commonActionCreators';
import { AppState } from '../redux/reducers/rootReducer';
import { connect } from 'react-redux';
import Block from 'common/components/block/Block';
import { Dekningsgrad } from 'common/types';
import { getStønadskontoer } from '../redux/actions/api/apiActionCreators';
import TilgjengeligeDagerOversikt from '../components/tilgjengeligeDagerOversikt/TilgjengeligeDagerOversikt';
import LoadContainer from 'common/components/loadContainer/LoadContainer';
import DekningsgradValg from '../components/dekningsgradValg/DekningsgradValg';
import Situasjonsoppsummering from '../components/situasjonOppsummering/SituasjonOppsummering';
import Skjemablokk from '../components/skjemablokk/Skjemablokk';
import { ØnsketFordelingForeldrepenger } from '../redux/reducers/commonReducer';
import FordelingForeldrepenger from '../components/uttaksplan/FordelingForeldrepenger';
import { getTilgjengeligeUker } from '../utils/kontoUtils';
import { getUttaksdatoer } from '../utils/uttaksdatoer';
import { UttaksplanRegelTestresultat } from '../utils/regler/types';

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
    regelTestresultat: UttaksplanRegelTestresultat;
}

type Props = StateProps & DispatchProps & RouteComponentProps;

class UttaksplanSide extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        if (this.props.stønadskontoerLastet === false) {
            this.props.dispatch(getStønadskontoer(this.props.history));
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
            dager100,
            dager80,
            skjemadata,
            forbruk,
            omForeldre,
            ønsketFordeling,
            uttaksdatoer,
            regelTestresultat,
            dispatch
        } = this.props;

        const visInnhold =
            henterStønadskontoer === false &&
            tilgjengeligeDager !== undefined &&
            dekningsgrad !== undefined &&
            forbruk !== undefined;

        if ((skjemadata === undefined && henterStønadskontoer === false) || omForeldre === undefined) {
            return <Redirect to="/" />;
        }
        return (
            <>
                <Block visible={false}>
                    <Situasjonsoppsummering
                        familiehendelsesdato={familiehendelsesdato}
                        antallBarn={skjemadata.antallBarn}
                        navnMor={skjemadata.navnMor}
                        navnFarMedmor={skjemadata.navnFarMedmor}
                        situasjon={skjemadata.situasjon}
                    />
                </Block>
                <Block align="center">
                    <Link className="lenke" to="/">
                        Tilbake til skjema
                    </Link>
                </Block>

                <LoadContainer loading={henterStønadskontoer} overlay={false}>
                    <Skjemablokk
                        tittel={`Hvor lang periode med foreldrepenger ønsker ${
                            omForeldre.antallForeldre === 2 ? 'dere' : 'du'
                        }?`}>
                        <DekningsgradValg
                            dekningsgrad={dekningsgrad}
                            onChange={(dg) => dispatch(setDekningsgrad(dg as Dekningsgrad))}
                            dager100={dager100}
                            dager80={dager80}
                        />
                    </Skjemablokk>
                    {tilgjengeligeDager && dekningsgrad !== undefined && (
                        <Block>
                            <TilgjengeligeDagerOversikt
                                tilgjengeligeDager={tilgjengeligeDager}
                                dekningsgrad={dekningsgrad!}
                                visKontoliste={true}
                                omForeldre={omForeldre}
                            />
                        </Block>
                    )}

                    <Block visible={visInnhold}>
                        {tilgjengeligeDager !== undefined && omForeldre !== undefined && (
                            <>
                                {ønsketFordeling.harValgtFordeling === false && omForeldre.antallForeldre === 2 ? (
                                    <FordelingForeldrepenger
                                        navnMor={omForeldre.mor.navn}
                                        navnFarMedmor={omForeldre.farMedmor!.navn}
                                        tilgjengeligeUker={getTilgjengeligeUker(tilgjengeligeDager)}
                                        onChange={(uker) => dispatch(setØnsketFordeling(uker))}
                                    />
                                ) : (
                                    <Uttaksplan
                                        familiehendelsesdato={familiehendelsesdato}
                                        omForeldre={omForeldre}
                                        periodeFørTermin={periodeFørTermin}
                                        perioder={perioder}
                                        forbruk={forbruk!}
                                        onAdd={(periode) => dispatch(addPeriode(periode))}
                                        onUpdate={(periode) => periode.type === dispatch(updatePeriode(periode))}
                                        onRemove={(periode) => dispatch(removePeriode(periode))}
                                        onMove={(periode, toIndex) => dispatch(movePeriode(periode, toIndex))}
                                        onResetPlan={() => dispatch(setPerioder([]))}
                                        onResetApp={() => dispatch(resetApp())}
                                        onNyPeriodeChange={(periode) => dispatch(nyPeriodeChange(periode))}
                                        onSlåSammenPerioder={(p1, p2) => dispatch(slåSammenPerioder(p1, p2))}
                                        uttaksdatoer={uttaksdatoer}
                                        regelTestresultat={regelTestresultat}
                                    />
                                )}
                            </>
                        )}
                    </Block>
                    <Block>
                        <ul>
                            {regelTestresultat.resultat.map((resultat, idx) => (
                                <li key={idx}>
                                    {resultat.test}: {resultat.passerer ? 'ok' : 'feiler'}
                                </li>
                            ))}
                        </ul>
                    </Block>
                </LoadContainer>
            </>
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
        regelTestresultat: state.common.regelTestresultat
    };
};

export default connect(mapStateToProps)(withRouter(UttaksplanSide));
