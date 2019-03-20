import { RegelTestresultat, Regelgrunnlag } from '../types';
import { Forelder, Periodetype, Periode } from '../../../types';

const maksFeriedagerMedOverføring = 52;

const getAntallFeriedagerForForelder = (perioder: Periode[], forelder: Forelder): number => {
    return perioder
        .filter((p) => p.type === Periodetype.Ferie && p.forelder === forelder)
        .map((p) => (p.uttaksinfo !== undefined ? p.uttaksinfo.antallUttaksdager - p.uttaksinfo.antallFridager : 0))
        .reduce((d, nyeDager) => nyeDager + d, 0);
};

const harForelderForMangeFeriedager = (grunnlag: Regelgrunnlag, forelder: Forelder): RegelTestresultat => {
    const { perioder } = grunnlag;

    const antallFeriedager = getAntallFeriedagerForForelder(perioder, forelder);

    const passerer = antallFeriedager === maksFeriedagerMedOverføring;
    return {
        passerer,
        info: passerer
            ? undefined
            : {
                  values: {
                      navn: forelder === Forelder.mor ? grunnlag.navnMor : grunnlag.navnFarMedmor,
                      antallFeriedager
                  }
              }
    };
};

export const harMorForMangeFeriedager = (grunnlag: Regelgrunnlag): RegelTestresultat =>
    harForelderForMangeFeriedager(grunnlag, Forelder.mor);
export const harFarMedmorForMangeFeriedager = (grunnlag: Regelgrunnlag): RegelTestresultat =>
    harForelderForMangeFeriedager(grunnlag, Forelder.farMedmor);
