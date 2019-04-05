import {
    RegelTestresultat,
    Regelgrunnlag,
    RegelTest,
    RegelTestresultatInfoObject,
    RegelTestresultatInfo
} from '../types';

import { isUlønnetPermisjon, Forelder, Periodetype } from '../../../types';

export const harUlønnetPermisjonUtsettelsesårsak: RegelTest = (grunnlag: Regelgrunnlag): RegelTestresultat => {
    // Regel gjelder ikke ulønnede permisjoner på slutten av uttaksplanen
    const idx = grunnlag.perioder
        .slice()
        .reverse()
        .findIndex((p) => p.type !== Periodetype.UlønnetPermisjon);

    const perioder = idx > -1 ? grunnlag.perioder.slice(0, grunnlag.perioder.length - idx) : grunnlag.perioder;
    const perioderUtenÅrsak = perioder.filter((p) => isUlønnetPermisjon(p) && p.utsettelsesårsak === undefined);
    const antallPerioderUtenÅrsak = perioderUtenÅrsak.length;

    const passerer = antallPerioderUtenÅrsak === 0;

    const info: RegelTestresultatInfoObject = perioderUtenÅrsak.map(
        (p): Partial<RegelTestresultatInfo> => ({
            periodeId: p.id,
            values: {
                forelderNavn: p.forelder === Forelder.mor ? grunnlag.navnMor : grunnlag.navnFarMedmor,
                utsetterNavn: p.forelder === Forelder.mor ? grunnlag.navnFarMedmor : grunnlag.navnMor
            }
        })
    );
    return {
        passerer,
        info
    };
};
