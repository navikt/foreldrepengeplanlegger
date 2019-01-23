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

export interface StønadskontoerDTO {
    kontoer: {
        [key: string]: {
            d80: number;
            d100: number;
        };
    };
}
