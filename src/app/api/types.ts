export interface GetTilgjengeligeStønadskontoerParams {
    antallBarn: number;
    morHarRett: boolean;
    farHarRett: boolean;
    familiehendelsesdato: Date;
    erFødsel: boolean;
    morHarAleneomsorg?: boolean;
    farHarAleneomsorg?: boolean;
    startdatoUttak: Date;
}

export interface StønadskontoDTO {
    d80: number;
    d100: number;
}

export interface GetStønadskontoerDTO {
    kontoer: {
        [key: string]: StønadskontoDTO;
    };
}
