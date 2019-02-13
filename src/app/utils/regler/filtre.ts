import moment from 'moment';
import { getUttaksdatoer } from '../uttaksdatoer';

export const erInnenforSeksFørsteUker = (dato: Date, familiehendelsesdato: Date): boolean => {
    const { sisteUttaksdagInnenforSeksUker } = getUttaksdatoer(familiehendelsesdato).etterFødsel;
    return moment(dato).isSameOrBefore(sisteUttaksdagInnenforSeksUker, 'day');
};
