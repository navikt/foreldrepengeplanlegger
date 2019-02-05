import { Periodetype, Forelder } from '../../types';

export interface PeriodeskjemaFormValues {
    periodetype: Periodetype;
    fom: Date;
    tom: Date;
    forelder: Forelder;
    gradering?: number;
}
