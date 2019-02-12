import starterInnenfor12UkerFørTermin from './tester/starterInnenfor12UkerFørTermin';
import { Regel } from './types';
import { RegelKey } from './regelKeys';

const uttaksplanRegler: Regel[] = [
    {
        key: RegelKey.starterInnenfor12UkerFørTermin,
        test: starterInnenfor12UkerFørTermin
    }
];

export default uttaksplanRegler;
