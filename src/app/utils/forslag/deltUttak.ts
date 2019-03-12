import { TilgjengeligStønadskonto, Periode, StønadskontoType, Periodetype, Forelder } from '../../types';
import { guid } from 'nav-frontend-js-utils';
import { getTidsperiode } from '../Tidsperioden';
import { Uttaksdagen } from '../Uttaksdagen';

export const deltUttakFødselForslag = (
    famDato: Date,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    fellesperiodedagerMor: number
): Periode[] => {
    const førsteUttaksdag = Uttaksdagen(famDato).denneEllerNeste();
    const perioder: Periode[] = [];
    const fellesKonto: TilgjengeligStønadskonto | undefined = tilgjengeligeStønadskontoer.find(
        (konto) => konto.stønadskontoType === StønadskontoType.Fellesperiode
    );
    const flerbarnsKonto: TilgjengeligStønadskonto | undefined = tilgjengeligeStønadskontoer.find(
        (konto) => konto.stønadskontoType === StønadskontoType.Flerbarnsdager
    );
    const mkKonto: TilgjengeligStønadskonto | undefined = tilgjengeligeStønadskontoer.find(
        (konto) => konto.stønadskontoType === StønadskontoType.Mødrekvote
    );
    const fkKonto: TilgjengeligStønadskonto | undefined = tilgjengeligeStønadskontoer.find(
        (konto) => konto.stønadskontoType === StønadskontoType.Fedrekvote
    );

    const fellesperiodedagerTotalt =
        (fellesKonto ? fellesKonto.dager : 0) + (flerbarnsKonto ? flerbarnsKonto.dager : 0);

    let currentTomDate: Date = førsteUttaksdag;

    if (mkKonto !== undefined) {
        const dagerTilMor = fellesperiodedagerMor + mkKonto.dager;
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
        const dagerTilFar = fellesperiodedagerTotalt - fellesperiodedagerMor + fkKonto.dager;
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
