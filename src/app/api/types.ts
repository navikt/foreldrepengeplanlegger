import { Dekningsgrad } from 'common/types';

export interface GetTilgjengeligeStønadskontoerParams {
    antallBarn: number;
    morHarRett: boolean;
    farHarRett: boolean;
    dekningsgrad: Dekningsgrad;
    familiehendelsesdato: Date;
    erFødsel: boolean;
    morHarAleneomsorg?: boolean;
    farHarAleneomsorg?: boolean;
    startdatoUttak: Date;
}

export interface StønadskontoerDTO {
    kontoer: {
        [key: string]: number;
    };
}
