import { AppState } from 'app/redux/types';
import { grunnfordeling } from 'app/data/grunnfordeling';
import { getStonadsperioder } from 'app/selectors/periodeSelector';
import { getAntallUttaksdagerITidsperiode } from 'app/utils/uttaksdagerUtils';
import { Tidsperiode } from 'app/types';

const state: AppState = {
	form: {
		grunnfordeling,
		termindato: new Date(2018, 5, 1),
		dekningsgrad: '80%',
		navnForelder1: 'Kari',
		navnForelder2: 'Ola',
		ukerFellesperiode: 26,
		ukerForelder1: 13,
		ukerForelder2: 13
	},
	utsettelse: {
		dialogErApen: false,
		utsettelser: [],
		valgtUtsettelse: undefined
	}
};

const uttaksdager80 = grunnfordeling.antallUkerTotalt80 * 5;
const uttaksdager100 = grunnfordeling.antallUkerTotalt100 * 5;

describe('periodeberegner', () => {
	const perioder = getStonadsperioder.resultFunc(state.form);
	it('oppretter 5 ulike perioder ut fra termindato', () => {
		expect(perioder.length).toBe(5);
	});
	// describe('ved 80% dekningsgrad', () => {
	// 	const tidsperiode: Tidsperiode = {
	// 		startdato: state.form.termindato,
	// 		sluttdato: perioder[perioder.length - 1].tidsperiode.sluttdato
	// 	};
	// 	it(`har den totalt ${uttaksdager80} uttaksdager`, () => {
	// 		expect(getAntallUttaksdagerITidsperiode(tidsperiode)).toBe(uttaksdager80);
	// 	});
	// });
});
