import { Dekningsgrad, Grunnfordeling, Utsettelsesperiode } from 'app/types';

export type Forelder = 'forelder1' | 'forelder2';

export interface Action<T> {
	type: string;
	payload: T;
}

export type Dispatch = (action: any) => any;

export interface DispatchProps {
	dispatch: Dispatch;
}

export interface FormState {
	navnForelder1?: string;
	navnForelder2?: string;
	termindato?: Date;
	ukerForelder1?: number;
	ukerForelder2?: number;
	dekningsgrad?: Dekningsgrad;
	ukerFellesperiode?: number;
	grunnfordeling: Grunnfordeling;
}

export type MockUtsettelse = '1' | '2';

export interface UtsettelseState {
	dialogErApen: boolean;
	utsettelser: Utsettelsesperiode[];
	valgtUtsettelse?: Utsettelsesperiode;
	mock?: MockUtsettelse;
}

export interface AppState {
	form: FormState;
	utsettelse: UtsettelseState;
}
