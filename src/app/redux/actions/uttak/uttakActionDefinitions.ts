import { Periode } from '../../../types';

export enum UttakActionKeys {
    'UPDATE_PERIODE' = 'updatePeriode',
    'DELETE_PERIODE' = 'deletePeriode',
    'ADD_PERIODE' = 'addPeriode'
}

interface UpdatePeriodeAction {
    type: UttakActionKeys.UPDATE_PERIODE;
    periode: Periode;
}

interface DeletePeriodeAction {
    type: UttakActionKeys.DELETE_PERIODE;
    periode: Periode;
}

interface AddPeriodeAction {
    type: UttakActionKeys.ADD_PERIODE;
    periode: Periode;
}

export type UttakActionTypes = UpdatePeriodeAction | AddPeriodeAction | DeletePeriodeAction;
