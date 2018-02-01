import { Forelder } from 'app/types';

export type InnslagType = 'uttak' | 'utsettelse' | 'termin' | 'slutt' | 'siste';

export interface TidslinjeInnslag {
	startdato: Date;
	sluttdato: Date;
	tittel: string;
	type: InnslagType;
	forelder: Forelder;
	fastPeriode?: boolean;
	/** Om neste periode er av samme Periodetype og har samme forelder */
	fortsetter?: boolean;
	/** Om neste periode er av samme Periodetype og har samme forelder */
	erFortsettelse?: boolean;
}
