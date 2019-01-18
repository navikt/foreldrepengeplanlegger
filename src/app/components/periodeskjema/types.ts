import { Periodetype, Forelder } from '../../types';

export interface PeriodeskjemaFormValues {
    type: Periodetype;
    fom: Date;
    tom: Date;
    forelder: Forelder;
    gradering?: number;
}
