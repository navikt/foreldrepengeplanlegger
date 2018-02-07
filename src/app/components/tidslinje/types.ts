import { Forelder, Tidsperiode } from 'app/types';

export type InnslagType = 'uttak' | 'utsettelse' | 'termin' | 'periodeslutt' | 'sistePermisjonsdag';

export interface TidslinjeInnslag {
	tidsperiode: Tidsperiode;
	tittel: string;
	type: InnslagType;
	forelder: Forelder;
	fastPeriode?: boolean;
	/** Om neste periode er av samme Periodetype og har samme forelder */
	fortsetter?: boolean;
	/** Om neste periode er av samme Periodetype og har samme forelder */
	fortsettelse?: boolean;
	/** Om dette er slutten på en permisjonsperiode */
	slutter?: boolean;
}
