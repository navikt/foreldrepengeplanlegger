import { Periodetype, Utsettelsesårsak } from '../../../../types';
import { Forelder } from 'common/types';

export interface PeriodeskjemaFormValues {
    periodetype: Periodetype;
    fom: Date;
    tom: Date;
    forelder: Forelder;
    medforelder?: Forelder;
    gradering?: number;
    utsettelsesårsak?: Utsettelsesårsak;
}
