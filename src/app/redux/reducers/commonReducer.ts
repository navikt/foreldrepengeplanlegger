import { CommonActionKeys, CommonActionTypes, SubmitSkjemadataAction } from '../actions/common/commonActionDefinitions';
import { Språkkode } from '../../intl/types';
import {
    Periode,
    SituasjonSkjemadata,
    TilgjengeligeDager,
    TilgjengeligStønadskonto,
    Forbruk,
    OmForeldre,
    Periodetype,
    UttakFørTerminPeriode,
    isKomplettPeriode
} from '../../types';
import { UttaksplanBuilder } from '../../utils/Builder';
import { Dekningsgrad } from 'common/types';
import { summerAntallDagerIKontoer, getPeriodeFørTermin } from '../../utils/kontoUtils';
import { setStorage, getStorage, clearStorage } from '../../utils/storage';
import { getUttaksinfoForPeriode } from '../../utils/uttaksinfo';
import { lagUttaksplan } from '../../utils/forslag/lagUttaksplan';
import { UttaksplanRegelTestresultat } from '../../utils/regler/types';
import { guid } from 'nav-frontend-js-utils';

export interface ØnsketFordelingForeldrepenger {
    harValgtFordeling: boolean;
    ukerMor?: number;
}

export interface CommonState {
    språkkode: Språkkode;
    perioder: Periode[];
    periodeFørTermin?: UttakFørTerminPeriode;
    nyPeriode: Periode | undefined;
    nyPeriodeId: string;
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
    regelTestresultat: UttaksplanRegelTestresultat;
}

export const getDefaultCommonState = (storage?: CommonState): CommonState => {
    return {
        språkkode: 'nb',
        perioder: [],
        nyPeriodeId: guid(),
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
        regelTestresultat: {
            resultat: [],
            avvikPerPeriode: {},
            avvik: []
        }
    };
};

const updateStateAndStorage = (state: CommonState, updates: Partial<CommonState>): CommonState => {
    const updatedState = { ...state, ...updates };
    setStorage(updatedState);
    return updatedState;
};

const updateStateWithNewSkjemadata = (state: CommonState, action: SubmitSkjemadataAction): CommonState => {
    return {
        ...getDefaultCommonState(),
        språkkode: state.språkkode,
        skjemadata: action.data,
        ønsketFordeling: {
            harValgtFordeling: false,
            ukerMor: undefined
        },
        dekningsgrad: undefined,
        familiehendelsesdato: action.data.familiehendelsesdato
    };
};

const lagForslagTilPlan = (state: CommonState): CommonState => {
    if (state.skjemadata && state.omForeldre && state.tilgjengeligeDager) {
        const perioder = lagUttaksplan(
            state.skjemadata.situasjon,
            state.familiehendelsesdato,
            state.dekningsgrad === '100' ? state.stønadskontoer100.kontoer : state.stønadskontoer80.kontoer,
            state.ønsketFordeling.ukerMor !== undefined ? state.ønsketFordeling.ukerMor * 5 : undefined
        );
        return updateStateAndStorage(state, {
            periodeFørTermin: getPeriodeFørTermin(
                state.skjemadata.situasjon,
                state.familiehendelsesdato,
                state.tilgjengeligeDager.dagerForeldrepengerFørFødsel,
                state.omForeldre.bareMor
            ),
            perioder
        });
    }
    return state;
};

const commonReducer = (state = getDefaultCommonState(getStorage()), action: CommonActionTypes): CommonState => {
    const getBuilder = () => {
        return UttaksplanBuilder(state.perioder, state.familiehendelsesdato);
    };
    switch (action.type) {
        case CommonActionKeys.SET_SPRÅK:
            return updateStateAndStorage(state, { ...state, språkkode: action.språkkode });
        case CommonActionKeys.APPLY_STORAGE:
            return { ...state, ...action.storage };
        case CommonActionKeys.UPDATE_FORBRUK:
            return updateStateAndStorage(state, { forbruk: action.forbruk });
        case CommonActionKeys.UPDATE_TILGJENGELIGE_DAGER:
            return updateStateAndStorage(state, {
                tilgjengeligeDager: action.tilgjengeligeDager
            });
        case CommonActionKeys.SUBMIT_SKJEMADATA:
            return updateStateWithNewSkjemadata(state, action);
        case CommonActionKeys.SET_DEKNINGSGRAD:
            return updateStateAndStorage(state, { dekningsgrad: action.dekningsgrad });
        case CommonActionKeys.NY_PERIODE_CHANGE:
            return updateStateAndStorage(state, {
                nyPeriode: isKomplettPeriode(action.periode)
                    ? { ...action.periode, uttaksinfo: getUttaksinfoForPeriode(action.periode) }
                    : undefined
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
                nyPeriodeId: guid(),
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
                ønsketFordeling: action.resetØnsketFordeling ? { harValgtFordeling: false } : state.ønsketFordeling
            });
        case CommonActionKeys.SET_ØNSKET_FORDELING:
            if (state.skjemadata && state.tilgjengeligeDager) {
                return lagForslagTilPlan({
                    ...state,
                    ønsketFordeling: {
                        harValgtFordeling: true,
                        ukerMor: action.ukerMor
                    }
                });
            }
        case CommonActionKeys.LAG_FORSLAG_TIL_PLAN:
            return lagForslagTilPlan(state);
        case CommonActionKeys.SET_UTTAKSPLAN_VALIDERING:
            return {
                ...state,
                regelTestresultat: action.validering
            };

        case CommonActionKeys.RESET_APP:
            clearStorage();
            return updateStateAndStorage(getDefaultCommonState(), {});

        case CommonActionKeys.RESET_PLAN:
            return {
                ...state,
                ønsketFordeling: action.resetØnsketFordeling ? { harValgtFordeling: false } : state.ønsketFordeling,
                perioder: []
            };
    }
    return state;
};

export default commonReducer;
