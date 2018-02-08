import { Stonadsperiode, StonadskontoType, Periodetype, UtsettelseArsakType, Utsettelsesperiode } from 'app/types';
import { leggUtsettelseInnIPeriode, getAntallUkerFellesperiode } from 'app/utils/periodeUtils';
import { grunnfordeling } from 'app/data/grunnfordeling';
import { getAntallUttaksdagerITidsperiode } from 'app/utils/uttaksdagerUtils';

const periode: Stonadsperiode = {
	type: Periodetype.Stonadsperiode,
	konto: StonadskontoType.Fellesperiode,
	forelder: 'forelder1',
	tidsperiode: {
		startdato: new Date(2018, 0, 1),
		sluttdato: new Date(2018, 0, 12)
	}
};

const periode2: Stonadsperiode = {
	type: Periodetype.Stonadsperiode,
	konto: StonadskontoType.Fellesperiode,
	forelder: 'forelder1',
	tidsperiode: {
		startdato: new Date(2018, 1, 2),
		sluttdato: new Date(2018, 1, 6)
	}
};

const utsettelse: Utsettelsesperiode = {
	arsak: UtsettelseArsakType.Arbeid,
	forelder: 'forelder1',
	tidsperiode: {
		startdato: new Date(2018, 0, 2),
		sluttdato: new Date(2018, 0, 4)
	},
	type: Periodetype.Utsettelse
};

describe('periodeUtils', () => {
	describe('leggUtsettelseInnIPeriode', () => {
		const splittetPeriode = leggUtsettelseInnIPeriode(periode, utsettelse);

		it('splitter periode i tre deler', () => {
			expect(splittetPeriode.length).toBe(3);
		});

		const p1 = splittetPeriode[0];
		const u = splittetPeriode[1];
		const p2 = splittetPeriode[2];

		it('setter første del av splittet periode før utsettelse', () => {
			expect(p1.tidsperiode.sluttdato.getTime()).toBeLessThan(u.tidsperiode.sluttdato.getTime());
		});
		it('setter siste del av splittet periode etter utsettelse', () => {
			expect(p2.tidsperiode.startdato.getTime()).toBeGreaterThan(u.tidsperiode.sluttdato.getTime());
		});

		it('splittede perioder har samme antall uttaksdager som opprinnelig periode', () => {
			const uttaksdager = getAntallUttaksdagerITidsperiode(periode.tidsperiode);
			const p1Dager = getAntallUttaksdagerITidsperiode(p1.tidsperiode);
			const p2Dager = getAntallUttaksdagerITidsperiode(p2.tidsperiode);
			expect(p1Dager + p2Dager).toEqual(uttaksdager);
		});
	});

	describe('legge utsettelser inn i perioder', () => {
		it('antall uttaksdager er det samme etter at utsettelse er lagt til', () => {});
	});

	it('finner riktig antall uker for fellesperioden 80%', () => {
		expect(getAntallUkerFellesperiode(grunnfordeling, '80%')).toBe(36);
	});

	it('finner riktig antall uker for fellesperioden 100%', () => {
		expect(getAntallUkerFellesperiode(grunnfordeling, '100%')).toBe(26);
	});
});
