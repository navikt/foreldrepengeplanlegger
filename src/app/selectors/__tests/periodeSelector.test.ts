import { FormState } from 'app/redux/types';
import { grunnfordeling } from 'app/data/grunnfordeling';
import { getStonadsperioder, getSammenslattePerioder } from 'app/selectors/periodeSelector';
import { Tidsperiode, Forelder, StonadskontoType } from 'app/types';
import { getAntallUttaksdagerITidsperiode } from 'app/utils/uttaksdagerUtils';
import { getUttaksdagerForForelder } from 'app/utils/periodeUtils';

const forstePermisjonsdag = new Date(2018, 0, 8);
const termindato = new Date(2018, 0, 27);

// const form100: FormState = {
// 	grunnfordeling,
// 	termindato,
// 	dekningsgrad: '100%',
// 	navnForelder1: 'Kari',
// 	navnForelder2: 'Ola',
// 	ukerFellesperiode: 26,
// 	fellesperiodeukerForelder1: 13,
// 	fellesperiodeukerForelder2: 13
// };

const form80: FormState = {
	grunnfordeling,
	termindato,
	dekningsgrad: '80%',
	navnForelder1: 'Kari',
	navnForelder2: 'Ola',
	ukerFellesperiode: 36,
	fellesperiodeukerForelder1: 18,
	fellesperiodeukerForelder2: 18
};

describe('periodeberegner', () => {
	it('har gyldige grunndata', () => {
		const totaltAntallUker =
			form80.grunnfordeling.antallUkerForelder1ForFodsel +
			grunnfordeling.antallUkerModrekvote +
			form80.fellesperiodeukerForelder1 +
			form80.fellesperiodeukerForelder2 +
			grunnfordeling.antallUkerFedrekvote;

		expect(totaltAntallUker).toBe(grunnfordeling.antallUkerTotalt80);
	});

	const perioder80 = getStonadsperioder.resultFunc(form80);
	const uttaksdager80 = grunnfordeling.antallUkerTotalt80 * 5;
	const forelder1: Forelder = 'forelder1';
	const forelder2: Forelder = 'forelder2';
	const antallDagerForelder1 = 155;
	const antallDagerForelder2 = 140;

	describe('ved 80% dekningsgrad', () => {
		const dagerModrekvoteForFodsel = grunnfordeling.antallUkerForelder1ForFodsel * 5;
		const dagerPakrevdModrekvoteEtterFodsel = grunnfordeling.antallUkerForelder1EtterFodsel * 5;
		const dagerModrekvoteEtterFodsel =
			(grunnfordeling.antallUkerModrekvote - grunnfordeling.antallUkerForelder1EtterFodsel) * 5;
		const dagerForelder1Fellesperiode = form80.fellesperiodeukerForelder1 * 5;
		const dagerForelder2Fellesperiode = form80.fellesperiodeukerForelder2 * 5;
		const dagerFedrekvote = grunnfordeling.antallUkerFedrekvote * 5;

		it('oppretter 6 ulike perioder ut fra termindato sortert i riktig rekkefølge', () => {
			expect(perioder80.length).toBe(6);
		});

		let periodenr = 0;
		it('oppretter perioden før termin riktig', () => {
			const periode = perioder80[periodenr++];
			expect(periode.forelder).toEqual(forelder1);
			expect(periode.fastPeriode).toBeTruthy();
			expect(periode.konto).toEqual(StonadskontoType.ForeldrepengerForFodsel);
			expect(periode.tidsperiode.startdato).toEqual(forstePermisjonsdag);
			expect(getAntallUttaksdagerITidsperiode(periode.tidsperiode)).toBe(dagerModrekvoteForFodsel);
		});
		it('oppretter påkrevd mødrekvoteperiode etter termin riktig', () => {
			const periode = perioder80[periodenr++];
			expect(periode.forelder).toEqual(forelder1);
			expect(periode.fastPeriode).toBeTruthy();
			expect(periode.konto).toEqual(StonadskontoType.Modrekvote);
			expect(getAntallUttaksdagerITidsperiode(periode.tidsperiode)).toBe(dagerPakrevdModrekvoteEtterFodsel);
		});
		it('oppretter valgfri mødrekvoteperiode etter termin riktig', () => {
			const periode = perioder80[periodenr++];
			expect(periode.forelder).toEqual(forelder1);
			expect(periode.fastPeriode).toBeFalsy();
			expect(periode.konto).toEqual(StonadskontoType.Modrekvote);
			expect(getAntallUttaksdagerITidsperiode(periode.tidsperiode)).toBe(dagerModrekvoteEtterFodsel);
		});
		it('oppretter mors uttak av fellesperioden riktig', () => {
			const periode = perioder80[periodenr++];
			expect(periode.forelder).toEqual(forelder1);
			expect(periode.fastPeriode).toBeFalsy();
			expect(periode.konto).toEqual(StonadskontoType.Fellesperiode);
			expect(getAntallUttaksdagerITidsperiode(periode.tidsperiode)).toBe(dagerForelder1Fellesperiode);
		});

		it('oppretter fars uttak av fellesperioden riktig', () => {
			const periode = perioder80[periodenr++];
			expect(periode.forelder).toEqual(forelder2);
			expect(periode.fastPeriode).toBeFalsy();
			expect(periode.konto).toEqual(StonadskontoType.Fellesperiode);
			expect(getAntallUttaksdagerITidsperiode(periode.tidsperiode)).toBe(dagerForelder2Fellesperiode);
		});

		it('oppretter fedrekvoteperioden riktig', () => {
			const periode = perioder80[periodenr++];
			expect(periode.forelder).toEqual(forelder2);
			expect(periode.fastPeriode).toBeFalsy();
			expect(periode.konto).toEqual(StonadskontoType.Fedrekvote);
			expect(getAntallUttaksdagerITidsperiode(periode.tidsperiode)).toBe(dagerFedrekvote);
		});

		it(`totalt antall ${uttaksdager80} uttaksdager er riktig`, () => {
			const tidsperiode: Tidsperiode = {
				startdato: perioder80[0].tidsperiode.startdato,
				sluttdato: perioder80[5].tidsperiode.sluttdato
			};
			expect(getAntallUttaksdagerITidsperiode(tidsperiode)).toBe(uttaksdager80);
		});

		it(`oppretter riktig antall uttaksdager for forelder1`, () => {
			expect(getUttaksdagerForForelder('forelder1', perioder80)).toBe(antallDagerForelder1);
		});

		it(`oppretter riktig antall uttaksdager for forelder2`, () => {
			expect(getUttaksdagerForForelder('forelder2', perioder80)).toBe(antallDagerForelder2);
		});
	});

	describe('når en slår sammen tilhørende perioder', () => {
		const sammenslattePerioder = getSammenslattePerioder.resultFunc(perioder80);
		it('har en fortsatt samme totalt antall uttaksdager i periode', () => {
			expect(
				getAntallUttaksdagerITidsperiode({
					startdato: sammenslattePerioder[0].tidsperiode.startdato,
					sluttdato: sammenslattePerioder[sammenslattePerioder.length - 1].tidsperiode.sluttdato
				})
			).toEqual(uttaksdager80);
		});
		it(`oppretter riktig antall uttaksdager for forelder1`, () => {
			expect(getUttaksdagerForForelder('forelder1', sammenslattePerioder)).toBe(antallDagerForelder1);
		});

		it(`oppretter riktig antall uttaksdager for forelder2`, () => {
			expect(getUttaksdagerForForelder('forelder2', sammenslattePerioder)).toBe(antallDagerForelder2);
		});
	});
});
