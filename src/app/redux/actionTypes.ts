import { Dekningsgrad } from '../types';

export enum PlanleggerActionTypeKeys {
	'SET_NAVN_FORELDER1',
	'SET_NAVN_FORELDER2',
	'SET_TERMINDATO',
	'SET_DAGER_FORELDER1',
	'SET_DAGER_FORELDER2',
	'SETT_DEKNINGSGRAD'
}

export type PlanleggerActionTypes =
	| SetNavnForelder1
	| SetNavnForelder2
	| SetTermindato
	| SetDagerForelder2
	| SetDagerForelder1
	| SetDekningsgrad;

export interface SetNavnForelder1 {
	type: PlanleggerActionTypeKeys.SET_NAVN_FORELDER1;
	navn: string;
}

export interface SetNavnForelder2 {
	type: PlanleggerActionTypeKeys.SET_NAVN_FORELDER2;
	navn: string;
}

export interface SetTermindato {
	type: PlanleggerActionTypeKeys.SET_TERMINDATO;
	termindato: Date;
}

export interface SetDagerForelder1 {
	type: PlanleggerActionTypeKeys.SET_DAGER_FORELDER1;
	dager: number;
}

export interface SetDagerForelder2 {
	type: PlanleggerActionTypeKeys.SET_DAGER_FORELDER2;
	dager: number;
}

export interface SetDekningsgrad {
	type: PlanleggerActionTypeKeys.SETT_DEKNINGSGRAD;
	dekningsgrad: Dekningsgrad;
}
