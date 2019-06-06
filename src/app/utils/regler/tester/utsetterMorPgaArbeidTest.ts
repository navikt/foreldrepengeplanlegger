import { RegelTestresultat, RegelTest } from '../../../../shared/types';
import { Forelder, Periodetype } from '../../../types';
import { Perioden } from '../../Perioden';
import { Regelgrunnlag } from '../types';

export const utsetterMorPgaArbeidTest: RegelTest = (grunnlag: Regelgrunnlag): RegelTestresultat => {
    const { perioder } = grunnlag;
    const morsPerioderMedArbeid = perioder.filter(
        (p) =>
            (p.forelder === Forelder.mor && (p.type === Periodetype.Arbeid || p.type === Periodetype.GradertUttak)) ||
            Perioden(p).erUlønnetPermisjonMedArbeidForForelder(Forelder.mor)
    );
    if (morsPerioderMedArbeid.length > 0) {
        const { navnMor } = grunnlag;
        return {
            passerer: false,
            info: {
                values: {
                    navnMor
                }
            }
        };
    }
    return {
        passerer: true
    };
};
