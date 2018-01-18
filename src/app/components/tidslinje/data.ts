import { TidslinjeInnslag, InnslagType, HendelseType } from './types';

export const mockTidslinjeData: TidslinjeInnslag[] = [
	{
		dato: new Date(2018, 1, 5),
		hendelser: [{ navn: 'Mor tar mammepermisjon', forelder: 'mor' }],
		type: InnslagType.uttak
	},
	{
		dato: new Date(2018, 1, 24),
		hendelser: [{ navn: 'Termin', forelder: 'mor', type: HendelseType.termin }],
		type: InnslagType.termin
	},
	{
		dato: new Date(2018, 1, 23),
		hendelser: [{ navn: 'Mor fortsetter mammaperm', forelder: 'mor' }],
		type: InnslagType.uttak
	},
	{
		dato: new Date(2018, 6, 2),
		hendelser: [
			{ navn: 'Pappaperm 50%', forelder: 'medforelder', gradert: true },
			{ navn: 'Mammaperm 50%', forelder: 'mor', gradert: true }
		],
		type: InnslagType.uttak
	},
	{
		dato: new Date(2018, 8, 7),
		hendelser: [{ navn: 'Pappaperm 100%', forelder: 'medforelder' }],
		type: InnslagType.uttak
	},
	{
		dato: new Date(2018, 11, 1),
		hendelser: [{ navn: 'Permisjonsperiode ferdig', forelder: 'medforelder' }],
		type: InnslagType.slutt
	}
];
