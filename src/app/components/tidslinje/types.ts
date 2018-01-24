export type InnslagType = 'uttak' | 'termin' | 'slutt' | 'siste';

export type Forelder = 'mor' | 'medforelder';

export interface TidslinjeInnslag {
	dato: Date;
	tittel: string;
	type: InnslagType;
	forelder: Forelder;
	gradert?: boolean;
}
