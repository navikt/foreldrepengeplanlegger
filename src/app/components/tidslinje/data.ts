import { TidslinjeInnslag } from './types';

export const mockTidslinjeData: TidslinjeInnslag[] = [
	{
		dato: new Date(2018, 1, 5),
		forelder: 'forelder1',
		tittel: 'Berit starter sin permisjon',
		type: 'uttak'
	},
	{
		dato: new Date(2018, 1, 24),
		forelder: 'forelder1',
		tittel: 'Termin',
		type: 'termin'
	},
	{
		dato: new Date(2018, 1, 23),
		tittel: 'Mor avslutter sin permisjon',
		forelder: 'forelder1',
		type: 'slutt'
	},
	{
		dato: new Date(2018, 6, 2),
		tittel: 'Bjørn Harald starter sin permisjon',
		forelder: 'forelder2',
		type: 'uttak'
	},
	{
		dato: new Date(2018, 8, 7),
		tittel: 'Bjørn Harald avslutter sin permisjon',
		forelder: 'forelder2',
		type: 'siste'
	}
];
