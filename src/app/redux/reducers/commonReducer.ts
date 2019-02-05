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
    UttakFørTerminPeriode,
    Forelder
} from '../../types';
import { UttaksplanBuilder } from '../../utils/Builder';
import { getMockPerioder } from '../../mock/perioder_mock';
import { Dekningsgrad } from 'common/types';
import { summerAntallDagerIKontoer, getPeriodeFørTermin } from '../../utils/kontoUtils';
import { setStorage, getStorage } from '../../utils/storage';
import { getAntallForeldreISituasjon } from '../../utils/common';
import { guid } from 'nav-frontend-js-utils';
import { getUttaksinfoForPeriode } from '../../utils/uttaksinfo';

export interface ØnsketFordelingForeldrepenger {
    harValgtFordeling: boolean;
    ukerMor?: number;
    ukerFarMedmor?: number;
}

export interface CommonState {
    språkkode: Språkkode;
    perioder: Periode[];
    periodeFørTermin: UttakFørTerminPeriode;
    skjemadata?: SituasjonSkjemadata;
    familiehendelsesdato: Date;
    dekningsgrad: Dekningsgrad;
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
}

export const getDefaultCommonState = (storage?: CommonState): CommonState => {
    return {
        språkkode: 'nb',
        perioder: [],
        familiehendelsesdato: new Date(),
        dekningsgrad: '100',
        stønadskontoer100: {
            kontoer: [],
            dager: 0
        },
        stønadskontoer80: {
            kontoer: [],
            dager: 0
        },
        periodeFørTermin: {
            id: guid(),
            type: Periodetype.UttakFørTermin,
            forelder: Forelder.mor,
            tidsperiode: { fom: new Date(), tom: new Date() }
        },
        ønsketFordeling: {
            harValgtFordeling: false
        },
        ...storage
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
            return updateStateAndStorage(state, { tilgjengeligeDager: action.tilgjengeligeDager });
        case CommonActionKeys.SUBMIT_SKJEMADATA:
            const builder = getBuilder();
            builder.perioder = getMockPerioder(
                action.data.antallBarn,
                getAntallForeldreISituasjon(action.data.situasjon)
            );
            return updateStateAndStorage(state, {
                skjemadata: action.data,
                familiehendelsesdato: action.data.familiehendelsesdato,
                perioder: builder.build().perioder,
                periodeFørTermin: state.tilgjengeligeDager
                    ? getPeriodeFørTermin(state.familiehendelsesdato, state.tilgjengeligeDager.dagerFørTermin)
                    : getPeriodeFørTermin(state.familiehendelsesdato, 15) // TODO - mock
            });
        case CommonActionKeys.SET_DEKNINGSGRAD:
            return updateStateAndStorage(state, {
                dekningsgrad: action.dekningsgrad
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
            return updateStateAndStorage(state, {
                ønsketFordeling: {
                    harValgtFordeling: true,
                    ukerMor: action.ukerMor,
                    ukerFarMedmor: state.tilgjengeligeDager!.dagerFelles - action.ukerMor
                }
                // perioder: lagForslagTilPlan()
            });
        case CommonActionKeys.RESET_APP:
            return updateStateAndStorage(getDefaultCommonState(), {});
    }
    return state;
};

export default commonReducer;
