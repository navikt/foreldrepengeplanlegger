import {
	erUttaksdag,
	getForsteUttaksdagPaEllerEtterDato,
	getForsteUttaksdagForDato,
	getForsteUttaksdagEtterDato,
	getAntallUttaksdagerITidsperiode
} from './uttaksdagerUtils';
import { Tidsperiode } from '../types';

describe('uttaksdagerUtils', () => {
	const mandag = new Date(2018, 0, 1);
	const tirsdag = new Date(2018, 0, 2);
	const onsdag = new Date(2018, 0, 3);
	const torsdag = new Date(2018, 0, 4);
	const fredag = new Date(2018, 0, 5);
	const lordag = new Date(2018, 0, 6);
	const sondag = new Date(2018, 0, 7);
	const nesteMandag = new Date(2018, 0, 8);
	const mandagNesteAr = new Date(2019, 0, 1);

	const tidsperiodeEnDag: Tidsperiode = {
		startdato: mandag,
		sluttdato: mandag
	};

	const tidsperiodeToDager: Tidsperiode = {
		startdato: mandag,
		sluttdato: tirsdag
	};

	const tidsperiodeOverHelg: Tidsperiode = {
		startdato: mandag,
		sluttdato: nesteMandag
	};

	const tidsperiodeOverEttAr: Tidsperiode = {
		startdato: mandag,
		sluttdato: mandagNesteAr
	};

	describe('getUkedag', () => {
		it('mandag er uttaksdag', () => {
			expect(erUttaksdag(mandag)).toBeTruthy();
		});
		it('tirsdag er uttaksdag', () => {
			expect(erUttaksdag(tirsdag)).toBeTruthy();
		});
		it('onsdag er uttaksdag', () => {
			expect(erUttaksdag(onsdag)).toBeTruthy();
		});
		it('torsdag er uttaksdag', () => {
			expect(erUttaksdag(torsdag)).toBeTruthy();
		});
		it('fredag er uttaksdag', () => {
			expect(erUttaksdag(fredag)).toBeTruthy();
		});
		it('lørdag er ikke uttaksdag', () => {
			expect(erUttaksdag(lordag)).toBeFalsy();
		});
		it('søndag er ikke uttaksdag', () => {
			expect(erUttaksdag(sondag)).toBeFalsy();
		});
	});

	describe('getForsteUttaksdagForDato', () => {
		expect(getForsteUttaksdagForDato(tirsdag)).toEqual(mandag);
		expect(getForsteUttaksdagForDato(lordag)).toEqual(fredag);
		expect(getForsteUttaksdagForDato(sondag)).toEqual(fredag);
	});

	describe('getForsteUttaksdagPaEllerEtterDato', () => {
		expect(getForsteUttaksdagPaEllerEtterDato(mandag)).toEqual(mandag);
		expect(getForsteUttaksdagPaEllerEtterDato(lordag)).toEqual(nesteMandag);
		expect(getForsteUttaksdagPaEllerEtterDato(sondag)).toEqual(nesteMandag);
	});

	describe('getForsteUttaksdagEtterDato', () => {
		expect(getForsteUttaksdagEtterDato(mandag)).toEqual(tirsdag);
		expect(getForsteUttaksdagEtterDato(tirsdag)).toEqual(onsdag);
		expect(getForsteUttaksdagEtterDato(fredag)).toEqual(nesteMandag);
		expect(getForsteUttaksdagEtterDato(sondag)).toEqual(nesteMandag);
	});

	describe('getAntallUttaksdagerITidsperiode', () => {
		expect(getAntallUttaksdagerITidsperiode(tidsperiodeEnDag)).toBe(1);
		expect(getAntallUttaksdagerITidsperiode(tidsperiodeToDager)).toBe(2);
		expect(getAntallUttaksdagerITidsperiode(tidsperiodeOverHelg)).toBe(6);
		expect(getAntallUttaksdagerITidsperiode(tidsperiodeOverEttAr)).toBe(262);
	});
});
