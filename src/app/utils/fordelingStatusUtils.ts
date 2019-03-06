import { TilgjengeligeDager, OmForeldre, Forbruk } from '../types';
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

export function getFordelingStatus(
    forbruk: Forbruk,
    tilgjengeligeDager: TilgjengeligeDager,
    omForeldre: OmForeldre,
    intl: InjectedIntl
): FordelingStatus {
    const { dagerGjenstående, mor, farMedmor } = forbruk;
    if (farMedmor === undefined || omForeldre.farMedmor === undefined) {
        return {
            status: 'advarsel',
            tittel: {
                key: 'Todo: Aleneomsorg'
            }
        };
    }

    const td = tilgjengeligeDager;

    const morErOk = mor.dagerTotalt <= td.dagerMor + td.dagerFelles;
    const farErOk = farMedmor.dagerTotalt <= td.dagerFar + td.dagerFelles;
    const totalOk = dagerGjenstående === 0;
    const forMangeDagerTotalt = dagerGjenstående < 0;
    const forFåDagerTotalt = dagerGjenstående > 0;
    const dagerForMyeMor = mor.dagerTotalt - (td.dagerMor + td.dagerFelles);
    const dagerForMyeFar = farMedmor.dagerTotalt - (td.dagerFar + td.dagerFelles);
    const dagerForLiteMor = td.dagerMor - mor.dagerTotalt;
    const dagerForLiteFar = td.dagerFar - farMedmor.dagerTotalt;

    if (morErOk && farErOk) {
        if (totalOk) {
            return ok('altOk');
        }
        if (forMangeDagerTotalt) {
            return feil('forMangeDagerTotalt', { dager: getVarighetString(Math.abs(dagerGjenstående), intl) });
        }
        if (forFåDagerTotalt) {
            if (dagerForLiteMor > 0 && dagerForLiteFar > 0) {
                return advarsel('dagerIkkeBrukt', { dager: getVarighetString(dagerGjenstående, intl) });
            }
            if (dagerForLiteMor > 0) {
                return advarsel('dagerIkkeBruktPerson', {
                    navn: omForeldre.mor.navn,
                    dager: getVarighetString(dagerForLiteMor, intl)
                });
            }
            if (dagerForLiteFar > 0) {
                return advarsel('dagerIkkeBruktPerson', {
                    navn: omForeldre.farMedmor.navn,
                    dager: getVarighetString(dagerForLiteFar, intl)
                });
            }
            return advarsel('dagerIkkeBrukt', { dager: getVarighetString(dagerGjenstående, intl) });
        }
    }
    if (farErOk) {
        if (dagerForMyeMor > 0) {
            return advarsel('dagerForMyePerson', {
                navn: omForeldre.mor.navn,
                dager: getVarighetString(dagerForMyeMor, intl)
            });
        }
        if (dagerForLiteMor > 0) {
            return advarsel('dagerIkkeBruktPerson', {
                navn: omForeldre.mor.navn,
                dager: getVarighetString(dagerForLiteMor, intl)
            });
        }
    }
    if (morErOk) {
        if (dagerForMyeFar > 0) {
            return advarsel('dagerForMyePerson', {
                navn: omForeldre.farMedmor.navn,
                dager: getVarighetString(dagerForMyeFar, intl)
            });
        }
        if (dagerForLiteFar > 0) {
            return advarsel('dagerIkkeBruktPerson', {
                navn: omForeldre.farMedmor.navn,
                dager: getVarighetString(dagerForLiteFar, intl)
            });
        }
    }

    return advarsel('Dine dager');
}
