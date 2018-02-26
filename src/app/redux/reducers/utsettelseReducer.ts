import {
	PlanleggerActionTypes,
	PlanleggerActionTypeKeys
} from 'app/redux/actions/actionTypes';
import { UtsettelseState } from '../types';
import { Utsettelsesperiode } from 'app/types';
import { guid } from 'nav-frontend-js-utils';

const defaultState: UtsettelseState = {
	dialogErApen: false,
	utsettelser: []
};

const opprettEllerOppdaterUtsettelse = (
	state: UtsettelseState,
	utsettelse: Utsettelsesperiode
): UtsettelseState => {
	const utsettelser = utsettelse.id
		? state.utsettelser.map(
				(u, idx) =>
					u.id === utsettelse.id ? utsettelse : state.utsettelser[idx]
			)
		: [
				...state.utsettelser,
				{
					...utsettelse,
					id: guid()
				}
			];
	return {
		...state,
		utsettelser,
		dialogErApen: false
	};
};

const UtsettelseReducer = (
	state = defaultState,
	action: PlanleggerActionTypes
) => {
	switch (action.type) {
		case PlanleggerActionTypeKeys.SET_TERMINDATO:
			return defaultState;
		case PlanleggerActionTypeKeys.UTSETTELSE_VIS_DIALOG:
			return {
				...state,
				dialogErApen: true,
				valgtUtsettelse: action.utsettelse
			} as UtsettelseState;
		case PlanleggerActionTypeKeys.UTSETTELSE_LUKK_DIALOG:
			return {
				...state,
				dialogErApen: false,
				valgtUtsettelse: undefined
			} as UtsettelseState;
		case PlanleggerActionTypeKeys.UTSETTELSE_OPPRETT_ELLER_OPPDATER:
			return opprettEllerOppdaterUtsettelse(state, action.utsettelse);
		case PlanleggerActionTypeKeys.UTSETTELSE_SLETT:
			return {
				...state,
				utsettelser: state.utsettelser.filter(
					(u) => u.id !== action.utsettelse.id
				),
				valgtUtsettelse: undefined,
				dialogErApen: false
			};
		default:
			return state;
	}
};

export default UtsettelseReducer;
