import {
    RegelTestresultat,
    RegelTest,
    RegelTestresultatInfoObject,
    RegelTestresultatInfo
} from '../../../../shared/types/regelTypes';
import { isUlønnetPermisjon } from '../../../types';
import { Regelgrunnlag } from '../types';

export const erUlønnetPermisjonTest: RegelTest = (grunnlag: Regelgrunnlag): RegelTestresultat => {
    const perioder = grunnlag.perioder.filter((p) => isUlønnetPermisjon(p));
    const passerer = perioder.length === 0;
    const info: RegelTestresultatInfoObject = perioder.map(
        (p): Partial<RegelTestresultatInfo> => ({ periodeId: p.id })
    );
    return {
        passerer,
        info
    };
};
