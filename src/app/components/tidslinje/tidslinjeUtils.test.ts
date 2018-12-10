import { getPermisjonsregler } from 'app/data/permisjonsregler';
import {
	Utsettelsesperiode,
	UtsettelseArsakType,
	Periodetype
} from 'app/types';
import { leggTilUtsettelse } from 'app/utils/periodeUtils';
import { tidslinjeFraPerioder } from 'app/selectors/tidslinjeSelector';
import { FormState } from 'app/redux/types';
import { oppsummerPerioder } from 'app/components/tidslinje/tidslinjeUtils';
import { InnslagPeriodetype } from 'app/components/tidslinje/types';
import { opprettStønadsperioder } from 'app/utils/permisjonUtils';

const datoer = {
	termin: new Date(2018, 1, 14),
	mandag: new Date(2018, 0, 1),
	tirsdag: new Date(2018, 0, 2),
	onsdag: new Date(2018, 0, 3),
	torsdag: new Date(2018, 0, 4),
	fredag: new Date(2018, 0, 5),
	lordag: new Date(2018, 0, 6),
	sondag: new Date(2018, 0, 7),
	nesteMandag: new Date(2018, 0, 8),
	nesteTirsdag: new Date(2018, 0, 9),
	nesteFredag: new Date(2018, 0, 12),
	mandagNesteAr: new Date(2019, 0, 1)
};

const utsettelse: Utsettelsesperiode = {
	arsak: UtsettelseArsakType.Arbeid,
	forelder: 'forelder1',
	tidsperiode: {
		startdato: new Date(2018, 3, 16),
		sluttdato: new Date(2018, 3, 17)
	},
	type: Periodetype.Utsettelse
};

const permisjonsregler = getPermisjonsregler(datoer.termin);

const formState: FormState = {
	dekningsgrad: 'dekning100',
	termindato: datoer.termin,
	navnForelder1: 'a',
	navnForelder2: 'b',
	ukerFellesperiode: 26,
	fellesperiodeukerForelder1: 13,
	fellesperiodeukerForelder2: 13,
	permisjonsregler
};

describe('tidslinjeUtils', () => {
	const stonadsperioder = opprettStønadsperioder(
		datoer.termin,
		'dekning100',
		13,
		13,
		permisjonsregler
	);
	const innslagUtenUtsettelse = tidslinjeFraPerioder.resultFunc(
		stonadsperioder,
		formState
	);
	it('lager riktig oppsummering uten utsettelser', () => {
		const oppsummering = oppsummerPerioder(
			innslagUtenUtsettelse[0] as InnslagPeriodetype
		);
		expect(oppsummering.perioder.size).toBe(3);
	});

	const perioderMedUtsettelse = leggTilUtsettelse(stonadsperioder, utsettelse);
	const innslagMedUtsettelse = tidslinjeFraPerioder.resultFunc(
		perioderMedUtsettelse,
		formState
	);

	it('lager riktig oppsummering', () => {
		const oppsummering = oppsummerPerioder(
			innslagMedUtsettelse[0] as InnslagPeriodetype
		);
		expect(oppsummering.perioder.size).toBe(3);
	});
});
