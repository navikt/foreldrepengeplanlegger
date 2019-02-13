import { Periode } from '../../types';
import { Perioden } from '../../utils/Perioden';
import { UttaksplanRegelTestresultat, Regelbrudd, RegelAlvorlighet } from '../../utils/regler/types';

const periodelisteUtils = {
    erPeriodeLikForrigePeriode: (
        perioder: Periode[],
        periode: Periode,
        index: number,
        antallPerioder: number
    ): boolean => {
        if (index === 0 || index === antallPerioder) {
            return false;
        }
        const forrigePeriode = perioder[index - 1];
        return Perioden(forrigePeriode).erLik(periode);
    }
};

export const getRegelTestresultatForPeriode = (periodeId: string, testresultater: UttaksplanRegelTestresultat) => {
    return testresultater.resultatPerPeriode[periodeId];
};

export const getAlertstripeTypeFromRegelbrudd = (brudd: Regelbrudd): 'info' | 'advarsel' | 'stopp' => {
    switch (brudd.alvorlighet) {
        case RegelAlvorlighet.ULOVLIG:
            return 'stopp';
        default:
            return 'info';
    }
};

export default periodelisteUtils;