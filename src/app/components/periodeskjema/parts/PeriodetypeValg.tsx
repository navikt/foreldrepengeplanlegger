import * as React from 'react';
import RadioGroup, { RadioOption } from 'common/components/skjema/radioGroup/RadioGroup';
import { Periodetype } from '../../../types/periodetyper';

interface Props {
    periodetype: Periodetype | undefined;
    onChange: (periodetype: Periodetype | undefined) => void;
}

const periodetypeValg: RadioOption[] = [
    {
        value: Periodetype.Uttak,
        label: 'Uttak'
    },
    {
        value: Periodetype.GradertUttak,
        label: 'Gradert uttak'
    },
    {
        value: Periodetype.Ferie,
        label: 'Ferie'
    },
    {
        value: Periodetype.Arbeid,
        label: 'Arbeid'
    },
    {
        value: Periodetype.UbetaltPermisjon,
        label: 'Ubetalt permisjon'
    }
];
const PeriodetypeValg: React.StatelessComponent<Props> = ({ periodetype, onChange }) => (
    <RadioGroup
        name="periodetype"
        options={periodetypeValg}
        legend="Hvilken type periode"
        checked={periodetype}
        onChange={onChange}
    />
);

export default PeriodetypeValg;
