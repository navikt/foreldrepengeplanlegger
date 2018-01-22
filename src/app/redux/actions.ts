import { PlanleggerActionTypes, PlanleggerActionTypeKeys } from './actionTypes';
import { Dekningsgrad } from '../types';

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

export function settTermindato(termindato: Date): PlanleggerActionTypes {
	return {
		type: PlanleggerActionTypeKeys.SET_TERMINDATO,
		termindato
	};
}

export function settAntallDagerMor(dager: number): PlanleggerActionTypes {
	return {
		type: PlanleggerActionTypeKeys.SET_DAGER_FORELDER1,
		dager
	};
}

export function settAntallDagerMedforelder(dager: number): PlanleggerActionTypes {
	return {
		type: PlanleggerActionTypeKeys.SET_DAGER_FORELDER2,
		dager
	};
}

export function settDekningsgrad(dekningsgrad: Dekningsgrad): PlanleggerActionTypes {
	return {
		type: PlanleggerActionTypeKeys.SETT_DEKNINGSGRAD,
		dekningsgrad
	};
}
