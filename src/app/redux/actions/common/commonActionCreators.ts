import { CommonActionKeys, CommonActionTypes } from './commonActionDefinitions';
import { Språkkode } from '../../../intl/types';
import { Periode, SituasjonSkjemadata } from '../../../types';
import { Dekningsgrad } from 'common/types';
import { History } from 'history';

export function setSpråk(språkkode: Språkkode): CommonActionTypes {
    return {
        type: CommonActionKeys.SET_SPRÅK,
        språkkode
    };
}

export function submitSkjemadata(data: SituasjonSkjemadata, history: History): CommonActionTypes {
    return {
        type: CommonActionKeys.SUBMIT_SKJEMADATA,
        data,
        history
    };
}

export function setDekningsgrad(dekningsgrad: Dekningsgrad): CommonActionTypes {
    return {
        type: CommonActionKeys.SET_DEKNINGSGRAD,
        dekningsgrad
    };
}

export function setPerioder(perioder: Periode[]): CommonActionTypes {
    return {
        type: CommonActionKeys.SET_PERIODER,
        perioder
    };
}

export function addPeriode(periode: Periode): CommonActionTypes {
    return {
        type: CommonActionKeys.ADD_PERIODE,
        periode
    };
}

export function updatePeriode(periode: Periode): CommonActionTypes {
    return {
        type: CommonActionKeys.UPDATE_PERIODE,
        periode
    };
}

export function removePeriode(periode: Periode): CommonActionTypes {
    return {
        type: CommonActionKeys.REMOVE_PERIODE,
        periode
    };
}

export function movePeriode(periode: Periode, toIndex: number): CommonActionTypes {
    return {
        type: CommonActionKeys.MOVE_PERIODE,
        periode,
        toIndex
    };
}

export default {
    setSpråk
};
