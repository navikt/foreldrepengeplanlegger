import { Periode, Forelder, Periodetype } from 'app/types';
import { getUttaksinfoFromPeriode } from 'app/utils/periodeinfo';

const periode1: Periode = {
    forelder: Forelder.forelder1,
    id: '89658209-22972-6250-27502-00358020458507',
    tidsperiode: {
        fom: new Date('2019-01-13T23:00:00.000Z'),
        tom: new Date('2019-02-07T23:00:00.000Z')
    },
    type: Periodetype.Uttak
};
const periode2: Periode = {
    forelder: Forelder.forelder1,
    id: '77701867-4877-12517-0900-7334518603539',
    tidsperiode: {
        fom: new Date('2019-02-10T23:00:00.000Z'),
        tom: new Date('2019-02-21T23:00:00.000Z')
    },
    type: Periodetype.Ferie
};
const periode3: Periode = {
    forelder: Forelder.forelder2,
    id: '56204685-2952-7449-7913-90900854017945',
    tidsperiode: {
        fom: new Date('2019-02-24T23:00:00.000Z'),
        tom: new Date('2019-03-21T23:00:00.000Z')
    },
    type: Periodetype.Uttak
};

export const mockPerioder: Periode[] = [periode1, periode2, periode3].map(
    (periode: Periode): Periode => ({
        ...periode,
        uttaksinfo: getUttaksinfoFromPeriode(periode)
    })
);
