import { Fordeling, TilgjengeligeDager, OmForeldre } from '../types';

export type FordelingStatusVerdi = 'ok' | 'advarsel' | 'feil';

interface FordelingStatus {
    status: FordelingStatusVerdi;
    tittel: string;
}

const getFordelingAleneomsorg = (): FordelingStatus => {
    return {
        status: 'ok',
        tittel: 'Yau'
    };
};

const feil = (tittel: string): FordelingStatus => {
    return {
        status: 'feil',
        tittel
    };
};

const advarsel = (tittel: string): FordelingStatus => {
    return {
        status: 'advarsel',
        tittel
    };
};

const ok = (tittel: string): FordelingStatus => {
    return {
        status: 'ok',
        tittel
    };
};

export function getFordelingStatus(
    fordeling: Fordeling,
    tilgjengeligeDager: TilgjengeligeDager,
    omForeldre: OmForeldre
): FordelingStatus {
    if (fordeling.farMedmor === undefined) {
        return getFordelingAleneomsorg();
    }

    const { dagerForbeholdtFar, dagerForbeholdtMor, dagerFelles } = tilgjengeligeDager;
    const { mor, farMedmor, dagerGjenstående } = fordeling;

    const morErOk = mor.uttaksdager <= dagerForbeholdtMor + dagerFelles;
    const farErOk = farMedmor.uttaksdager <= dagerForbeholdtFar + dagerFelles;
    const totalOk = dagerGjenstående === 0;
    const forMangeDagerTotalt = dagerGjenstående < 0;
    const forFåDagerTotalt = dagerGjenstående > 0;
    const morHarForMye = mor.uttaksdager > dagerForbeholdtMor + dagerFelles;
    const farHarForMye = farMedmor.uttaksdager > dagerForbeholdtFar + dagerFelles;
    const morHarForLite = mor.uttaksdager < dagerForbeholdtMor;
    const farHarForLite = farMedmor.uttaksdager < dagerForbeholdtFar;

    if (morErOk && farErOk) {
        if (totalOk) {
            return ok('Planen deres er ferdig');
        }
        if (forMangeDagerTotalt) {
            return feil('For mange dager til sammen');
        }
        if (forFåDagerTotalt) {
            if (morHarForLite && farHarForLite) {
                return advarsel('Ikke alle dager er brukt');
            }
            if (morHarForLite) {
                return advarsel(`${omForeldre.mor.navn} har ikke brukt alle dagene`);
            }
            if (farHarForLite) {
                return advarsel(`${omForeldre.farMedmor!.navn} har ikke brukt alle dagene`);
            }
        }
    }
    if (farErOk) {
        if (morHarForMye) {
            return advarsel(`${omForeldre.mor.navn} har brukt for mange dager`);
        }
        if (morHarForLite) {
            return advarsel(`${omForeldre.mor.navn} har ikke brukt alle dagene`);
        }
    }
    if (morErOk) {
        if (farHarForMye) {
            return advarsel(`${omForeldre.farMedmor!.navn} har brukt for mange dager`);
        }
        if (farHarForLite) {
            return advarsel(`${omForeldre.farMedmor!.navn} har ikke brukt alle dagene`);
        }
    }

    return advarsel('Hva vet jeg');
}
