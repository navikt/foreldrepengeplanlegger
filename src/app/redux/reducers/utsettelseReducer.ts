import { PlanleggerActionTypes, PlanleggerActionTypeKeys } from 'app/redux/actions/actionTypes';
import { UtsettelseState } from '../types';
import { Utsettelsesperiode, UtsettelseArsakType, Periodetype } from 'app/types';
import { guid } from 'nav-frontend-js-utils';

export const mockUtsettelser: Utsettelsesperiode[] = [];

export const utsettelse1: Utsettelsesperiode = {
	id: '1',
	type: Periodetype.Utsettelse,
	arsak: UtsettelseArsakType.Ferie,
	tidsperiode: {
		startdato: new Date(2018, 2, 21),
		sluttdato: new Date(2018, 2, 23)
	},
	forelder: 'forelder1'
};
export const utsettelse2: Utsettelsesperiode = {
	id: '2',
	type: Periodetype.Utsettelse,
	arsak: UtsettelseArsakType.Arbeid,
	tidsperiode: {
		startdato: new Date(2018, 7, 10),
		sluttdato: new Date(2018, 7, 17)
	},
	forelder: 'forelder2'
};

// mockUtsettelser.push(utsettelse1);
// mockUtsettelser.push(utsettelse1);

const defaultState: UtsettelseState = {
	dialogErApen: false,
	utsettelser: mockUtsettelser
};

const opprettEllerOppdaterUtsettelse = (state: UtsettelseState, utsettelse: Utsettelsesperiode): UtsettelseState => {
	const utsettelser = utsettelse.id
		? state.utsettelser.map((u, idx) => (u.id === utsettelse.id ? utsettelse : state.utsettelser[idx]))
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

const UtsettelseReducer = (state = defaultState, action: PlanleggerActionTypes) => {
	switch (action.type) {
		case PlanleggerActionTypeKeys.UTSETTELSE_VIS_DIALOG:
			return { ...state, dialogErApen: true, valgtUtsettelse: action.utsettelse } as UtsettelseState;
		case PlanleggerActionTypeKeys.UTSETTELSE_LUKK_DIALOG:
			return { ...state, dialogErApen: false, valgtUtsettelse: undefined } as UtsettelseState;
		case PlanleggerActionTypeKeys.UTSETTELSE_OPPRETT_ELLER_OPPDATER:
			return opprettEllerOppdaterUtsettelse(state, action.utsettelse);
		default:
			return state;
	}
};

export default UtsettelseReducer;
