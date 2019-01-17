import { Periode, Forelder, Periodetype } from '../../types';
import { guid } from 'nav-frontend-js-utils';
import { getTidsperiode } from '../Tidsperioden';
import { getUttaksinfoFromPeriode } from '../periodeinfo';
import { Perioden } from '../Perioden';

const periode1: Periode = {
    id: guid(),
    fixed: false,
    forelder: Forelder.forelder1,
    gradering: undefined,
    tidsperiode: getTidsperiode(new Date(), 10),
    type: Periodetype.Uttak
};
periode1.uttaksinfo = getUttaksinfoFromPeriode(periode1);
const periode2: Periode = {
    id: guid(),
    fixed: false,
    forelder: Forelder.forelder2,
    gradering: undefined,
    tidsperiode: getTidsperiode(new Date(), 20),
    type: Periodetype.Uttak
};
periode2.uttaksinfo = getUttaksinfoFromPeriode(periode2);

describe('Perioden', () => {
    it('periode sammenlignet med seg selv er lik', () => {
        expect(Perioden(periode1).erLik(periode2)).toBeFalsy();
    });
    describe('Returnerer at perioder ikke er like når', () => {
        it('forelder er ulik', () => {
            expect(
                Perioden(periode1).erLik({
                    ...periode1,
                    forelder: Forelder.forelder2
                })
            ).toBeFalsy();
        });
        it('når fixed er ulik', () => {
            expect(
                Perioden(periode1).erLik({
                    ...periode1,
                    forelder: Forelder.forelder2
                })
            ).toBeFalsy();
        });
        it('når fixed er ulik', () => {
            expect(
                Perioden(periode1).erLik({
                    ...periode1,
                    forelder: Forelder.forelder2
                })
            ).toBeFalsy();
        });
        it('når gradering er ulik', () => {
            expect(
                Perioden(periode1).erLik({
                    ...periode1,
                    gradering: 1
                })
            ).toBeFalsy();
        });
        it('når type er ulik', () => {
            expect(
                Perioden(periode1).erLik({
                    ...periode1,
                    type: Periodetype.UbetaltPermisjon
                })
            ).toBeFalsy();
        });
    });
    describe('Ignorerer felter ved sammenligning', () => {
        it('når id er ulik', () => {
            expect(
                Perioden(periode1).erLik({
                    ...periode1,
                    id: guid()
                })
            ).toBeTruthy();
        });
        it('når tidsperiode er ulik', () => {
            expect(
                Perioden(periode1).erLik({
                    ...periode1,
                    tidsperiode: periode2.tidsperiode
                })
            ).toBeTruthy();
        });
        it('når uttaksinfo er ulik', () => {
            expect(
                Perioden(periode1).erLik({
                    ...periode1,
                    uttaksinfo: getUttaksinfoFromPeriode(periode2)
                })
            ).toBeTruthy();
        });
    });
});
