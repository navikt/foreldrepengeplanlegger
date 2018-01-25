import { Forelder } from 'app/types';

export type InnslagType = 'uttak' | 'termin' | 'slutt' | 'siste';

export interface TidslinjeInnslag {
	dato: Date;
	tittel: string;
	type: InnslagType;
	forelder: Forelder;
	gradert?: boolean;
}
