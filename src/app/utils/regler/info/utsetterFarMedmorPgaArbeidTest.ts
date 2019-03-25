import { RegelTestresultat, Regelgrunnlag, RegelTest } from '../types';
import { Forelder, Periodetype } from '../../../types';

export const utsetterFarMedmorPgaArbeidTest: RegelTest = (grunnlag: Regelgrunnlag): RegelTestresultat => {
    const { perioder } = grunnlag;
    const perioderMedArbeid = perioder.filter(
        (p) =>
            p.forelder === Forelder.farMedmor && (p.type === Periodetype.Arbeid || p.type === Periodetype.GradertUttak)
    );
    const passerer = perioderMedArbeid.length === 0;
    return {
        passerer,
        info: passerer
            ? undefined
            : {
                  values: {
                      navnFarMedmor: grunnlag.navnFarMedmor
                  }
              }
    };
};
