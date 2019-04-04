import {
    RegelTestresultat,
    Regelgrunnlag,
    RegelTest,
    RegelTestresultatInfoObject,
    RegelTestresultatInfo
} from '../types';
import { isUlønnetPermisjon } from '../../../types';

export const harUlønnetPermisjonUtsettelsesårsak: RegelTest = (grunnlag: Regelgrunnlag): RegelTestresultat => {
    const perioderUtenÅrsak = grunnlag.perioder.filter(
        (p) => isUlønnetPermisjon(p) && p.utsettelsesårsak === undefined
    );
    const antallPerioderUtenÅrsak = perioderUtenÅrsak.length;
    let passerer = antallPerioderUtenÅrsak === 0;
    if (antallPerioderUtenÅrsak === 1) {
        const sistePeriode = perioderUtenÅrsak[antallPerioderUtenÅrsak - 1];
        if (sistePeriode.id === grunnlag.perioder[grunnlag.perioder.length - 1].id) {
            passerer = true;
        }
    }

    const info: RegelTestresultatInfoObject = perioderUtenÅrsak.map(
        (p): Partial<RegelTestresultatInfo> => ({ periodeId: p.id })
    );
    return {
        passerer,
        info
    };
};
