import { Periode } from 'app/types';

export enum TidslinjeinnslagType {
	'periode' = 'periode',
	'hendelse' = 'hendelse'
}

export interface Hendelseinnslag {
	type: TidslinjeinnslagType.hendelse;
	hendelse: 'termin' | 'permisjonsslutt';
	dato: Date;
}

export interface Periodeinnslag {
	type: TidslinjeinnslagType.periode;
	periode: Periode;
	perioderekke: Periode[];
}

export type Tidslinjeinnslag = Periodeinnslag | Hendelseinnslag;
