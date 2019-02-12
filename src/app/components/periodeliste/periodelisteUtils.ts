import { Periode } from '../../types';
import { Perioden } from '../../utils/Perioden';

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

export default periodelisteUtils;
