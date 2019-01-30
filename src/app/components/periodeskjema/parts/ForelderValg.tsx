import * as React from 'react';
import RadioGroup, { RadioOption } from 'common/components/skjema/radioGroup/RadioGroup';
import { Periodetype, Forelder, OmForeldre } from '../../../types';

interface Props {
    forelder: Forelder | undefined;
    omForeldre: OmForeldre;
    onChange: (periodetype: Periodetype | undefined) => void;
}

const getForelderOptions = (omForeldre: OmForeldre): RadioOption[] => [
    { value: Forelder.forelder1, label: omForeldre.forelder1.navn },
    { value: Forelder.forelder2, label: omForeldre.forelder2!.navn }
];

const ForelderValg: React.StatelessComponent<Props> = ({ forelder, omForeldre, onChange }) => (
    <RadioGroup
        name="forelder"
        options={getForelderOptions(omForeldre)}
        legend="Hvem gjelder perioden?"
        checked={forelder}
        onChange={onChange}
    />
);

export default ForelderValg;
