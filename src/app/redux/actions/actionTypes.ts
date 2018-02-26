import { Dekningsgrad, Utsettelsesperiode } from 'app/types';

export enum PlanleggerActionTypeKeys {
	'SET_NAVN_FORELDER1' = 'setNavnForelder1',
	'SET_NAVN_FORELDER2' = 'setNavnForelder2',
	'SET_TERMINDATO' = 'setTermindato',
	'SET_UKER_FORELDER1' = 'setUkerForelder1',
	'SET_UKER_FORELDER2' = 'setUkerForelder2',
	'SETT_DEKNINGSGRAD' = 'setDekningsgrad',
	'UTSETTELSE_VIS_DIALOG' = 'utsettelseVisDialog',
	'UTSETTELSE_LUKK_DIALOG' = 'utsettelseLukkDialog',
	'ULONNETPERMISJON_VIS_DIALOG' = 'ulonnetPermisjonVisDialog',
	'ULONNETPERMISJON_LUKK_DIALOG' = 'ulonnetPermisjonSkjulDialog',
	'UTSETTELSE_OPPRETT_ELLER_OPPDATER' = 'utsettelseOpprettEllerOppdater',
	'UTSETTELSE_SLETT' = 'utsettelseSlett',
	'INFO_VIS' = 'infoVis',
	'INFO_SKJUL' = 'infoSkjul'
}

export type PlanleggerActionTypes =
	| SetNavnForelder1
	| SetNavnForelder2
	| SetTermindato
	| SetUkerForelder2
	| SetUkerForelder1
	| SetDekningsgrad
	| UtsettelseVisDialog
	| UtsettelseLukkDialog
	| UlonnetPermisjonLukkDialog
	| UlonnetPermisjonVisDialog
	| OpprettEllerOppdaterUtsettelse
	| SlettUtsettelse
	| SkjulInfo
	| VisInfo;

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
	dekningsgrad: Dekningsgrad | undefined;
}

export interface UtsettelseVisDialog {
	type: PlanleggerActionTypeKeys.UTSETTELSE_VIS_DIALOG;
	utsettelse?: Utsettelsesperiode;
}

export interface UtsettelseLukkDialog {
	type: PlanleggerActionTypeKeys.UTSETTELSE_LUKK_DIALOG;
}

export interface UlonnetPermisjonVisDialog {
	type: PlanleggerActionTypeKeys.ULONNETPERMISJON_VIS_DIALOG;
}

export interface UlonnetPermisjonLukkDialog {
	type: PlanleggerActionTypeKeys.ULONNETPERMISJON_LUKK_DIALOG;
}

export interface OpprettEllerOppdaterUtsettelse {
	type: PlanleggerActionTypeKeys.UTSETTELSE_OPPRETT_ELLER_OPPDATER;
	utsettelse: Utsettelsesperiode;
}

export interface SlettUtsettelse {
	type: PlanleggerActionTypeKeys.UTSETTELSE_SLETT;
	utsettelse: Utsettelsesperiode;
}

export interface SkjulInfo {
	type: PlanleggerActionTypeKeys.INFO_SKJUL;
	id: string;
}
export interface VisInfo {
	type: PlanleggerActionTypeKeys.INFO_VIS;
	id: string;
}
