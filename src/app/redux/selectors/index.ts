import { createSelector } from 'reselect';
import { AppState } from '../reducers/rootReducer';
import { Periode, SituasjonSkjemadata } from '../../types';
import { getForbruk } from '../../utils/forbrukUtils';
import { getTilgjengeligeDager } from '../../utils/kontoUtils';
import { OmForeldre, Forbruk, TilgjengeligeDager } from 'shared/types';

const getState = (state: AppState): AppState => state;

export const selectPerioder = createSelector(
    [getState],
    (state): Periode[] => state.common.present.perioder
);

export const selectPeriodeFørTermin = createSelector(
    [getState],
    (state): Periode | undefined => state.common.present.periodeFørTermin
);

export const selectPeriodeSomSkalLeggesTil = createSelector(
    [getState],
    (state): Periode | undefined => state.common.present.nyPeriode
);

export const selectSkjemadata = createSelector(
    [getState],
    (state): SituasjonSkjemadata | undefined => state.common.present.skjemadata
);

export const selectOmForelder = createSelector(
    [getState],
    (state): OmForeldre | undefined => state.common.present.omForeldre
);

export const selectTilgjengeligeDager = createSelector(
    [getState, selectSkjemadata],
    (state, skjemadata): TilgjengeligeDager | undefined => {
        return skjemadata && skjemadata.situasjon
            ? getTilgjengeligeDager(
                  skjemadata.situasjon,
                  state.common.present.dekningsgrad === '100'
                      ? state.common.present.stønadskontoer100.kontoer
                      : state.common.present.stønadskontoer80.kontoer,
                  skjemadata.forelderVedAleneomsorg
              )
            : undefined;
    }
);

export const selectForbruk = createSelector(
    [selectPeriodeFørTermin, selectPerioder, selectTilgjengeligeDager, selectPeriodeSomSkalLeggesTil, selectOmForelder],
    (periodeFørTermin, perioder, tilgjengeligeDager, nyPeriode, omForeldre): Forbruk | undefined => {
        if (perioder && tilgjengeligeDager && omForeldre) {
            const forbruksperioder = [...perioder];
            if (nyPeriode) {
                forbruksperioder.push(nyPeriode);
            }
            if (periodeFørTermin) {
                forbruksperioder.push(periodeFørTermin);
            }
            return getForbruk(forbruksperioder, tilgjengeligeDager, omForeldre);
        }
        return undefined;
    }
);
