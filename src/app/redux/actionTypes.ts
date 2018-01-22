import { Dekningsgrad } from '../types';

export enum PlanleggerActionTypeKeys {
	'SET_NAVN_FORELDER1',
	'SET_NAVN_FORELDER2',
	'SET_TERMINDATO',
	'SET_UKER_FORELDER1',
	'SET_UKER_FORELDER2',
	'SETT_DEKNINGSGRAD'
}

export type PlanleggerActionTypes =
	| SetNavnForelder1
	| SetNavnForelder2
	| SetTermindato
	| SetUkerForelder2
	| SetUkerForelder1
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

export interface SetUkerForelder1 {
	type: PlanleggerActionTypeKeys.SET_UKER_FORELDER1;
	uker: number;
}

export interface SetUkerForelder2 {
	type: PlanleggerActionTypeKeys.SET_UKER_FORELDER2;
	uker: number;
}

export interface SetDekningsgrad {
	type: PlanleggerActionTypeKeys.SETT_DEKNINGSGRAD;
	dekningsgrad: Dekningsgrad;
}
