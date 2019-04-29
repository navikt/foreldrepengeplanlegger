import { RegelTestresultat, Regelgrunnlag, RegelTest } from '../types';
import { Forelder, Periodetype } from '../../../types';
import { Perioden } from '../../Perioden';

export const utsetterFarMedmorPgaArbeidTest: RegelTest = (grunnlag: Regelgrunnlag): RegelTestresultat => {
    const { perioder } = grunnlag;
    const perioderMedArbeid = perioder.filter(
        (p) =>
            (p.forelder === Forelder.farMedmor &&
                (p.type === Periodetype.Arbeid || p.type === Periodetype.GradertUttak)) ||
            Perioden(p).erUlønnetPermisjonMedArbeidForForelder(Forelder.farMedmor)
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