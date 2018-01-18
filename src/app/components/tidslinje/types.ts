export enum InnslagType {
	'uttak',
	'termin',
	'slutt'
}
export enum HendelseType {
	'termin'
}

export type Forelder = 'mor' | 'medforelder';

export interface TidslinjeInnslag {
	dato: Date;
	type: InnslagType;
	hendelser: Permisjonshendelse[];
}

export interface Permisjonshendelse {
	navn: string;
	forelder: Forelder;
	gradert?: boolean;
	type?: HendelseType;
}
