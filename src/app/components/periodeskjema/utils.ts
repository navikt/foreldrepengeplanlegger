import { Periodetype, Periode, OmForeldre, Forelder } from '../../types';
import { PeriodeskjemaFormValues } from './types';
import { getUttaksinfoForPeriode } from '../../utils/uttaksinfo';
import { Tidsperioden } from '../../utils/Tidsperioden';

const createPeriodeFromValues = (values: PeriodeskjemaFormValues, nyPeriodeId: string): Periode => {
    switch (values.periodetype) {
        case Periodetype.Ferie:
            return {
                type: Periodetype.Ferie,
                id: nyPeriodeId,
                tidsperiode: {
                    fom: values.fom,
                    tom: values.tom
                },
                forelder: values.forelder
            };
        case Periodetype.Arbeid:
            return {
                type: Periodetype.Arbeid,
                id: nyPeriodeId,
                tidsperiode: {
                    fom: values.fom,
                    tom: values.tom
                },
                forelder: values.forelder
            };
        case Periodetype.Uttak:
            return {
                type: Periodetype.Uttak,
                id: nyPeriodeId,
                tidsperiode: {
                    fom: values.fom,
                    tom: values.tom
                },
                forelder: values.forelder
            };
        case Periodetype.UttakFørTermin:
            return {
                type: Periodetype.UttakFørTermin,
                id: nyPeriodeId,
                tidsperiode: {
                    fom: values.fom,
                    tom: values.tom
                },
                forelder: values.forelder
            };
        case Periodetype.GradertUttak:
            return {
                type: Periodetype.GradertUttak,
                id: nyPeriodeId,
                tidsperiode: {
                    fom: values.fom,
                    tom: values.tom
                },
                forelder: values.forelder,
                gradering: values.gradering
            };
        case Periodetype.UbetaltPermisjon:
            return {
                type: Periodetype.UbetaltPermisjon,
                id: nyPeriodeId,
                tidsperiode: {
                    fom: values.fom,
                    tom: values.tom
                },
                forelder: values.forelder
            };
    }
};

const getInitialFormValuesFromPeriode = (
    periode: Periode | undefined,
    omForeldre: OmForeldre
): PeriodeskjemaFormValues | {} => {
    const getDefaultForelder = (): Forelder | undefined => {
        if (omForeldre.erAleneomsorgMor) {
            return Forelder.mor;
        }
        if (omForeldre.erAleneomsorgFarMedmor) {
            return Forelder.farMedmor;
        }
        return undefined;
    };
    if (!periode) {
        return {
            forelder: getDefaultForelder()
        };
    }
    return {
        fom: periode.tidsperiode.fom,
        tom: periode.tidsperiode.tom,
        forelder: periode.forelder,
        gradering: periode.gradering,
        periodetype: periode.type
    };
};

const getBrukteUttaksdagerForNyPeriode = (values: PeriodeskjemaFormValues): number | undefined => {
    const { fom, tom, periodetype } = values;
    if (fom && tom && periodetype) {
        const uttaksinfo = getUttaksinfoForPeriode(createPeriodeFromValues(values, ''));
        return uttaksinfo ? uttaksinfo.antallUttaksdagerBrukt : undefined;
    } else if (fom && tom) {
        return Tidsperioden({ fom, tom }).getAntallUttaksdager();
    }
    return undefined;
};

const periodeskjemaUtils = {
    createPeriodeFromValues,
    getInitialFormValuesFromPeriode,
    getBrukteUttaksdagerForNyPeriode
};

export default periodeskjemaUtils;
