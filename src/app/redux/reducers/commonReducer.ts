import { CommonActionKeys, CommonActionTypes } from '../actions/common/commonActionDefinitions';
import { Språkkode } from '../../intl/types';
import { Periode, SituasjonSkjemadata, Situasjon, TilgjengeligeDager, TilgjengeligStønadskonto } from '../../types';
import { UttaksplanBuilder } from '../../utils/Builder';
import { mockPerioder } from '../../mock/perioder_mock';
import { Dekningsgrad } from 'common/types';
import { getTilgjengeligeDager, summerAntallDagerIKontoer } from '../../utils/kontoUtils';

export const getDefaultCommonState = (): CommonState => ({
    språkkode: 'nb',
    perioder: [...mockPerioder],
    familiehendelsesdato: new Date(),
    dekningsgrad: '100',
    skjemadata: {
        antallBarn: 1,
        familiehendelsesdato: new Date(),
        navnForelder1: 'Henrik',
        navnForelder2: 'Amalie',
        situasjon: Situasjon.farOgMor
    },
    stønadskontoer100: {
        kontoer: [],
        dager: 0
    },
    stønadskontoer80: {
        kontoer: [],
        dager: 0
    }
});

export interface CommonState {
    språkkode: Språkkode;
    perioder: Periode[];
    skjemadata?: SituasjonSkjemadata;
    familiehendelsesdato: Date;
    dekningsgrad: Dekningsgrad;
    tilgjengeligeDager?: TilgjengeligeDager;
    stønadskontoer80: {
        dager: number;
        kontoer: TilgjengeligStønadskonto[];
    };
    stønadskontoer100: {
        dager: number;
        kontoer: TilgjengeligStønadskonto[];
    };
}

const commonReducer = (state = getDefaultCommonState(), action: CommonActionTypes): CommonState => {
    const builder = UttaksplanBuilder(state.perioder, state.familiehendelsesdato);
    switch (action.type) {
        case CommonActionKeys.SET_SPRÅK:
            return { ...state, språkkode: action.språkkode };
        case CommonActionKeys.SUBMIT_SKJEMADATA:
            return { ...state, skjemadata: action.data };
        case CommonActionKeys.SET_DEKNINGSGRAD:
            return {
                ...state,
                dekningsgrad: action.dekningsgrad,
                tilgjengeligeDager: getTilgjengeligeDager(
                    action.dekningsgrad === '100' ? state.stønadskontoer100.kontoer : state.stønadskontoer80.kontoer
                )
            };
        case CommonActionKeys.SET_STØNADSKONTOER:
            const stønadskontoer80 = action.kontoer.dekning80;
            const stønadskontoer100 = action.kontoer.dekning100;
            return {
                ...state,
                stønadskontoer100: {
                    kontoer: stønadskontoer100,
                    dager: summerAntallDagerIKontoer(stønadskontoer100)
                },
                stønadskontoer80: {
                    kontoer: stønadskontoer80,
                    dager: summerAntallDagerIKontoer(stønadskontoer80)
                },
                tilgjengeligeDager: getTilgjengeligeDager(
                    state.dekningsgrad === '100' ? stønadskontoer100 : stønadskontoer80
                )
            };
        case CommonActionKeys.ADD_PERIODE:
            return {
                ...state,
                perioder: builder.leggTilPeriode(action.periode).build().perioder
            };
        case CommonActionKeys.UPDATE_PERIODE:
            return {
                ...state,
                perioder: builder.oppdaterPeriode(action.periode).build().perioder
            };
        case CommonActionKeys.REMOVE_PERIODE:
            return {
                ...state,
                perioder: builder.fjernPeriode(action.periode).build().perioder
            };
        case CommonActionKeys.MOVE_PERIODE:
            return {
                ...state,
                perioder: builder.flyttPeriode(action.periode, action.toIndex).build().perioder
            };
        case CommonActionKeys.SET_PERIODER:
            return { ...state, perioder: action.perioder };
    }
    return state;
};

export default commonReducer;
