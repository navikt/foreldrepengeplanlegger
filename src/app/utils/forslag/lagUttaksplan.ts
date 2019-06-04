import { TilgjengeligStønadskonto, Periode, ForeldreparSituasjon } from '../../types';
import { getUttaksinfoForPeriode } from '../uttaksinfo';
import { deltUttakFødselForslag } from './deltUttak';
import { getAntallForeldreISituasjon } from '../common';
import { ikkeDeltUttakForslag } from './ikkeDeltUttak';

export const lagUttaksplan = (
    situasjon: ForeldreparSituasjon,
    famDato: Date,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    fellesperiodedagerMor: number | undefined
): Periode[] => {
    const antallForelder = getAntallForeldreISituasjon(situasjon);
    let plan: Periode[] = [];
    plan =
        antallForelder === 2 && fellesperiodedagerMor !== undefined
            ? deltUttakFødselForslag(famDato, tilgjengeligeStønadskontoer, fellesperiodedagerMor)
            : ikkeDeltUttakForslag(famDato, tilgjengeligeStønadskontoer);

    return plan ? plan.map((p) => ({ ...p, uttaksinfo: getUttaksinfoForPeriode(p) })) : [];
};
