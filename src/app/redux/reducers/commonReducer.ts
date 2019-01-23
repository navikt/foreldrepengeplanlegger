import { CommonActionKeys, CommonActionTypes } from '../actions/common/commonActionDefinitions';
import { Språkkode } from '../../intl/types';
import { Periode, SituasjonSkjemadata, Situasjon } from '../../types';
import { UttaksplanBuilder } from '../../utils/Builder';
import { mockPerioder } from '../../mock/perioder_mock';
import { TilgjengeligeDager } from '../../types/st\u00F8nadskontoer';
import { Dekningsgrad } from 'common/types';
import { getTilgjengeligeDagerFraKontoer } from '../../utils/st\u00F8nadskontoer';

export const getDefaultCommonState = (): CommonState => ({
    språkkode: 'nb',
    perioder: [...mockPerioder],
    familiehendelsesdato: new Date(),
    tilgjengeligeDager: {
        kontoer: [],
        dekningsgrad80: { totaltAntallDager: 0 },
        dekningsgrad100: { totaltAntallDager: 0 },
        harTilgjengeligeDager: false
    },
    skjemadata: {
        antallBarn: 1,
        familiehendelsesdato: new Date(),
        navnForelder1: 'Henrik',
        navnForelder2: 'Amalie',
        situasjon: Situasjon.farOgMor
    }
});

export interface CommonState {
    språkkode: Språkkode;
    perioder: Periode[];
    skjemadata?: SituasjonSkjemadata;
    familiehendelsesdato: Date;
    dekningsgrad?: Dekningsgrad;
    tilgjengeligeDager: TilgjengeligeDager;
}

const commonReducer = (state = getDefaultCommonState(), action: CommonActionTypes): CommonState => {
    const builder = UttaksplanBuilder(state.perioder, state.familiehendelsesdato);
    switch (action.type) {
        case CommonActionKeys.SET_SPRÅK:
            return { ...state, språkkode: action.språkkode };
        case CommonActionKeys.SUBMIT_SKJEMADATA:
            return { ...state, skjemadata: action.data };
        case CommonActionKeys.SET_DEKNINGSGRAD:
            return { ...state, dekningsgrad: action.dekningsgrad };
        case CommonActionKeys.SET_STØNADSKONTOER:
            return {
                ...state,
                tilgjengeligeDager: getTilgjengeligeDagerFraKontoer(action.stønadskontoer)
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
