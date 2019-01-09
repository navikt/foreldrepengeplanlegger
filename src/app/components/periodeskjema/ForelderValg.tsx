import * as React from 'react';
import RadioGroup, { RadioOption } from 'common/components/skjema/radioGroup/RadioGroup';
import { Periodetype, Forelder } from '../../types';

interface Props {
    forelder: Forelder | undefined;
    onChange: (periodetype: Periodetype | undefined) => void;
}

const periodetypeValg: RadioOption[] = [
    {
        value: Forelder.forelder1,
        label: 'Mor'
    },
    {
        value: Forelder.forelder2,
        label: 'Far/medmor'
    }
];
const ForelderValg: React.StatelessComponent<Props> = ({ forelder, onChange }) => (
    <RadioGroup
        name="forelder"
        options={periodetypeValg}
        legend="Hvem gjelder perioden?"
        checked={forelder}
        onChange={onChange}
    />
);

export default ForelderValg;
