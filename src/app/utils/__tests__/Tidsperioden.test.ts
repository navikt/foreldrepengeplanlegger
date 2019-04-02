import { Tidsperioden, getTidsperiode } from '../Tidsperioden';
import { Tidsperiode } from 'common/types';

const DAGER = 10;
const T10: Tidsperiode = getTidsperiode(new Date(2019, 0, 7), DAGER);

let t: Tidsperiode | Partial<Tidsperiode>;

describe('Tidsperioden', () => {
    describe('setUttaksdager - gradert', () => {
        const uttaksdager = 10;
        beforeEach(() => {
            t = { ...T10 };
        });
        it('100% uttak av 10 dager er 10', () => {
            t = Tidsperioden(t).setUttaksdager(uttaksdager);
            expect(Tidsperioden(t).getAntallUttaksdager()).toBe(10);
        });
        it('uttak i 10 dager med 10% tilsvarer 20 uttaksdager', () => {
            t = Tidsperioden(t).setUttaksdager(uttaksdager, 10);
            expect(Tidsperioden(t).getAntallUttaksdager()).toBe(100);
        });
        it('uttak i 10 dager med 20% tilsvarer 20 uttaksdager', () => {
            t = Tidsperioden(t).setUttaksdager(uttaksdager, 20);
            expect(Tidsperioden(t).getAntallUttaksdager()).toBe(50);
        });
        it('uttak i 10 dager med 33.333% tilsvarer 20 uttaksdager', () => {
            t = Tidsperioden(t).setUttaksdager(uttaksdager, 33.3333);
            expect(Tidsperioden(t).getAntallUttaksdager()).toBe(30);
        });
        it('uttak i 10 dager med 40% tilsvarer 20 uttaksdager', () => {
            t = Tidsperioden(t).setUttaksdager(uttaksdager, 40);
            expect(Tidsperioden(t).getAntallUttaksdager()).toBe(25);
        });
        it('uttak i 10 dager med 50% tilsvarer 20 uttaksdager', () => {
            t = Tidsperioden(t).setUttaksdager(uttaksdager, 50);
            expect(Tidsperioden(t).getAntallUttaksdager()).toBe(20);
        });
        // it('10% uttak av 10 dager er 1', () => {
        //     t = Tidsperioden(t).setUttaksdager(10, 100);
        //     expect(Tidsperioden(t).getAntallUttaksdager()).toBe(1);
        // });
    });
});
