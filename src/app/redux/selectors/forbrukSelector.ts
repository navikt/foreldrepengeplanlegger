import { createSelector } from 'reselect';
import { AppState } from '../reducers/rootReducer';
import { Forbruk, TilgjengeligeDager, Periode } from '../../types';
import { getForbruk } from '../../utils/forbrukUtils';

const getState = (state: AppState): AppState => state;

export const selectPerioder = createSelector(
    [getState],
    (state): Periode[] => state.common.perioder
);

export const selectTilgjengeligeDager = createSelector(
    [getState],
    (state): TilgjengeligeDager | undefined => state.common.tilgjengeligeDager
);

export const selectForbruk = createSelector(
    [selectPerioder, selectTilgjengeligeDager],
    (perioder, tilgjengeligeDager): Forbruk | undefined => {
        if (perioder && tilgjengeligeDager) {
            return getForbruk(perioder, tilgjengeligeDager.dagerTotalt);
        }
        return undefined;
    }
);
