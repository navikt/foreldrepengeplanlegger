import { PlanleggerActionTypes, PlanleggerActionTypeKeys } from 'app/redux/actions/actionTypes';
import { UtsettelseState, MockUtsettelse } from '../types';
import { Utsettelsesperiode, UtsettelseArsakType, Periodetype } from 'app/types';
import { guid } from 'nav-frontend-js-utils';

export const mockUtsettelser: Utsettelsesperiode[] = [];

export const utsettelse1: Utsettelsesperiode = {
	id: '1',
	type: Periodetype.Utsettelse,
	arsak: UtsettelseArsakType.Ferie,
	tidsperiode: {
		startdato: new Date(2018, 4, 7),
		sluttdato: new Date(2018, 4, 10)
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

const getMockUtsettelser = (mock?: MockUtsettelse): Utsettelsesperiode[] => {
	if (!mock) {
		return [];
	}
	const utsettelser: Utsettelsesperiode[] = [utsettelse1];
	if (mock === '2') {
		utsettelser.push(utsettelse2);
	}
	return utsettelser;
};

const UtsettelseReducer = (state = defaultState, action: PlanleggerActionTypes) => {
	switch (action.type) {
		case PlanleggerActionTypeKeys.UTSETTELSE_VIS_DIALOG:
			return { ...state, dialogErApen: true, valgtUtsettelse: action.utsettelse } as UtsettelseState;
		case PlanleggerActionTypeKeys.UTSETTELSE_LUKK_DIALOG:
			return { ...state, dialogErApen: false, valgtUtsettelse: undefined } as UtsettelseState;
		case PlanleggerActionTypeKeys.UTSETTELSE_OPPRETT_ELLER_OPPDATER:
			return opprettEllerOppdaterUtsettelse(state, action.utsettelse);
		case PlanleggerActionTypeKeys.UTSETTELSE_TOGGLE_MOCK:
			return {
				...state,
				utsettelser: getMockUtsettelser(action.mock)
			};
		default:
			return state;
	}
};

export default UtsettelseReducer;
