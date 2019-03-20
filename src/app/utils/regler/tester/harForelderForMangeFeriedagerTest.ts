import { RegelTestresultat, Regelgrunnlag, RegelAvvikIntlInfo } from '../types';
import { Forelder, Periodetype, Periode } from '../../../types';

const maksFeriedagerMedOverføring = 52;

const getAntallFeriedagerForForelder = (perioder: Periode[], forelder: Forelder): number => {
    return perioder
        .filter((p) => p.type === Periodetype.Ferie && p.forelder === forelder)
        .map((p) => (p.uttaksinfo !== undefined ? p.uttaksinfo.antallUttaksdager - p.uttaksinfo.antallFridager : 0))
        .reduce((d, nyeDager) => nyeDager + d, 0);
};

export const harForelderForMangeFeriedager = (grunnlag: Regelgrunnlag): RegelTestresultat => {
    const { perioder } = grunnlag;

    const antallFeriedagerMor = getAntallFeriedagerForForelder(perioder, Forelder.mor);
    const antallFeriedagerFarMedmor = getAntallFeriedagerForForelder(perioder, Forelder.farMedmor);
    const info: RegelAvvikIntlInfo[] = [];

    if (antallFeriedagerMor > maksFeriedagerMedOverføring) {
        info.push({
            values: {
                navn: grunnlag.navnMor,
                antallFeriedager: antallFeriedagerMor
            }
        });
    }
    if (antallFeriedagerFarMedmor > maksFeriedagerMedOverføring) {
        info.push({
            values: {
                navn: grunnlag.navnFarMedmor,
                antallFeriedager: antallFeriedagerFarMedmor
            }
        });
    }
    return {
        passerer: info.length === 0,
        info: info.length > 0 ? info : undefined
    };
};
