import { RegelTestresultat, RegelTestresultatInfoObject } from '../../../../shared/types/regelTypes';
import { Regelgrunnlag } from '../types';

const maksFeriedagerMedOverføring = 52;

export const harForeldreForMangeFeriedagerTest = (grunnlag: Regelgrunnlag): RegelTestresultat => {
    const { forbruk } = grunnlag;

    if (!forbruk) {
        return {
            passerer: true
        };
    }

    const antallFeriedagerMor = forbruk.mor.dagerMedFerie;
    const antallFeriedagerFarMedmor = forbruk.farMedmor ? forbruk.farMedmor.dagerMedFerie : 0;

    const info: RegelTestresultatInfoObject = [];
    if (antallFeriedagerMor > maksFeriedagerMedOverføring) {
        info.push({
            values: {
                navn: grunnlag.navnMor,
                antallFeriedagerMor
            }
        });
    }
    if (antallFeriedagerFarMedmor > maksFeriedagerMedOverføring) {
        info.push({
            values: {
                navn: grunnlag.navnFarMedmor,
                antallFeriedagerFarMedmor
            }
        });
    }

    const passerer = info.length === 0;
    return {
        passerer,
        info: passerer ? undefined : info
    };
};
