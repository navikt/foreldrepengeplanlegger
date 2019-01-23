import { Språkkode } from '../../../intl/types';
import { Periode, SituasjonSkjemadata } from '../../../types';
import { Dekningsgrad } from 'common/types';
import { History } from 'history';
import { TilgjengeligStønadskonto } from '../../../types/st\u00F8nadskontoer';

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
    'MOVE_PERIODE' = 'movePeriode'
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

export interface SetStønadskontoerAction {
    type: CommonActionKeys.SET_STØNADSKONTOER;
    stønadskontoer: TilgjengeligStønadskonto[];
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
    | SubmitSkjemadataAction;
