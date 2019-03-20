import { RegelTestresultat, Regelgrunnlag, RegelTest } from '../types';
import { Forelder, Periodetype } from '../../../types';

export const harMorUtsettelsePgaArbeidTest: RegelTest = (grunnlag: Regelgrunnlag): RegelTestresultat => {
    const { perioder } = grunnlag;
    const morsPerioderMedArbeid = perioder.filter(
        (p) => p.forelder === Forelder.mor && (p.type === Periodetype.Arbeid || p.type === Periodetype.GradertUttak)
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
