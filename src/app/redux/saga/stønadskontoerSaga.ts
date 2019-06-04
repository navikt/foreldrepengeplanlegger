import { takeEvery, all, put, select, call } from 'redux-saga/effects';
import api from '../../api';
import { GetTilgjengeligeStønadskontoerParams, FPKontoServiceDTO } from '../../api/types';
import { getStønadskontoSortOrder } from '../../utils/kontoUtils';
import { updateApi } from '../actions/api/apiActionCreators';
import { CommonActionKeys, GetStønadskontoerAction } from '../actions/common/commonActionDefinitions';
import { setStønadskontoer } from '../actions/common/commonActionCreators';
import { SituasjonSkjemadata, TilgjengeligStønadskonto, StønadskontoType, ForeldreparSituasjon } from '../../types';
import { AppState } from '../reducers/rootReducer';
import situasjonsregler from '../../utils/situasjonsregler';
import { Dekningsgrad } from 'common/types';
import { getFørsteUttaksdagForeldrepengerFørFødsel } from '../../utils/uttaksdatoer';

const getStønadskontoerRequestParams = (
    familiehendelsesdato: Date,
    data: SituasjonSkjemadata,
    dekningsgrad: Dekningsgrad
): GetTilgjengeligeStønadskontoerParams => {
    return {
        antallBarn: data.antallBarn,
        erFødsel: true,
        familiehendelsesdato,
        farHarAleneomsorg: situasjonsregler.harFarAleneomsorg(data.situasjon, data.forelderVedAleneomsorg),
        farHarRett: situasjonsregler.harFarRett(data.situasjon),
        morHarAleneomsorg: situasjonsregler.harMorAleneomsorg(data.situasjon, data.forelderVedAleneomsorg),
        morHarRett: situasjonsregler.harMorRett(data.situasjon),
        startdatoUttak: getFørsteUttaksdagForeldrepengerFørFødsel(familiehendelsesdato),
        dekningsgrad
    };
};
const stateSelector = (state: AppState) => state;

const sortStønadskonto = (a: TilgjengeligStønadskonto, b: TilgjengeligStønadskonto) =>
    getStønadskontoSortOrder(a.konto) > getStønadskontoSortOrder(b.konto) ? 1 : -1;

const trekkFlerbarnsdagerFraFellesperiode = (kontoerDTO: FPKontoServiceDTO): FPKontoServiceDTO => {
    const flerbarnsdager = kontoerDTO.kontoer[StønadskontoType.Flerbarnsdager];
    const fellesperiode = kontoerDTO.kontoer[StønadskontoType.Fellesperiode];
    if (flerbarnsdager && fellesperiode) {
        return {
            ...kontoerDTO,
            kontoer: {
                ...kontoerDTO.kontoer,
                [`${StønadskontoType.Fellesperiode}`]: fellesperiode - flerbarnsdager
            }
        };
    }
    return kontoerDTO;
};

const fjernForeldrepengerFørFødselToFedre = (
    kontoerDTO: FPKontoServiceDTO,
    situasjon: ForeldreparSituasjon
): FPKontoServiceDTO => {
    if (situasjon === ForeldreparSituasjon.farOgFar) {
        const { FORELDREPENGER_FØR_FØDSEL, ...rest } = kontoerDTO.kontoer;
        return { kontoer: rest };
    }
    return kontoerDTO;
};
const getKontoerFromForeldrepengerDTO = (
    kontoer80: FPKontoServiceDTO,
    kontoer100: FPKontoServiceDTO,
    situasjon: ForeldreparSituasjon
): { dekning80: TilgjengeligStønadskonto[]; dekning100: TilgjengeligStønadskonto[] } => {
    const dekning80: TilgjengeligStønadskonto[] = [];
    const dekning100: TilgjengeligStønadskonto[] = [];

    const justerteKontoer80 = fjernForeldrepengerFørFødselToFedre(
        trekkFlerbarnsdagerFraFellesperiode(kontoer80),
        situasjon
    );
    const justerteKontoer100 = fjernForeldrepengerFørFødselToFedre(
        trekkFlerbarnsdagerFraFellesperiode(kontoer100),
        situasjon
    );

    Object.keys(justerteKontoer80.kontoer).forEach((konto) => {
        dekning80.push({
            dager: justerteKontoer80.kontoer[konto],
            konto: konto as StønadskontoType
        });
        dekning100.push({
            dager: justerteKontoer100.kontoer[konto],
            konto: konto as StønadskontoType
        });
    });
    dekning80.sort(sortStønadskonto);
    dekning100.sort(sortStønadskonto);
    return {
        dekning100,
        dekning80
    };
};

function* getStønadskontoerSaga(action: GetStønadskontoerAction) {
    const appState: AppState = yield select(stateSelector);
    const { skjemadata, familiehendelsesdato } = appState.common.present;
    if (!skjemadata) {
        return;
    }
    const params80 = getStønadskontoerRequestParams(familiehendelsesdato, skjemadata, '80');
    const params100 = getStønadskontoerRequestParams(familiehendelsesdato, skjemadata, '100');
    try {
        yield put(updateApi({ stønadskontoer: { pending: true, error: undefined, result: undefined } }));
        const response80 = yield call(api.getUttakskontoer, params80);
        const response100 = yield call(api.getUttakskontoer, params100);
        const { dekning100, dekning80 } = getKontoerFromForeldrepengerDTO(
            response80.data,
            response100.data,
            skjemadata.situasjon
        );
        yield put(setStønadskontoer({ dekning80, dekning100 }));
        yield put(
            updateApi({
                stønadskontoer: {
                    loaded: true,
                    pending: false
                }
            })
        );
    } catch (error) {
        yield put(
            updateApi({
                stønadskontoer: { pending: false, result: undefined, error, loaded: true }
            })
        );
    }
}

function* stønadskontoerSaga() {
    yield all([takeEvery(CommonActionKeys.GET_STØNADSKONTOER, getStønadskontoerSaga)]);
}

export default stønadskontoerSaga;
