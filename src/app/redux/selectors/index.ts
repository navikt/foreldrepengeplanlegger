import { createSelector } from 'reselect';
import { AppState } from '../reducers/rootReducer';
import { Forbruk, TilgjengeligeDager, Periode, SituasjonSkjemadata } from '../../types';
import { getForbruk } from '../../utils/forbrukUtils';
import { getTilgjengeligeDager } from '../../utils/kontoUtils';

const getState = (state: AppState): AppState => state;

export const selectPerioder = createSelector(
    [getState],
    (state): Periode[] => state.common.perioder
);

export const selectPeriodeFørTermin = createSelector(
    [getState],
    (state): Periode | undefined => state.common.periodeFørTermin
);

export const selectPeriodeSomSkalLeggesTil = createSelector(
    [getState],
    (state): Periode | undefined => state.common.nyPeriode
);

export const selectSkjemadata = createSelector(
    [getState],
    (state): SituasjonSkjemadata | undefined => state.common.skjemadata
);

export const selectTilgjengeligeDager = createSelector(
    [getState, selectSkjemadata],
    (state, skjemadata): TilgjengeligeDager | undefined => {
        return skjemadata && skjemadata.situasjon
            ? getTilgjengeligeDager(
                  skjemadata.situasjon,
                  state.common.dekningsgrad === '100'
                      ? state.common.stønadskontoer100.kontoer
                      : state.common.stønadskontoer80.kontoer,
                  skjemadata.erMor
              )
            : undefined;
    }
);

export const selectForbruk = createSelector(
    [selectPeriodeFørTermin, selectPerioder, selectTilgjengeligeDager, selectPeriodeSomSkalLeggesTil],
    (periodeFørTermin, perioder, tilgjengeligeDager, nyPeriode): Forbruk | undefined => {
        if (perioder && tilgjengeligeDager) {
            const forbruksperioder = [...perioder];
            if (nyPeriode) {
                forbruksperioder.push(nyPeriode);
            }
            if (periodeFørTermin) {
                forbruksperioder.push(periodeFørTermin);
            }
            return getForbruk(forbruksperioder, tilgjengeligeDager.dagerEtterTermin);
        }
        return undefined;
    }
);
