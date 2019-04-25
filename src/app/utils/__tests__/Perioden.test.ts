import { Periode, Forelder, Periodetype } from '../../types';
import { guid } from 'nav-frontend-js-utils';
import { getTidsperiode } from '../Tidsperioden';
import { getUttaksinfoForPeriode } from '../uttaksinfo';
import { Perioden } from '../Perioden';

const periode1: Periode = {
    id: guid(),
    fixed: false,
    forelder: Forelder.farMedmor,
    tidsperiode: getTidsperiode(new Date(1, 0, 2019), 10),
    type: Periodetype.Uttak
};
periode1.uttaksinfo = getUttaksinfoForPeriode(periode1);
const periode2: Periode = {
    id: guid(),
    fixed: false,
    forelder: Forelder.mor,
    tidsperiode: getTidsperiode(new Date(8, 0, 2019), 20),
    type: Periodetype.Uttak
};
periode2.uttaksinfo = getUttaksinfoForPeriode(periode2);

describe('Perioden', () => {
    it('periode sammenlignet med seg selv er lik', () => {
        expect(Perioden(periode1).erLik(periode2)).toBeFalsy();
    });
    describe('Returnerer at perioder ikke er like når', () => {
        it('forelder er ulik', () => {
            expect(
                Perioden(periode1).erLik({
                    ...periode1,
                    forelder: Forelder.mor
                })
            ).toBeFalsy();
        });
        it('når fixed er ulik', () => {
            expect(
                Perioden(periode1).erLik({
                    ...periode1,
                    fixed: true
                })
            ).toBeFalsy();
        });
        it('når gradering er ulik', () => {
            expect(
                Perioden({ ...periode1, type: Periodetype.GradertUttak, gradering: 10 }).erLik({
                    ...{ ...periode1, type: Periodetype.GradertUttak, gradering: 20 }
                })
            ).toBeFalsy();
        });
        it('når type er ulik', () => {
            expect(
                Perioden(periode1).erLik({
                    ...periode1,
                    type: Periodetype.UlønnetPermisjon,
                    utsettelsesårsak: undefined
                })
            ).toBeFalsy();
        });
    });
    describe('Ignorerer felter ved sammenligning', () => {
        it('ignorerer id', () => {
            expect(
                Perioden(periode1).erLik({
                    ...periode1,
                    id: guid()
                })
            ).toBeTruthy();
        });
        it('ignorerer tidsperiode', () => {
            expect(
                Perioden(periode1).erLik({
                    ...periode1,
                    tidsperiode: periode2.tidsperiode
                })
            ).toBeTruthy();
        });
        it('ignorerer uttaksinfo', () => {
            expect(
                Perioden(periode1).erLik({
                    ...periode1,
                    uttaksinfo: getUttaksinfoForPeriode(periode2)
                })
            ).toBeTruthy();
        });
    });
});
