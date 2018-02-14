import {
	PlanleggerActionTypes,
	PlanleggerActionTypeKeys
} from 'app/redux/actions/actionTypes';
import { UtsettelseState } from '../types';
import {
	Utsettelsesperiode,
	UtsettelseArsakType,
	Periodetype
} from 'app/types';
import { guid } from 'nav-frontend-js-utils';

export const mockUtsettelser: Utsettelsesperiode[] = [];

export const utsettelseEnDag: Utsettelsesperiode = {
	id: '1',
	type: Periodetype.Utsettelse,
	arsak: UtsettelseArsakType.Ferie,
	tidsperiode: {
		startdato: new Date(2018, 2, 20),
		tom: new Date(2018, 2, 20)
	},
	forelder: 'forelder1'
};
export const utsettelseToDager: Utsettelsesperiode = {
	id: '1',
	type: Periodetype.Utsettelse,
	arsak: UtsettelseArsakType.Ferie,
	tidsperiode: {
		startdato: new Date(2018, 2, 20),
		tom: new Date(2018, 2, 21)
	},
	forelder: 'forelder1'
};
export const utsettelseTiDager: Utsettelsesperiode = {
	id: '1',
	type: Periodetype.Utsettelse,
	arsak: UtsettelseArsakType.Ferie,
	tidsperiode: {
		startdato: new Date(2018, 3, 9),
		tom: new Date(2018, 3, 20)
	},
	forelder: 'forelder2'
};
export const utsettelse2: Utsettelsesperiode = {
	id: '2',
	type: Periodetype.Utsettelse,
	arsak: UtsettelseArsakType.Arbeid,
	tidsperiode: {
		startdato: new Date(2018, 7, 10),
		tom: new Date(2018, 7, 17)
	},
	forelder: 'forelder2'
};

// mockUtsettelser.push(utsettelseEnDag);
// mockUtsettelser.push(utsettelseTiDager);
// mockUtsettelser.push(utsettelse2);

const defaultState: UtsettelseState = {
	dialogErApen: false,
	utsettelser: mockUtsettelser
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
		default:
			return state;
	}
};

export default UtsettelseReducer;
