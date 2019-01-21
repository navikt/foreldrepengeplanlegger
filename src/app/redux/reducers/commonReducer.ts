import { CommonActionKeys, CommonActionTypes } from '../actions/common/commonActionDefinitions';
import { Språkkode } from '../../intl/types';
import { Periode, Søknadsinfo } from '../../types';
import { UttaksplanBuilder } from '../../utils/Builder';
import { SituasjonsskjemaFormValues } from '../../components/situasjonsskjema/SituasjonsskjemaForm';
import { mockPerioder } from '../../mock/perioder_mock';

export const getDefaultCommonState = (): CommonState => ({
    språkkode: 'nb',
    perioder: [...mockPerioder],
    familiehendelsesdato: new Date()
});

export interface CommonState {
    språkkode: Språkkode;
    perioder: Periode[];
    skjemadata?: SituasjonsskjemaFormValues;
    søknadsinfo?: Søknadsinfo;
    familiehendelsesdato: Date;
}

const commonReducer = (state = getDefaultCommonState(), action: CommonActionTypes): CommonState => {
    const builder = UttaksplanBuilder(state.perioder, state.familiehendelsesdato);
    switch (action.type) {
        case CommonActionKeys.SET_SPRÅK:
            return { ...state, språkkode: action.språkkode };
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
