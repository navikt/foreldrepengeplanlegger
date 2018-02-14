import { Dekningsgrad, Grunnfordeling, Utsettelsesperiode } from 'app/types';

export interface Action<T> {
	type: string;
	payload: T;
}

export type Dispatch = (action: any) => any;

export interface DispatchProps {
	dispatch: Dispatch;
}

export type SynligInfoMap = Map<string, boolean>;

export interface FormState {
	navnForelder1: string;
	navnForelder2: string;
	termindato: Date;
	dekningsgrad: Dekningsgrad;
	fellesperiodeukerForelder1: number;
	fellesperiodeukerForelder2: number;
	ukerFellesperiode: number;
	grunnfordeling: Grunnfordeling;
}

export interface UtsettelseState {
	dialogErApen: boolean;
	utsettelser: Utsettelsesperiode[];
	valgtUtsettelse?: Utsettelsesperiode;
}

export interface ViewState {
	synligInfo: SynligInfoMap;
}

export interface AppState {
	form: FormState;
	utsettelse: UtsettelseState;
	view: ViewState;
}
