import { PlanleggerActionTypes, PlanleggerActionTypeKeys } from 'app/redux/actions/actionTypes';
import { UtsettelseState } from '../types';

const defaultState: UtsettelseState = {
	isOpen: true,
	utsettelse: undefined
};

const UtsettelseReducer = (state = defaultState, action: PlanleggerActionTypes) => {
	switch (action.type) {
		case PlanleggerActionTypeKeys.UTSETTELSE_VIS_DIALOG:
			return { ...state, isOpen: true } as UtsettelseState;
		case PlanleggerActionTypeKeys.UTSETTELSE_LUKK_DIALOG:
			return { ...state, isOpen: false } as UtsettelseState;
		default:
			return state;
	}
};

export default UtsettelseReducer;
