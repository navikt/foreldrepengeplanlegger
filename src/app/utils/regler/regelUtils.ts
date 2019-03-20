import {
    Regelgrunnlag,
    UttaksplanRegelTestresultat,
    RegelAvvik,
    Regel,
    RegelTestresultatInfo,
    RegelStatus
} from './types';
import uttaksplanRegler from '.';
import { InjectedIntl } from 'react-intl';

export const sjekkUttaksplanOppMotRegler = (regelgrunnlag: Regelgrunnlag): RegelStatus[] => {
    return uttaksplanRegler.map((regel) => {
        const resultat = regel.test(regelgrunnlag);
        return resultat.passerer ? regelPasserer(regel) : regelHarAvvik(regel, resultat.info, resultat.periodeId);
    });
};

const getRegelIntlKey = (regel: Regel): string => `regel.${regel.alvorlighet}.${regel.key}`;

const ensureRegelTestresultatIntlKey = (regel: Regel, info?: RegelTestresultatInfo): RegelTestresultatInfo => ({
    ...info,
    intlKey: info ? info.intlKey || getRegelIntlKey(regel) : getRegelIntlKey(regel)
});

export const regelHarAvvik = (regel: Regel, info?: RegelTestresultatInfo, periodeId?: string): RegelStatus => {
    return {
        key: regel.key,
        passerer: false,
        regelAvvik: {
            key: regel.key,
            alvorlighet: regel.alvorlighet,
            info: ensureRegelTestresultatIntlKey(regel, info),
            overstyrerRegler: regel.overstyrerRegler,
            overstyresAvRegel: regel.overstyresAvRegel,
            periodeId
        }
    };
};

export const regelPasserer = (regel: Regel): RegelStatus => ({
    key: regel.key,
    passerer: true
});

export const getRegelAvvikForPeriode = (
    resultat: UttaksplanRegelTestresultat,
    periodeId: string
): RegelAvvik[] | undefined => {
    if (resultat && resultat.resultatPerPeriode[periodeId]) {
        return resultat.resultatPerPeriode[periodeId]
            .filter((r) => r.passerer === false && r.regelAvvik !== undefined)
            .map((r) => r.regelAvvik!);
    }
    return undefined;
};

export const getRegelAvvik = (resultat: RegelStatus[]): RegelAvvik[] => {
    if (resultat) {
        return resultat.filter((r) => r.passerer === false && r.regelAvvik !== undefined).map((r) => r.regelAvvik!);
    }
    return [];
};

const overstyresAvFilter = (avvik: RegelAvvik, idx: number, alleAvvik: RegelAvvik[]): boolean => {
    return (
        avvik.overstyresAvRegel === undefined && alleAvvik.some((b2) => b2.key === avvik.overstyresAvRegel) === false
    );
};

const overstyrerAndreFilter = (avvik: RegelAvvik, idx: number, alleAvvik: RegelAvvik[]): boolean => {
    const overstyresAvAndre = alleAvvik.some((rb) =>
        rb.overstyrerRegler
            ? rb.overstyrerRegler.some((rbo) => {
                  return rbo === avvik.key;
              })
            : false
    );
    return overstyresAvAndre === false;
};

export const trimRelaterteRegelAvvik = (avvik: RegelAvvik[]): RegelAvvik[] => {
    return avvik.filter(overstyresAvFilter).filter(overstyrerAndreFilter);
};

export const getRegelIntlValues = (
    intl: InjectedIntl,
    info: RegelTestresultatInfo
): { [key: string]: string } | undefined => {
    const { values } = info;
    if (values === undefined) {
        return undefined;
    }
    const newValues: { [key: string]: string } = {};
    Object.keys(values).forEach((key) => {
        const valueOrFunc = values[key];
        if (valueOrFunc) {
            newValues[key] = typeof valueOrFunc === 'function' ? valueOrFunc(intl) : `${valueOrFunc}`;
        }
    });
    return newValues;
};
