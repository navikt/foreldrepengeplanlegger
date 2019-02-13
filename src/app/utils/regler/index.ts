import starterInnenfor12UkerFørTermin from './tester/starterInnenfor12UkerFørTermin';
import { Regel } from './types';
import { RegelKey } from './regelKeys';
import erInnenforFørsteOgSisteMuligeUttaksdag from './tester/erInnenforF\u00F8rsteOgSisteMuligeUttaksdag';

const uttaksplanRegler: Regel[] = [
    {
        key: RegelKey.starterInnenfor12UkerFørTermin,
        test: starterInnenfor12UkerFørTermin
    },
    {
        key: RegelKey.erInnenforFørsteOgSisteMuligeUttaksdag,
        test: erInnenforFørsteOgSisteMuligeUttaksdag
    }
];

export default uttaksplanRegler;
