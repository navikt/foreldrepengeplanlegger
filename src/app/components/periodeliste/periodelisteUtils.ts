import { Periode } from '../../types';
import { Perioden } from '../../utils/Perioden';
import { UttaksplanRegelTestresultat, RegelAvvik, RegelAlvorlighet } from '../../utils/regler/types';
import { AlertStripeType } from 'nav-frontend-alertstriper';

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
    return testresultater.avvikPerPeriode[periodeId];
};

export const getAlertstripeTypeFromRegelAvvik = (avvik: RegelAvvik): AlertStripeType => {
    switch (avvik.alvorlighet) {
        case RegelAlvorlighet.FEIL:
            return 'feil';
        case RegelAlvorlighet.ADVARSEL:
            return 'advarsel';
        default:
            return 'info';
    }
};

export default periodelisteUtils;
