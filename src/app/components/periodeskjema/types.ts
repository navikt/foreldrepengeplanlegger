import { Periodetype, Forelder, Utsettelsesårsak } from '../../types';

export interface PeriodeskjemaFormValues {
    periodetype: Periodetype;
    fom: Date;
    tom: Date;
    forelder: Forelder;
    medforelder?: Forelder;
    gradering?: number;
    utsettelsesårsak?: Utsettelsesårsak;
}
