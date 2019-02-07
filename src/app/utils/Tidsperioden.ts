import moment from 'moment';
import { Holiday } from 'date-holidays';
import { Tidsperiode } from 'common/types';
import { getOffentligeFridager } from 'common/utils/fridagerUtils';
import { Uttaksdagen } from './Uttaksdagen';
import { InjectedIntl } from 'react-intl';
import {
    formaterDatoUtenDag,
    dateIsSameOrBefore,
    dateIsSameOrAfter,
    formaterDato,
    formaterDatoMedDagKort
} from 'common/utils/datoUtils';
import getMessage from 'common/utils/i18nUtils';

export const Tidsperioden = (tidsperiode: Partial<Tidsperiode> | Tidsperiode) => ({
    erLik: (tidsperiode2: Tidsperiode) => erTidsperioderLike(tidsperiode, tidsperiode2),
    erOmsluttetAv: (tidsperiode2: Tidsperiode) => erTidsperiodeOmsluttetAvTidsperiode(tidsperiode, tidsperiode2),
    erUtenfor: (tidsperiode2: Tidsperiode) => erTidsperiodeUtenforTidsperiode(tidsperiode, tidsperiode2),
    getAntallUttaksdager: (taBortFridager?: boolean) => getAntallUttaksdagerITidsperiode(tidsperiode, taBortFridager),
    getAntallFridager: () => getUttaksdagerSomErFridager(tidsperiode).length,
    getUttaksdagerSomErFridager: () => getUttaksdagerSomErFridager(tidsperiode),
    setStartdato: (fom: Date) => (isValidTidsperiode(tidsperiode) ? flyttTidsperiode(tidsperiode, fom) : tidsperiode),
    setUttaksdager: (uttaksdager: number, uttaksprosent?: number) =>
        tidsperiode.fom ? getTidsperiode(tidsperiode.fom, uttaksdager, uttaksprosent) : tidsperiode,
    setUttaksdagerFlyttStartdato: (uttaksdager: number, uttaksprosent?: number) =>
        setUttaksdagerFlyttStartdato(tidsperiode, uttaksdager, uttaksprosent),
    formaterString: (intl: InjectedIntl) => tidsperiodeToString(tidsperiode, intl),
    formaterStringMedDag: (intl: InjectedIntl) => tidsperiodeToStringMedDag(tidsperiode, intl),
    formaterStringKort: (intl: InjectedIntl) => tidsperiodeToStringKort(tidsperiode, intl),
    erFomEllerEtterDato: (dato: Date) => erTidsperiodeFomEllerEtterDato(tidsperiode, dato),
    erFørDato: (dato: Date) => erTidsperiodeFomEllerEtterDato(tidsperiode, dato) === false
});

export function isValidTidsperiode(tidsperiode: any): tidsperiode is Tidsperiode {
    return (
        tidsperiode.fom !== undefined &&
        tidsperiode.tom !== undefined &&
        moment(tidsperiode.fom).isSameOrBefore(tidsperiode.tom, 'day')
    );
}

export function resetTidsperiodeTomIfBeforeFom(tidsperiode: Partial<Tidsperiode>): Partial<Tidsperiode> {
    return {
        fom: tidsperiode.fom,
        tom:
            tidsperiode.fom && tidsperiode.tom && moment(tidsperiode.fom).isAfter(tidsperiode.tom, 'day')
                ? tidsperiode.fom
                : tidsperiode.tom
    };
}

export function getValidTidsperiode(tidsperiode: Partial<Tidsperiode> | undefined): Tidsperiode | undefined {
    if (tidsperiode === undefined) {
        return undefined;
    }
    if (isValidTidsperiode(tidsperiode)) {
        return tidsperiode;
    }
    return undefined;
}

export function getTidsperiode(fom: Date, uttaksdager: number, uttaksprosent?: number): Tidsperiode {
    if (!Uttaksdagen(fom).erUttaksdag()) {
        throw new Error('FOM er ikke en uttaksdag');
    }
    return {
        fom,
        tom: Uttaksdagen(fom).leggTil(uttaksdager - 1, uttaksprosent)
    };
}

function getAntallUttaksdagerITidsperiode(tidsperiode: Partial<Tidsperiode>, taBortFridager?: boolean): number {
    if (isValidTidsperiode(tidsperiode) === false) {
        return 0;
    }
    const fom = moment(tidsperiode.fom);
    const tom = moment(tidsperiode.tom);
    if (fom.isAfter(tom, 'day')) {
        return 0;
    }
    let antall = 0;
    let fridager = 0;
    while (fom.isSameOrBefore(tom, 'day')) {
        if (Uttaksdagen(fom.toDate()).erUttaksdag()) {
            antall++;
        }
        fom.add(24, 'hours');
    }
    if (taBortFridager) {
        fridager = getUttaksdagerSomErFridager(tidsperiode).length;
    }
    return antall - fridager;
}

