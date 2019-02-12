import { CommonActionKeys, CommonActionTypes } from '../actions/common/commonActionDefinitions';
import { Språkkode } from '../../intl/types';
import {
    Periode,
    SituasjonSkjemadata,
    TilgjengeligeDager,
    TilgjengeligStønadskonto,
    Forbruk,
    OmForeldre,
    Periodetype,
    UttakFørTerminPeriode
} from '../../types';
import { UttaksplanBuilder } from '../../utils/Builder';
import { Dekningsgrad } from 'common/types';
import { summerAntallDagerIKontoer, getPeriodeFørTermin } from '../../utils/kontoUtils';
import { setStorage, getStorage, clearStorage } from '../../utils/storage';
import { getUttaksinfoForPeriode } from '../../utils/uttaksinfo';
import { lagUttaksplan } from '../../utils/forslag/lagUttaksplan';
import { UttaksplanRegelTestresultat } from '../../utils/regler/types';

export interface ØnsketFordelingForeldrepenger {
    harValgtFordeling: boolean;
    ukerMor?: number;
    ukerFarMedmor?: number;
}

export interface CommonState {
    språkkode: Språkkode;
    perioder: Periode[];
    periodeFørTermin?: UttakFørTerminPeriode;
    nyPeriode: Periode | undefined;
    skjemadata?: SituasjonSkjemadata;
    familiehendelsesdato: Date;
    dekningsgrad?: Dekningsgrad;
    ønsketFordeling: ØnsketFordelingForeldrepenger;
    tilgjengeligeDager?: TilgjengeligeDager;
    stønadskontoer80: {
        dager: number;
        kontoer: TilgjengeligStønadskonto[];
    };
    stønadskontoer100: {
        dager: number;
        kontoer: TilgjengeligStønadskonto[];
    };
    forbruk?: Forbruk;
    omForeldre?: OmForeldre;
    regelResultat: UttaksplanRegelTestresultat;
}

export const getDefaultCommonState = (storage?: CommonState): CommonState => {
    return {
        språkkode: 'nb',
        perioder: [],
        familiehendelsesdato: new Date(),
        dekningsgrad: undefined,
        stønadskontoer100: {
            kontoer: [],
            dager: 0
        },
        stønadskontoer80: {
            kontoer: [],
            dager: 0
        },
        periodeFørTermin: undefined,
        ønsketFordeling: {
            harValgtFordeling: false
        },
        ...storage,
        nyPeriode: undefined, // Skal ikke brukes dersom den er mellomlagret
        regelResultat: {
            resultat: [],
            resultatPerPeriode: {}
        }
    };
};

const updateStateAndStorage = (state: CommonState, updates: Partial<CommonState>): CommonState => {
    const updatedState = { ...state, ...updates };
    setStorage(updatedState);
    return updatedState;
};

