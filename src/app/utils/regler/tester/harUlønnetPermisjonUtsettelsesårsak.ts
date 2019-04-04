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
    const passerer = perioderUtenÅrsak.length === 0;
    const info: RegelTestresultatInfoObject = perioderUtenÅrsak.map(
        (p): Partial<RegelTestresultatInfo> => ({ periodeId: p.id })
    );
    return {
        passerer,
        info
    };
};
