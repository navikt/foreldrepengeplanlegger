import moment from 'moment';
import { Uttaksdagen } from './Uttaksdagen';
import { getTidsperiode } from './Tidsperioden';
import { Uttaksdatoer } from '../types';
import { ForeldreparSituasjon } from 'shared/types';
import { getGjelderBareFarHarRett } from './common';

export const getUttaksdatoer = (familiehendelsesdato: Date, situasjon: ForeldreparSituasjon): Uttaksdatoer => {
    const førsteUttaksdagEtterFamiliehendelsesdato = Uttaksdagen(familiehendelsesdato).denneEllerNeste();
    const sisteUttaksdagInnenforSeksUker = getTidsperiode(førsteUttaksdagEtterFamiliehendelsesdato, 30).tom;
    const førsteUttaksdagEtterSeksUker = Uttaksdagen(sisteUttaksdagInnenforSeksUker).neste();
    const førsteUttaksdag =
        situasjon && getGjelderBareFarHarRett(situasjon)
            ? førsteUttaksdagEtterSeksUker
            : førsteUttaksdagEtterFamiliehendelsesdato;

    const førsteUttaksdagForeldrepengerFørFødsel = getFørsteUttaksdagForeldrepengerFørFødsel(familiehendelsesdato);
    const førsteMuligeUttaksdag = getFørsteMuligeUttaksdag(familiehendelsesdato);
    const sisteUttaksdagFørFødsel = Uttaksdagen(førsteUttaksdagEtterFamiliehendelsesdato).forrige();
    const sisteMuligeUttaksdag = getSisteMuligeUttaksdag(familiehendelsesdato);

    return {
        førsteUttaksdag,
        førFødsel: {
            førsteMuligeUttaksdag,
            sisteUttaksdagFørFødsel,
            førsteUttaksdagForeldrepengerFørFødsel
        },
        etterFødsel: {
            sisteUttaksdagInnenforSeksUker,
            førsteUttaksdagEtterSeksUker,
            sisteMuligeUttaksdag
        }
    };
};

export function getFørsteUttaksdagPåEllerEtterFødsel(familiehendelsesdato: Date) {
    return Uttaksdagen(familiehendelsesdato).denneEllerNeste();
}

export function getFørsteUttaksdagForeldrepengerFørFødsel(familiehendelsesdato: Date): Date {
    return Uttaksdagen(getFørsteUttaksdagPåEllerEtterFødsel(familiehendelsesdato)).trekkFra(15);
}

export function getFørsteMuligeUttaksdag(familiehendelsesdato: Date): Date {
    return Uttaksdagen(getFørsteUttaksdagPåEllerEtterFødsel(familiehendelsesdato)).trekkFra(12 * 5);
}

export function getSisteMuligeUttaksdag(familiehendelsesdato: Date): Date {
    return Uttaksdagen(
        moment
            .utc(getFørsteUttaksdagPåEllerEtterFødsel(familiehendelsesdato))
            .add(3, 'year')
            .toDate()
    ).denneEllerNeste();
}
