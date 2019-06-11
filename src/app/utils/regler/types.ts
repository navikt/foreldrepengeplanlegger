import { Periode, UttakFørTerminPeriode, Uttaksdatoer } from 'app/types';
import { Forbruk, ForeldreparSituasjon, TilgjengeligeDager } from 'shared/types';
import { Forelder } from 'common/types';

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
