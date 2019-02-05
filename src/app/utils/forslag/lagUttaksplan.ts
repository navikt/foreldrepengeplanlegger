import { TilgjengeligStønadskonto, Periode, StønadskontoType, Periodetype, Forelder } from '../../types';
import { Uttaksdagen } from '../Uttaksdagen';
import { guid } from 'nav-frontend-js-utils';
import { getTidsperiode } from '../Tidsperioden';
import { getUttaksinfoForPeriode } from '../uttaksinfo';

export const lagUttaksplan = (
    famDato: Date,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    fellesperiodeukerMor: number
): Periode[] => {
    const plan = deltUttakFødselMor(famDato, tilgjengeligeStønadskontoer, fellesperiodeukerMor);
    return plan.map((p) => ({ ...p, uttaksinfo: getUttaksinfoForPeriode(p) }));
};

const deltUttakFødselMor = (
    famDato: Date,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    fellesperiodeukerMor: number
): Periode[] => {
    const førsteUttaksdag = Uttaksdagen(famDato).denneEllerNeste();
    const perioder: Periode[] = [];
    const fellesKonto: TilgjengeligStønadskonto | undefined = tilgjengeligeStønadskontoer.find(
        (konto) => konto.stønadskontoType === StønadskontoType.Fellesperiode
    );
    const mkKonto: TilgjengeligStønadskonto | undefined = tilgjengeligeStønadskontoer.find(
        (konto) => konto.stønadskontoType === StønadskontoType.Mødrekvote
    );
    const fkKonto: TilgjengeligStønadskonto | undefined = tilgjengeligeStønadskontoer.find(
        (konto) => konto.stønadskontoType === StønadskontoType.Fedrekvote
    );
    const fellesperiodeUkerTotalt = fellesKonto!.dager / 5;
    let currentTomDate: Date = førsteUttaksdag;

    if (mkKonto !== undefined) {
        const dagerTilMor = fellesperiodeukerMor * 5 + mkKonto.dager;
        const periodeMor: Periode = {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.mor,
            tidsperiode: getTidsperiode(currentTomDate, dagerTilMor)
        };
        currentTomDate = Uttaksdagen(periodeMor.tidsperiode.tom).neste();
        perioder.push(periodeMor);
    }
    if (fkKonto !== undefined) {
        const dagerTilFar = (fellesperiodeUkerTotalt - fellesperiodeukerMor) * 5 + fkKonto.dager;
        const periodeFar: Periode = {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.farMedmor,
            tidsperiode: getTidsperiode(currentTomDate, dagerTilFar)
        };
        currentTomDate = Uttaksdagen(periodeFar.tidsperiode.tom).neste();
        perioder.push(periodeFar);
    }

    return perioder;
};
