import {
    RegelTestresultat,
    RegelTest,
    RegelTestresultatInfoObject,
    RegelTestresultatInfo
} from '../../../../shared/regler/types';

import { isUlønnetPermisjon, Forelder } from '../../../types';
import { Periodene } from '../../Periodene';
import { Regelgrunnlag } from '../types';

export const harUlønnetPermisjonUtsettelsesårsak: RegelTest = (grunnlag: Regelgrunnlag): RegelTestresultat => {
    // Regel gjelder ikke ulønnede permisjoner på slutten av uttaksplanen
    const cnt = Periodene(grunnlag.perioder).getAvsluttendeUlønnedePermisjoner().length;

    const perioder = cnt > 0 ? grunnlag.perioder.slice(0, grunnlag.perioder.length - cnt - 1) : grunnlag.perioder;
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
