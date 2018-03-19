import { Feil } from 'nav-frontend-skjema';

export type Skjemaelement =
	| 'arsak'
	| 'forelder'
	| 'startdato'
	| 'sluttdato'
	| 'feriedager';

export type Valideringsfeil = Map<Skjemaelement, Feil>;
