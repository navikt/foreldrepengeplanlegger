import { Tidsperiode } from '../../app/types';
import { forskyvTidsperiode } from './tidsperiodeUtils';

describe('tidsperiodeUtils', () => {
	const tidsperiode: Tidsperiode = {
		startdato: new Date(2018, 0, 1),
		sluttdato: new Date(2018, 0, 4)
	};

	const tidsperiodeTorFre: Tidsperiode = {
		startdato: new Date(2018, 0, 4),
		sluttdato: new Date(2018, 0, 5)
	};

	const tidsperiodeFreMan: Tidsperiode = {
		startdato: new Date(2018, 0, 5),
		sluttdato: new Date(2018, 0, 8)
	};

	describe('forskyvTidsperiode', () => {
		it('forskyver riktig innenfor en uke', () => {
			const forskyvetPeriode = forskyvTidsperiode(tidsperiode, 1);
			expect(forskyvetPeriode.startdato).toEqual(new Date(2018, 0, 2));
			expect(forskyvetPeriode.sluttdato).toEqual(new Date(2018, 0, 5));
		});
		it('forskyver riktig over en helg', () => {
			const forskyvetPeriode = forskyvTidsperiode(tidsperiode, 2);
			expect(forskyvetPeriode.startdato).toEqual(new Date(2018, 0, 3));
			expect(forskyvetPeriode.sluttdato).toEqual(new Date(2018, 0, 8));
		});
		it('sluttdato på fredag blir forskyvet til mandag', () => {
			const forskyvetPeriode = forskyvTidsperiode(tidsperiodeTorFre, 1);
			expect(forskyvetPeriode.startdato).toEqual(new Date(2018, 0, 5));
			expect(forskyvetPeriode.sluttdato).toEqual(new Date(2018, 0, 8));
		});
		it('startdato på fredag blir forskyvet til mandag', () => {
			const forskyvetPeriode = forskyvTidsperiode(tidsperiodeFreMan, 1);
			expect(forskyvetPeriode.startdato).toEqual(new Date(2018, 0, 8));
			expect(forskyvetPeriode.sluttdato).toEqual(new Date(2018, 0, 9));
		});
		it('startdato på fredag blir forskyvet til mandag', () => {
			const forskyvetPeriode = forskyvTidsperiode(tidsperiode, 5);
			expect(forskyvetPeriode.startdato).toEqual(new Date(2018, 0, 8));
			expect(forskyvetPeriode.sluttdato).toEqual(new Date(2018, 0, 11));
		});
	});
});
