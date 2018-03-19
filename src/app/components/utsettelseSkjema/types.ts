import { Feil } from 'nav-frontend-skjema';

export type Skjemaelement =
	| 'arsak'
	| 'forelder'
	| 'startdato'
	| 'sluttdato'
	| 'feriedager'
	| 'tidsperiode';

export type Valideringsfeil = Map<Skjemaelement, Feil>;
