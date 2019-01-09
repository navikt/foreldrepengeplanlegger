import * as React from 'react';
import RadioGroup, { RadioOption } from 'common/components/skjema/radioGroup/RadioGroup';
import { Periodetype } from '../../../types';

interface Props {
    periodetype: Periodetype | undefined;
    onChange: (periodetype: Periodetype | undefined) => void;
}

const periodetypeValg: RadioOption[] = [
    {
        value: Periodetype.UTTAK,
        label: 'Uttak'
    },
    {
        value: Periodetype.UTSETTELSE,
        label: 'Utsettelse'
    },
    {
        value: Periodetype.UBETALT_PERMISJON,
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
