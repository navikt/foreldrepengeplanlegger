import { Dekningsgrad } from 'app/types';

import { PlanleggerActionTypes, PlanleggerActionTypeKeys } from './actionTypes';

export function setNavnForelder1(navn: string): PlanleggerActionTypes {
	return {
		type: PlanleggerActionTypeKeys.SET_NAVN_FORELDER1,
		navn
	};
}

export function setNavnForelder2(navn: string): PlanleggerActionTypes {
	return {
		type: PlanleggerActionTypeKeys.SET_NAVN_FORELDER2,
		navn
	};
}

export function setTermindato(termindato: Date): PlanleggerActionTypes {
	return {
		type: PlanleggerActionTypeKeys.SET_TERMINDATO,
		termindato
	};
}

export function settAntallDagerMor(uker: number): PlanleggerActionTypes {
	return {
		type: PlanleggerActionTypeKeys.SET_UKER_FORELDER1,
		uker
	};
}

export function settAntallDagerMedforelder(uker: number): PlanleggerActionTypes {
	return {
		type: PlanleggerActionTypeKeys.SET_UKER_FORELDER2,
		uker
	};
}

export function setDekningsgrad(dekningsgrad: Dekningsgrad): PlanleggerActionTypes {
	return {
		type: PlanleggerActionTypeKeys.SETT_DEKNINGSGRAD,
		dekningsgrad
	};
}

export function utsettelseVisDialog(): PlanleggerActionTypes {
	return {
		type: PlanleggerActionTypeKeys.UTSETTELSE_VIS_DIALOG
	};
}

export function utsettelseLukkDialog(): PlanleggerActionTypes {
	return {
		type: PlanleggerActionTypeKeys.UTSETTELSE_LUKK_DIALOG
	};
}
