import { CommonActionKeys, CommonActionTypes } from '../actions/common/commonActionDefinitions';
import { Språkkode } from '../../intl/types';
import {
    Periode,
    SituasjonSkjemadata,
    TilgjengeligeDager,
    TilgjengeligStønadskonto,
    Forbruk,
    OmForeldre
} from '../../types';
import { UttaksplanBuilder } from '../../utils/Builder';
import { getMockPerioder } from '../../mock/perioder_mock';
import { Dekningsgrad } from 'common/types';
import { summerAntallDagerIKontoer } from '../../utils/kontoUtils';
import { setStorage, getStorage } from '../../utils/storage';
import { getAntallForeldreISituasjon } from '../../utils/common';

export const getDefaultCommonState = (storage?: CommonState): CommonState => {
    return {
        språkkode: 'nb',
        perioder: [],
        familiehendelsesdato: new Date(),
        dekningsgrad: '100',
        uttaksdagerFørTermin: 15,
        stønadskontoer100: {
            kontoer: [],
            dager: 0
        },
        stønadskontoer80: {
            kontoer: [],
            dager: 0
        },
        ...storage
    };
};

export interface CommonState {
    språkkode: Språkkode;
    perioder: Periode[];
    skjemadata?: SituasjonSkjemadata;
    familiehendelsesdato: Date;
    dekningsgrad: Dekningsgrad;
    tilgjengeligeDager?: TilgjengeligeDager;
    uttaksdagerFørTermin: number;
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

const updateStateAndStorage = (state: CommonState, updates: Partial<CommonState>): CommonState => {
    const updatedState = { ...state, ...updates };
    setStorage(updatedState);
    return updatedState;
};

const commonReducer = (state = getDefaultCommonState(getStorage()), action: CommonActionTypes): CommonState => {
    const builder = UttaksplanBuilder(state.perioder, state.familiehendelsesdato);
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
            return updateStateAndStorage(state, {
                skjemadata: action.data,
                perioder: getMockPerioder(action.data.antallBarn, getAntallForeldreISituasjon(action.data.situasjon))
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
            return updateStateAndStorage(state, { perioder: builder.leggTilPeriode(action.periode).build().perioder });
        case CommonActionKeys.UPDATE_PERIODE:
            return updateStateAndStorage(state, {
                perioder: builder.oppdaterPeriode(action.periode).build().perioder
            });
        case CommonActionKeys.REMOVE_PERIODE:
            return updateStateAndStorage(state, {
                perioder: builder.fjernPeriode(action.periode).build().perioder
            });
        case CommonActionKeys.MOVE_PERIODE:
            return updateStateAndStorage(state, {
                perioder: builder.flyttPeriode(action.periode, action.toIndex).build().perioder
            });
        case CommonActionKeys.SET_PERIODER:
            return updateStateAndStorage(state, { perioder: action.perioder });
        case CommonActionKeys.RESET_APP:
            return updateStateAndStorage(getDefaultCommonState(), {});
    }
    return state;
};

export default commonReducer;
