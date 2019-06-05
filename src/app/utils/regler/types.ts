import { Periode, UttakFørTerminPeriode, Uttaksdatoer, TilgjengeligeDager } from 'app/types';
import { Forelder, Forbruk, ForeldreparSituasjon } from 'shared/types';

export interface Regelgrunnlag {
    perioder: Periode[];
    periodeFørTermin: UttakFørTerminPeriode | undefined;
    familiehendelsesdato: Date;
    situasjon: ForeldreparSituasjon;
    forelderVedAleneomsorg?: Forelder;
    erDeltOmsorg: boolean;
    uttaksdatoer: Uttaksdatoer;
    navnMor: string;
    navnFarMedmor?: string;
    forbruk?: Forbruk;
    tilgjengeligeDager?: TilgjengeligeDager;
    antallBarn: number;
}
