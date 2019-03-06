import { OmForeldre, Forbruk } from '../types';
import { InjectedIntl } from 'react-intl';
import { getVarighetString } from 'common/utils/intlUtils';

export type FordelingStatusVerdi = 'suksess' | 'advarsel' | 'feil';

interface FordelingStatus {
    status: FordelingStatusVerdi;
    tittel: {
        key: string;
        values?: any;
    };
}

const feil = (key: string, values?: {}): FordelingStatus => {
    return {
        status: 'feil',
        tittel: {
            key: `fordeling.status.${key}`,
            values
        }
    };
};

const advarsel = (key: string, values?: {}): FordelingStatus => {
    return {
        status: 'advarsel',
        tittel: {
            key: `fordeling.status.${key}`,
            values
        }
    };
};

const ok = (key: string, values?: {}): FordelingStatus => {
    return {
        status: 'suksess',
        tittel: {
            key: `fordeling.status.${key}`,
            values
        }
    };
};

export function getFordelingStatus(forbruk: Forbruk, omForeldre: OmForeldre, intl: InjectedIntl): FordelingStatus {
    const { dagerGjenstående, mor, farMedmor } = forbruk;
    if (farMedmor === undefined || omForeldre.farMedmor === undefined) {
        return {
            status: 'advarsel',
            tittel: {
                key: 'Todo: Aleneomsorg'
            }
        };
    }

    const totalOk = dagerGjenstående === 0;
    const forMangeDagerTotalt = dagerGjenstående < 0;
    const forFåDagerTotalt = dagerGjenstående > 0;

    if (totalOk && mor.dagerErOk && farMedmor.dagerErOk) {
        return ok('altOk');
    }

    if (forMangeDagerTotalt) {
        if (mor.dagerForMye > 0 && farMedmor.dagerForMye > 0) {
            return feil('forMangeDagerTotalt', { dager: getVarighetString(Math.abs(dagerGjenstående), intl) });
        }
        if (mor.dagerForMye > 0) {
            return advarsel('dagerForMyePerson', {
                navn: omForeldre.mor.navn,
                dager: getVarighetString(mor.dagerForMye, intl)
            });
        }
        if (farMedmor.dagerForMye > 0) {
            return advarsel('dagerForMyePerson', {
                navn: omForeldre.farMedmor.navn,
                dager: getVarighetString(farMedmor.dagerForMye, intl)
            });
        }
        return feil('forMangeDagerTotalt', { dager: getVarighetString(Math.abs(dagerGjenstående), intl) });
    }

    if (
        (forFåDagerTotalt && mor.dagerErOk && farMedmor.dagerErOk) ||
        (mor.dagerForLite > 0 && farMedmor.dagerForLite > 0)
    ) {
        return advarsel('dagerIkkeBrukt', { dager: getVarighetString(dagerGjenstående, intl) });
    }

    if (mor.dagerForMye > 0 || farMedmor.dagerForMye > 0) {
        const erMor = mor.dagerForMye > 0;
        const { dagerForMye } = erMor ? mor : farMedmor;
        return advarsel('dagerForMyePerson', {
            navn: erMor ? omForeldre.mor.navn : omForeldre.farMedmor.navn,
            dager: getVarighetString(dagerForMye, intl)
        });
    }

    if (mor.dagerForLite > 0 || farMedmor.dagerForLite > 0) {
        const erMor = mor.dagerForLite > 0;
        const { dagerForLite } = erMor ? mor : farMedmor;
        return advarsel('dagerIkkeBruktPerson', {
            navn: erMor ? omForeldre.mor.navn : omForeldre.farMedmor.navn,
            dager: getVarighetString(dagerForLite, intl)
        });
    }

    return advarsel('Dine dager');
}
