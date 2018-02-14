import Periodeberegner from 'app/utils/Periodeberegner';
import { grunnfordeling } from 'app/data/grunnfordeling';
import {
	Utsettelsesperiode,
	UtsettelseArsakType,
	Periodetype
} from 'app/types';
import { leggTilUtsettelse } from 'app/utils/periodeUtils';
import { tidslinjeFraPerioder } from 'app/selectors/tidslinjeSelector';
import { FormState } from 'app/redux/types';
import { oppsummeringPerioder } from 'app/components/tidslinje/tidslinjeUtils';
import { InnslagPeriodetype } from 'app/components/tidslinje/types';

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

const formState: FormState = {
	dekningsgrad: '100%',
	termindato: datoer.termin,
	navnForelder1: 'a',
	navnForelder2: 'b',
	ukerFellesperiode: 26,
	fellesperiodeukerForelder1: 13,
	fellesperiodeukerForelder2: 13,
	grunnfordeling
};

describe('tidslinjeUtils', () => {
	const periodeberegner = Periodeberegner(
		datoer.termin,
		'100%',
		13,
		13,
		grunnfordeling
	);
	const stonadsperioder = periodeberegner.opprettStonadsperioder();
	const innslagUtenUtsettelse = tidslinjeFraPerioder.resultFunc(
		stonadsperioder,
		formState
	);
	it('lager riktig oppsummering uten utsettelser', () => {
		const oppsummering = oppsummeringPerioder(
			innslagUtenUtsettelse[0] as InnslagPeriodetype
		);
		expect(oppsummering.perioder.size).toBe(4);
	});

	const perioderMedUtsettelse = leggTilUtsettelse(stonadsperioder, utsettelse);
	const innslagMedUtsettelse = tidslinjeFraPerioder.resultFunc(
		perioderMedUtsettelse,
		formState
	);

	it('lager riktig oppsummering', () => {
		const oppsummering = oppsummeringPerioder(
			innslagMedUtsettelse[0] as InnslagPeriodetype
		);
		expect(oppsummering.perioder.size).toBe(4);
	});
});