function getUttaksdagerSomErFridager(tidsperiode: Partial<Tidsperiode>): Holiday[] {
    if (isValidTidsperiode(tidsperiode) === false) {
        return [];
    }
    const { fom, tom } = tidsperiode as Tidsperiode;
    return getOffentligeFridager(fom, tom).filter((dag) => Uttaksdagen(dag.date).erUttaksdag());
}

function flyttTidsperiode(tidsperiode: Tidsperiode, fom: Date): Tidsperiode {
    const uttaksdager = getAntallUttaksdagerITidsperiode(tidsperiode);
    return getTidsperiode(fom, uttaksdager);
}

function erTidsperioderLike(t1: Partial<Tidsperiode>, t2: Partial<Tidsperiode>) {
    return JSON.stringify(t1) === JSON.stringify(t2);
}

function erTidsperiodeOmsluttetAvTidsperiode(
    tidsperiode1: Partial<Tidsperiode>,
    tidsperiode2: Partial<Tidsperiode>
): boolean {
    if (isValidTidsperiode(tidsperiode1) && isValidTidsperiode(tidsperiode2)) {
        return (
            dateIsSameOrAfter(tidsperiode1.fom, tidsperiode2.fom) &&
            dateIsSameOrBefore(tidsperiode1.tom, tidsperiode2.tom)
        );
    }
    return false;
}

function erTidsperiodeUtenforTidsperiode(
    tidsperiode1: Partial<Tidsperiode>,
    tidsperiode2: Partial<Tidsperiode>
): boolean {
    if (isValidTidsperiode(tidsperiode1) && isValidTidsperiode(tidsperiode2)) {
        return (
            moment(tidsperiode1.fom).isAfter(tidsperiode2.tom, 'day') ||
            moment(tidsperiode1.tom).isBefore(tidsperiode2.fom, 'day')
        );
    }
    return false;
}

function tidsperiodeToString(tidsperiode: Partial<Tidsperiode>, intl: InjectedIntl) {
    const { fom, tom } = tidsperiode;
    if (fom && tom && moment(fom).isSame(tom, 'day')) {
        return formaterDatoUtenDag(fom ? fom : tom);
    }
    return getMessage(intl, 'tidsperiode', {
        fom: fom ? formaterDatoUtenDag(fom) : '',
        tom: tom ? formaterDatoUtenDag(tom) : ''
    });
}

function tidsperiodeToStringMedDag(tidsperiode: Partial<Tidsperiode>, intl: InjectedIntl) {
    const { fom, tom } = tidsperiode;
    if (fom && tom && moment(fom).isSame(tom, 'day')) {
        return formaterDato(fom ? fom : tom);
    }
    return getMessage(intl, 'tidsperiode', {
        fom: fom ? formaterDato(fom) : '',
        tom: tom ? formaterDato(tom) : ''
    });
}

function tidsperiodeToStringKort(tidsperiode: Partial<Tidsperiode>, intl: InjectedIntl) {
    const { fom, tom } = tidsperiode;
    if (fom && tom && moment(fom).isSame(tom, 'day')) {
        return formaterDatoMedDagKort(fom ? fom : tom);
    }
    return getMessage(intl, 'tidsperiode.kort', {
        fom: fom ? formaterDatoMedDagKort(fom) : '',
        tom: tom ? formaterDatoMedDagKort(tom) : ''
    });
}

const erTidsperiodeFomEllerEtterDato = (tidsperiode: Partial<Tidsperiode>, dato: Date): boolean => {
    return (
        tidsperiode.fom !== undefined &&
        tidsperiode.tom !== undefined &&
        moment(tidsperiode.fom).isSameOrAfter(dato, 'day') &&
        moment(tidsperiode.tom).isSameOrAfter(dato, 'day')
    );
};

function setUttaksdagerFlyttStartdato(
    tidsperiode: Partial<Tidsperiode>,
    uttaksdager: number,
    uttaksprosent?: number
): Partial<Tidsperiode> {
    const { tom } = tidsperiode;
    if (tom && uttaksdager > 0) {
        return { fom: Uttaksdagen(tom).trekkFra(uttaksdager - 1, uttaksprosent), tom };
    }
    return tidsperiode;
}
