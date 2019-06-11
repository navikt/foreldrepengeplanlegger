import { RegelTestresultat, RegelTest } from '../../../../shared/types';
import { Periodetype } from '../../../types';
import { Perioden } from '../../Perioden';
import { Regelgrunnlag } from '../types';
import { Forelder } from 'common/types';

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
