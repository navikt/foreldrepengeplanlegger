export enum InnslagType {
	'uttak' = 'uttak',
	'termin' = 'termin',
	'slutt' = 'slutt',
	'siste' = 'siste'
}

export type Forelder = 'mor' | 'medforelder';

export interface TidslinjeInnslag {
	dato: Date;
	tittel: string;
	type: InnslagType;
	forelder: Forelder;
	gradert?: boolean;
}
