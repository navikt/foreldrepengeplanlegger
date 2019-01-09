import { Periode } from '../../types';
import { UttakActionKeys, UttakActionTypes } from '../actions/uttak/uttakActionDefinitions';

export const getDefaultUttakState = (): UttakState => ({
    perioder: []
});

export interface UttakState {
    perioder: Periode[];
}

const uttakReducer = (state = getDefaultUttakState(), action: UttakActionTypes): UttakState => {
    switch (action.type) {
        case UttakActionKeys.ADD_PERIODE:
            return { perioder: [...state.perioder, ...[action.periode]] };
    }
    return state;
};

export default uttakReducer;
