import { Forelder } from 'common/types';
import {
    RegelTestresultat,
    RegelTest,
    RegelTestresultatInfoObject,
    RegelTestresultatInfo,
} from '../../../../shared/types';
import { isUtsettelse } from '../../../types';
import { Regelgrunnlag } from '../types';

export const morHarUtsettelseEtterEndtUttak: RegelTest = (grunnlag: Regelgrunnlag): RegelTestresultat => {
    const perioder = [...grunnlag.perioder].reverse().filter((p) => p.forelder === Forelder.mor);
    const idx = perioder.findIndex((periode) => !isUtsettelse(periode));
    const passerer = idx === 0;
    const info: RegelTestresultatInfoObject | undefined = passerer
        ? undefined
        : perioder.slice(0, idx).map(
              (p): Partial<RegelTestresultatInfo> => ({
                  periodeId: p.id,
                  values: { navnMor: grunnlag.navnMor },
              })
          );
    return {
        passerer,
        info,
    };
};
