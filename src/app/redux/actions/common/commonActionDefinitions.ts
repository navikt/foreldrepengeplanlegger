import { Språkkode } from '../../../intl/types';
import { Periode, SituasjonSkjemadata, TilgjengeligStønadskonto, Forbruk } from '../../../types';
import { Dekningsgrad } from 'common/types';
import { History } from 'history';
import { CommonState } from '../../reducers/commonReducer';

export enum CommonActionKeys {
    'SET_SPRÅK' = 'setSpråk',
    'SET_DEKNINGSGRAD' = 'setDekningsgrad',
    'SUBMIT_SKJEMADATA' = 'submitSkjemadata',
    'GET_STØNADSKONTOER' = 'getStonadskontoer',
    'SET_STØNADSKONTOER' = 'setStonadskontoer',
    'SET_PERIODER' = 'setPerioder',
    'ADD_PERIODE' = 'addPeriode',
    'UPDATE_PERIODE' = 'updatePeriode',
    'REMOVE_PERIODE' = 'removePeriode',
    'MOVE_PERIODE' = 'movePeriode',
    'APPLY_STORAGE' = 'applyStorage',
    'UPDATE_FORBRUK' = 'updateForbruk'
}

interface SetSpråk {
    type: CommonActionKeys.SET_SPRÅK;
    språkkode: Språkkode;
}

export interface SubmitSkjemadataAction {
    type: CommonActionKeys.SUBMIT_SKJEMADATA;
    data: SituasjonSkjemadata;
    history: History;
}

export interface GetStønadskontoerAction {
    type: CommonActionKeys.GET_STØNADSKONTOER;
    history: History;
}

export interface SetStønadskontoerKontoerPayload {
    dekning80: TilgjengeligStønadskonto[];
    dekning100: TilgjengeligStønadskonto[];
}

export interface SetStønadskontoerAction {
    type: CommonActionKeys.SET_STØNADSKONTOER;
    kontoer: SetStønadskontoerKontoerPayload;
}

export interface ApplyStorage {
    type: CommonActionKeys.APPLY_STORAGE;
    storage: CommonState;
}

export interface UpdateForbruk {
    type: CommonActionKeys.UPDATE_FORBRUK;
    forbruk: Forbruk | undefined;
}

interface SetDekningsgrad {
    type: CommonActionKeys.SET_DEKNINGSGRAD;
    dekningsgrad: Dekningsgrad;
}

interface SetPerioder {
    type: CommonActionKeys.SET_PERIODER;
    perioder: Periode[];
}

interface AddPeriode {
    type: CommonActionKeys.ADD_PERIODE;
    periode: Periode;
}

interface UpdatePeriode {
    type: CommonActionKeys.UPDATE_PERIODE;
    periode: Periode;
}

interface RemovePeriode {
    type: CommonActionKeys.REMOVE_PERIODE;
    periode: Periode;
}

interface MovePeriode {
    type: CommonActionKeys.MOVE_PERIODE;
    periode: Periode;
    toIndex: number;
}

export type CommonActionTypes =
    | SetSpråk
    | SetPerioder
    | SetStønadskontoerAction
    | SetDekningsgrad
    | AddPeriode
    | UpdatePeriode
    | RemovePeriode
    | MovePeriode
    | SubmitSkjemadataAction
    | ApplyStorage
    | UpdateForbruk;
