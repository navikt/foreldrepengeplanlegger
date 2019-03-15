import { RegelAlvorlighet, RegelTestresultat, Regelgrunnlag, Regel } from '../types';
import { RegelKey } from '../regelKeys';
import { Forelder, Periodetype } from '../../../types';

const maksFeriedagerMedOverføring = 52;

const forMangeFeriedager = (forelder: Forelder, regel: Regel, grunnlag: Regelgrunnlag): RegelTestresultat => {
    const { perioder } = grunnlag;
    const { key } = regel;

    const antallFeriedager = perioder
        .filter((p) => p.type === Periodetype.Ferie && p.forelder === forelder)
        .map((p) => (p.uttaksinfo !== undefined ? p.uttaksinfo.antallUttaksdager - p.uttaksinfo.antallFridager : 0))
        .reduce((d, nyeDager) => nyeDager + d, 0);

    if (antallFeriedager > maksFeriedagerMedOverføring) {
        const navn = forelder === Forelder.mor ? grunnlag.navnMor : grunnlag.navnFarMedmor;
        return {
            key,
            passerer: false,
            regelbrudd: {
                key,
                alvorlighet: RegelAlvorlighet.ULOVLIG,
                feilmelding: {
                    intlKey: `regel.feiler.${key}`,
                    values: {
                        navn,
                        antallFeriedager
                    }
                }
            }
        };
    }
    return {
        key,
        passerer: true
    };
};

export const forMangeFeriedagerMor: Regel = {
    key: RegelKey.forMangeFeriedager,
    test: (regel: Regel, grunnlag: Regelgrunnlag) => forMangeFeriedager(Forelder.mor, regel, grunnlag)
};

export const forMangeFeriedagerFarMedmor: Regel = {
    key: RegelKey.forMangeFeriedager,
    test: (regel: Regel, grunnlag: Regelgrunnlag) => forMangeFeriedager(Forelder.farMedmor, regel, grunnlag)
};
