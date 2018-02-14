import {
	Periodetype,
	UtsettelseArsakType,
	Utsettelsesperiode,
	Stonadsperiode,
	StonadskontoType,
	Tidsperiode
} from 'app/types';
import {
	leggTilUtsettelse,
	getAntallUttaksdagerIPerioder,
	getUttaksdagerForForelder,
	getAntallUkerFellesperiode,
	getPeriodeSluttdato
} from 'app/utils/periodeUtils';
import { grunnfordeling } from 'app/data/grunnfordeling';
import Periodeberegner from 'app/utils/Periodeberegner';
import { leggUttaksdagerTilDato } from 'app/utils/uttaksdagerUtils';

const datoer = {
	termin: new Date(2018, 0, 24),
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

const periode: Stonadsperiode = {
	type: Periodetype.Stonadsperiode,
	konto: StonadskontoType.Fellesperiode,
	forelder: 'forelder1',
	tidsperiode: {
		startdato: new Date(2018, 0, 1),
		tom: new Date(2018, 0, 12)
	}
};

const utsettelse: Utsettelsesperiode = {
	arsak: UtsettelseArsakType.Arbeid,
	forelder: 'forelder1',
	tidsperiode: {
		startdato: new Date(2018, 3, 16),
		tom: new Date(2018, 3, 17)
	},
	type: Periodetype.Utsettelse
};

const lagUtsettelse = (dager: number): Utsettelsesperiode => ({
	...utsettelse,
	tidsperiode: {
		startdato: utsettelse.tidsperiode.startdato,
		tom: leggUttaksdagerTilDato(utsettelse.tidsperiode.startdato, dager - 1)
	}
});

describe('periodeUtils', () => {
	describe('legger til utsettelse', () => {
		const periodeberegner = Periodeberegner(
			datoer.termin,
			'100%',
			13,
			13,
			grunnfordeling
		);

		const stonadsperioder = periodeberegner.opprettStonadsperioder();

		const testUtsettelse = (dager: number, forventetSluttdato: Date) => {
			const uttaksdagerUtenUtsettelse = getAntallUttaksdagerIPerioder(
				stonadsperioder
			);
			const perioderMedUtsettelse = leggTilUtsettelse(
				stonadsperioder,
				lagUtsettelse(dager)
			);
			const uttaksdagerMedUtsettelse = getAntallUttaksdagerIPerioder(
				perioderMedUtsettelse
			);
			it('antall uttaksdager er det samme', () => {
				expect(uttaksdagerUtenUtsettelse).toEqual(uttaksdagerMedUtsettelse);
			});
			it(`forskyver sluttdato med ${dager} dager`, () => {
				const nySluttdato =
					perioderMedUtsettelse[perioderMedUtsettelse.length - 1].tidsperiode
						.tom;
				expect(nySluttdato).toEqual(forventetSluttdato);
			});
		};

		const opprinneligSluttdato =
			stonadsperioder[stonadsperioder.length - 1].tidsperiode.tom;

		testUtsettelse(1, leggUttaksdagerTilDato(opprinneligSluttdato, 1));
		testUtsettelse(2, leggUttaksdagerTilDato(opprinneligSluttdato, 2));
		testUtsettelse(3, leggUttaksdagerTilDato(opprinneligSluttdato, 3));
	});

	it('finner riktig antall uker for fellesperioden 80%', () => {
		expect(getAntallUkerFellesperiode(grunnfordeling, '80%')).toBe(36);
	});

	it('finner riktig antall uker for fellesperioden 100%', () => {
		expect(getAntallUkerFellesperiode(grunnfordeling, '100%')).toBe(26);
	});

	it('finner riktig periodesluttdato', () => {
		const periodeEnUke: Tidsperiode = {
			startdato: new Date(2018, 0, 1),
			tom: new Date(2018, 0, 5)
		};
		const periodeToUker: Tidsperiode = {
			startdato: new Date(2018, 0, 1),
			tom: new Date(2018, 0, 12)
		};
		const periodeTreUkerForskyvet: Tidsperiode = {
			startdato: new Date(2018, 0, 4),
			tom: new Date(2018, 0, 17)
		};
		expect(getPeriodeSluttdato(periodeEnUke.startdato, 1)).toEqual(
			periodeEnUke.tom
		);
		expect(getPeriodeSluttdato(periodeToUker.startdato, 2)).toEqual(
			periodeToUker.tom
		);
		expect(getPeriodeSluttdato(periodeTreUkerForskyvet.startdato, 2)).toEqual(
			periodeTreUkerForskyvet.tom
		);
	});

	it('henter ut riktig antall uttaksdager for en forelder', () => {
		const perioder: Stonadsperiode[] = [
			{ ...periode },
			{
				...periode,
				forelder: 'forelder2'
			}
		];
		expect(getUttaksdagerForForelder('forelder1', perioder)).toBe(10);
		expect(getUttaksdagerForForelder('forelder2', perioder)).toBe(10);
	});
});
