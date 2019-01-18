import { UttakActionTypes, UttakActionKeys } from './uttakActionDefinitions';
import { Periode } from '../../../types/periodetyper';

export function updatePeriode(periode: Periode): UttakActionTypes {
    return {
        type: UttakActionKeys.UPDATE_PERIODE,
        periode
    };
}
export function deletePeriode(periode: Periode): UttakActionTypes {
    return {
        type: UttakActionKeys.DELETE_PERIODE,
        periode
    };
}
export function addPeriode(periode: Periode): UttakActionTypes {
    return {
        type: UttakActionKeys.ADD_PERIODE,
        periode
    };
}

const uttakActions = {
    updatePeriode,
    deletePeriode,
    addPeriode
};

export default uttakActions;
