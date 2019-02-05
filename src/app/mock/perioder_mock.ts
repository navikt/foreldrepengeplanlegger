import { Periode, Forelder, Periodetype } from 'app/types';
import { getUttaksinfoForPeriode } from '../utils/uttaksinfo';

const toForeldrePeriode1: Periode = {
    forelder: Forelder.mor,
    id: '89658209-22972-6250-27502-00358020458505',
    tidsperiode: {
        fom: new Date('2019-02-07T23:00:00.000Z'),
        tom: new Date('2019-07-17T23:00:00.000Z')
    },
    type: Periodetype.Uttak
};
const toForeldrePeriode2: Periode = {
    forelder: Forelder.mor,
    id: '77701867-4877-12517-0900-7334518603534',
    tidsperiode: {
        fom: new Date('2019-07-18T23:00:00.000Z'),
        tom: new Date('2019-07-31T23:00:00.000Z')
    },
    fixed: true,
    type: Periodetype.Ferie
};
const toForeldrePeriode3: Periode = {
    forelder: Forelder.farMedmor,
    id: '56204685-2952-7449-7913-90900854017943',
    tidsperiode: {
        fom: new Date('2019-08-01T23:00:00.000Z'),
        tom: new Date('2020-01-08T23:00:00.000Z')
    },
    type: Periodetype.Uttak
};

const enForelderPeriode1: Periode = {
    forelder: Forelder.farMedmor,
    id: '89658209-22972-6250-27502-00358020458502',
    tidsperiode: {
        fom: new Date('2019-01-13T23:00:00.000Z'),
        tom: new Date('2019-02-07T23:00:00.000Z')
    },
    type: Periodetype.Uttak
};
const enForelderPeriode2: Periode = {
    forelder: Forelder.farMedmor,
    id: '89658209-22972-6250-27502-00358020458501',
    tidsperiode: {
        fom: new Date('2019-01-13T23:00:00.000Z'),
        tom: new Date('2019-02-07T23:00:00.000Z')
    },
    type: Periodetype.Uttak
};

const mapPeriodeMedUttaksinfo = (periode: Periode): Periode => ({
    ...periode,
    uttaksinfo: getUttaksinfoForPeriode(periode)
});

const toForelderEttBarn: Periode[] = [toForeldrePeriode1, toForeldrePeriode2, toForeldrePeriode3].map(
    mapPeriodeMedUttaksinfo
);
const toForelderToBarn: Periode[] = [toForeldrePeriode1, toForeldrePeriode2, toForeldrePeriode3].map(
    mapPeriodeMedUttaksinfo
);
const toForelderTreBarn: Periode[] = [toForeldrePeriode1, toForeldrePeriode2, toForeldrePeriode3].map(
    mapPeriodeMedUttaksinfo
);

const aleneforelderEttBarn: Periode[] = [enForelderPeriode1, enForelderPeriode2].map(mapPeriodeMedUttaksinfo);
const aleneforelderToBarn: Periode[] = [enForelderPeriode1, enForelderPeriode2].map(mapPeriodeMedUttaksinfo);
const aleneforelderTreBarn: Periode[] = [enForelderPeriode1, enForelderPeriode2].map(mapPeriodeMedUttaksinfo);

const perioderAleneforelder: Periode[][] = [aleneforelderEttBarn, aleneforelderToBarn, aleneforelderTreBarn];
const perioderToForeldre: Periode[][] = [toForelderEttBarn, toForelderToBarn, toForelderTreBarn];

export const getMockPerioder = (antallBarn: number, antallForeldre: number): Periode[] => {
    return antallForeldre === 1 ? perioderAleneforelder[antallBarn - 1] : perioderToForeldre[antallBarn - 1] || [];
};
