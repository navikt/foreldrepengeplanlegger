import {
	Dekningsgrad,
	Permisjonsregler,
	Utsettelsesperiode,
	Spraak
} from 'app/types';

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
	navnForelder1: string | undefined;
	navnForelder2: string | undefined;
	termindato?: Date;
	termindatoErUgyldig?: boolean;
	dekningsgrad?: Dekningsgrad;
	fellesperiodeukerForelder1: number;
	fellesperiodeukerForelder2: number;
	ukerFellesperiode: number;
	permisjonsregler: Permisjonsregler;
}

export interface UtsettelseState {
	dialogErApen: boolean;
	utsettelser: Utsettelsesperiode[];
	valgtUtsettelse?: Utsettelsesperiode;
}

export interface ViewState {
	spraak: Spraak;
	synligInfo: SynligInfoMap;
	visTidslinje: boolean;
}

export interface AppState {
	form: FormState;
	utsettelse: UtsettelseState;
	view: ViewState;
}