const commonReducer = (state = getDefaultCommonState(getStorage()), action: CommonActionTypes): CommonState => {
    const getBuilder = () => {
        return UttaksplanBuilder(state.perioder, state.familiehendelsesdato);
    };
    switch (action.type) {
        case CommonActionKeys.SET_SPRÅK:
            return { ...state, språkkode: action.språkkode };
        case CommonActionKeys.APPLY_STORAGE:
            return { ...state, ...action.storage };
        case CommonActionKeys.UPDATE_FORBRUK:
            return updateStateAndStorage(state, { forbruk: action.forbruk });
        case CommonActionKeys.UPDATE_TILGJENGELIGE_DAGER:
            return updateStateAndStorage(state, {
                tilgjengeligeDager: action.tilgjengeligeDager
            });
        case CommonActionKeys.SUBMIT_SKJEMADATA:
            const builder = getBuilder();
            return updateStateAndStorage(state, {
                skjemadata: action.data,
                familiehendelsesdato: action.data.familiehendelsesdato,
                perioder: builder.build().perioder,
                periodeFørTermin: state.tilgjengeligeDager
                    ? getPeriodeFørTermin(
                          action.data.situasjon,
                          action.data.familiehendelsesdato,
                          state.tilgjengeligeDager.dagerFørTermin,
                          action.data.erMor
                      )
                    : getPeriodeFørTermin(
                          action.data.situasjon,
                          action.data.familiehendelsesdato,
                          15,
                          action.data.erMor
                      ) // TODO - mock
            });
        case CommonActionKeys.SET_DEKNINGSGRAD:
            return updateStateAndStorage(state, {
                dekningsgrad: action.dekningsgrad
            });
        case CommonActionKeys.NY_PERIODE_CHANGE:
            return updateStateAndStorage(state, {
                nyPeriode: action.periode
            });
        case CommonActionKeys.UPDATE_OM_FORELDRE:
            return updateStateAndStorage(state, { omForeldre: action.omForeldre });
        case CommonActionKeys.SET_STØNADSKONTOER:
            const stønadskontoer80 = action.kontoer.dekning80;
            const stønadskontoer100 = action.kontoer.dekning100;
            return updateStateAndStorage(state, {
                stønadskontoer100: {
                    kontoer: stønadskontoer100,
                    dager: summerAntallDagerIKontoer(stønadskontoer100)
                },
                stønadskontoer80: {
                    kontoer: stønadskontoer80,
                    dager: summerAntallDagerIKontoer(stønadskontoer80)
                }
            });
        case CommonActionKeys.ADD_PERIODE:
            return updateStateAndStorage(state, {
                nyPeriode: undefined,
                perioder: getBuilder()
                    .leggTilPeriode(action.periode)
                    .build()
                    .perioder.map((p) => ({ ...p, uttaksinfo: getUttaksinfoForPeriode(p) }))
            });
        case CommonActionKeys.UPDATE_PERIODE:
            if (action.periode.type === Periodetype.UttakFørTermin) {
                return updateStateAndStorage(state, {
                    periodeFørTermin: {
                        ...action.periode,
                        uttaksinfo: getUttaksinfoForPeriode(action.periode)
                    }
                });
            }
            return updateStateAndStorage(state, {
                perioder: getBuilder()
                    .oppdaterPeriode(action.periode)
                    .build()
                    .perioder.map((p) => ({ ...p, uttaksinfo: getUttaksinfoForPeriode(p) }))
            });
        case CommonActionKeys.REMOVE_PERIODE:
            return updateStateAndStorage(state, {
                perioder: getBuilder()
                    .fjernPeriode(action.periode)
                    .build().perioder
            });
        case CommonActionKeys.SLÅ_SAMMEN_PERIODER:
            return updateStateAndStorage(state, {
                perioder: getBuilder()
                    .slåSammenPerioder(action.periode1, action.periode2)
                    .build()
                    .perioder.map((p) => ({ ...p, uttaksinfo: getUttaksinfoForPeriode(p) }))
            });
        case CommonActionKeys.SET_PERIODER:
            return updateStateAndStorage(state, {
                perioder: action.perioder,
                ønsketFordeling:
                    action.perioder.length === 0
                        ? {
                              ...state.ønsketFordeling,
                              harValgtFordeling: false
                          }
                        : state.ønsketFordeling
            });
        case CommonActionKeys.SET_ØNSKET_FORDELING:
            const perioder = lagUttaksplan(
                state.familiehendelsesdato,
                state.dekningsgrad === '100' ? state.stønadskontoer100.kontoer : state.stønadskontoer80.kontoer,
                action.ukerMor
            );
            return updateStateAndStorage(state, {
                ønsketFordeling: {
                    harValgtFordeling: true,
                    ukerMor: action.ukerMor,
                    ukerFarMedmor: state.tilgjengeligeDager!.dagerFelles - action.ukerMor
                },
                perioder
            });
        case CommonActionKeys.SET_UTTAKSPLAN_VALIDERING:
            return {
                ...state,
                regelResultat: action.validering
            };

        case CommonActionKeys.RESET_APP:
            clearStorage();
            return updateStateAndStorage(getDefaultCommonState(), {});
    }
    return state;
};

export default commonReducer;
