import * as React from 'react';
import RadioGroup, { RadioOption } from 'common/components/skjema/radioGroup/RadioGroup';
import { Periodetype, Forelder, Forelderinfo } from '../../../types';

interface Props {
    forelder: Forelder | undefined;
    mor: Forelderinfo;
    farMedmor: Forelderinfo;
    onChange: (periodetype: Periodetype | undefined) => void;
}

const getForelderOptions = (mor: Forelderinfo, farMedmor: Forelderinfo): RadioOption[] => [
    { value: Forelder.farMedmor, label: farMedmor.navn },
    { value: Forelder.mor, label: mor.navn }
];

const ForelderValg: React.StatelessComponent<Props> = ({ forelder, mor, farMedmor, onChange }) => (
    <RadioGroup
        name="forelder"
        options={getForelderOptions(mor, farMedmor)}
        legend="Hvem gjelder perioden?"
        checked={forelder}
        onChange={onChange}
    />
);

export default ForelderValg;
