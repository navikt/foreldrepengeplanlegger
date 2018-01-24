import { Dekningsgrad, Grunndata } from 'app/types';
import { TidslinjeInnslag } from 'app/components/tidslinje/types';

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
	ukerFellesperiode: number;
	grunndata: Grunndata;
	tidslinje: TidslinjeInnslag[];
}

export interface AppState {
	form: FormState;
}
