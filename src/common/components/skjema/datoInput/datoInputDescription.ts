import { Avgrensninger } from 'nav-datovelger/src/datovelger/types';
import { InjectedIntl } from 'react-intl';
import { formaterDatoTall } from 'common/utils/datoUtils';
import getMessage from 'common/utils/i18nUtils';

export const getAvgrensningerDescriptionForInput = (
    intl: InjectedIntl,
    avgrensninger: Avgrensninger | undefined
): string | undefined => {
    if (avgrensninger) {
        let str;
        if (avgrensninger.minDato || avgrensninger.maksDato) {
            const fraTekst = avgrensninger.minDato
                ? getMessage(intl, 'datoinput.avgrensninger.beskrivelse.fraOgMed', {
                      dato: formaterDatoTall(avgrensninger.minDato)
                  })
                : undefined;
            const tilTekst = avgrensninger.maksDato
                ? getMessage(intl, 'datoinput.avgrensninger.beskrivelse.tilOgMed', {
                      dato: formaterDatoTall(avgrensninger.maksDato)
                  })
                : undefined;
            str = getMessage(intl, 'datoinput.avgrensninger.beskrivelse.fraTil', { fra: fraTekst, til: tilTekst });
        }
        if (avgrensninger.helgedagerIkkeTillatt) {
            str = `${str} ${getMessage(intl, 'datoinput.avgrensninger.beskrivelse.ikkeHelg')}`;
        }
        if (str) {
            return str;
        }
    }
    return undefined;
};
