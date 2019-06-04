import {
    RegelTestresultat,
    Regelgrunnlag,
    RegelTest,
    RegelTestresultatInfoObject,
    RegelTestresultatInfo
} from '../../../../shared/regler/types';
import { isUtsettelse, Periodetype } from '../../../types';

export const avslutterPlanenMedUtsettelseTest: RegelTest = (grunnlag: Regelgrunnlag): RegelTestresultat => {
    const perioder = [...grunnlag.perioder].reverse();
    const idx = perioder.findIndex(
        (periode) => !isUtsettelse(periode) || periode.type === Periodetype.UlønnetPermisjon
    );
    const passerer = idx === 0;
    const info: RegelTestresultatInfoObject | undefined = passerer
        ? undefined
        : perioder.slice(0, idx).map((p): Partial<RegelTestresultatInfo> => ({ periodeId: p.id }));
    return {
        passerer,
        info
    };
};
