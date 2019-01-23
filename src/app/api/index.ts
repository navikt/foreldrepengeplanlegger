import axios from 'axios';
import { formaterDato } from 'common/utils/datoUtils';
import { GetTilgjengeligeStønadskontoerParams } from './types';
import Environment from '../../app/Environment';

const uttakBaseUrl = Environment.FPP_API_URL;

function getUttakskontoer(params: GetTilgjengeligeStønadskontoerParams) {
    const {
        antallBarn,
        farHarRett,
        morHarRett,
        familiehendelsesdato,
        erFødsel,
        morHarAleneomsorg,
        farHarAleneomsorg,
        startdatoUttak
    } = params;

    const urlParams = {
        erFodsel: erFødsel,
        farHarRett,
        morHarRett,
        morHarAleneomsorg: morHarAleneomsorg || false,
        farHarAleneomsorg: farHarAleneomsorg || false,
        antallBarn,
        familiehendelsesdato: formaterDato(familiehendelsesdato, 'YYYYMMDD'),
        startdatoUttak: formaterDato(startdatoUttak, 'YYYYMMDD')
    };

    return axios.get(`${uttakBaseUrl}/konto`, {
        timeout: 15 * 1000,
        params: urlParams
    });
}

const api = {
    getUttakskontoer
};

export default api;
