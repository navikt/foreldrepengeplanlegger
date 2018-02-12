import { Periode } from 'app/types';

export enum TidslinjeinnslagType {
	'periode' = 'periode',
	'hendelse' = 'hendelse'
}

export interface InnslagHendelsetype {
	type: TidslinjeinnslagType.hendelse;
	hendelse: 'termin' | 'permisjonsslutt';
	dato: Date;
}

export interface InnslagPeriodetype {
	type: TidslinjeinnslagType.periode;
	periode: Periode;
	perioderekke: Periode[];
}

export type Tidslinjeinnslag = InnslagPeriodetype | InnslagHendelsetype;
