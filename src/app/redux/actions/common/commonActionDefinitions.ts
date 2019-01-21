import { Språkkode } from '../../../intl/types';
import { Periode, SituasjonSkjemadata } from '../../../types';
import { Dekningsgrad } from 'common/types';

export enum CommonActionKeys {
    'SET_SPRÅK' = 'setSpråk',
    'SET_DEKNINGSGRAD' = 'setDekningsgrad',
    'SET_SKJEMADATA' = 'setSkjemadata',
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

interface SetSkjemadata {
    type: CommonActionKeys.SET_SKJEMADATA;
    data: SituasjonSkjemadata;
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
    | SetDekningsgrad
    | AddPeriode
    | UpdatePeriode
    | RemovePeriode
    | MovePeriode
    | SetSkjemadata;
