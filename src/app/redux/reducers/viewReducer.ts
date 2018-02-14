import {
	PlanleggerActionTypes,
	PlanleggerActionTypeKeys
} from 'app/redux/actions/actionTypes';
import { ViewState, SynligInfoMap } from 'app/redux/types';

const defaultState: ViewState = {
	synligInfo: new Map()
};

const leggTilInfo = (infoMap: SynligInfoMap, id: string): SynligInfoMap => {
	const map = new Map(infoMap);
	map.set(id, true);
	return map;
};

const fjernInfo = (infoMap: SynligInfoMap, id: string): SynligInfoMap => {
	const map = new Map(infoMap);
	map.delete(id);
	return map;
};

const ViewReducer = (state = defaultState, action: PlanleggerActionTypes) => {
	switch (action.type) {
		case PlanleggerActionTypeKeys.INFO_VIS:
			return {
				...state,
				synligInfo: leggTilInfo(state.synligInfo, action.id)
			} as ViewState;
		case PlanleggerActionTypeKeys.INFO_SKJUL:
			return {
				...state,
				synligInfo: fjernInfo(state.synligInfo, action.id)
			} as ViewState;
		default:
			return state;
	}
};

export default ViewReducer;
