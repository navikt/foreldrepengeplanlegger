import { PlanleggerActionTypes, PlanleggerActionTypeKeys } from 'app/redux/actions/actionTypes';
import { UtsettelseState } from '../types';
import { Utsettelse } from 'app/types';
import { guid } from 'nav-frontend-js-utils';

const defaultState: UtsettelseState = {
	dialogErApen: false,
	utsettelser: []
};

const opprettEllerOppdaterUtsettelse = (state: UtsettelseState, utsettelse: Utsettelse): UtsettelseState => {
	return {
		...state,
		utsettelser: [
			...state.utsettelser,
			{
				...utsettelse,
				id: guid()
			}
		],
		dialogErApen: false
	};
};

const UtsettelseReducer = (state = defaultState, action: PlanleggerActionTypes) => {
	switch (action.type) {
		case PlanleggerActionTypeKeys.UTSETTELSE_VIS_DIALOG:
			return { ...state, dialogErApen: true } as UtsettelseState;
		case PlanleggerActionTypeKeys.UTSETTELSE_LUKK_DIALOG:
			return { ...state, dialogErApen: false } as UtsettelseState;
		case PlanleggerActionTypeKeys.UTSETTELSE_OPPRETT_ELLER_OPPDATER:
			return opprettEllerOppdaterUtsettelse(state, action.utsettelse);
		default:
			return state;
	}
};

export default UtsettelseReducer;
