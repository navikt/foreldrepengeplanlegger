import { TidslinjeInnslag } from './types';

export const mockTidslinjeData: TidslinjeInnslag[] = [
	{
		dato: new Date(2018, 1, 5),
		forelder: 'mor',
		tittel: 'Berit starter sin permisjon',
		type: 'uttak'
	},
	{
		dato: new Date(2018, 1, 24),
		forelder: 'mor',
		tittel: 'Termin',
		type: 'termin'
	},
	{
		dato: new Date(2018, 1, 23),
		tittel: 'Mor avslutter sin permisjon',
		forelder: 'mor',
		type: 'slutt'
	},
	{
		dato: new Date(2018, 6, 2),
		tittel: 'Bjørn Harald starter sin permisjon',
		forelder: 'medforelder',
		type: 'uttak'
	},
	{
		dato: new Date(2018, 8, 7),
		forelder: 'medforelder',
		tittel: 'Bjørn Harald avslutter sin permisjon',
		type: 'siste'
	}
];
