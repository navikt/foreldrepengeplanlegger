import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import RadioGroup from 'common/components/skjema/radioGroup/RadioGroup';
import { Forelder } from '../../../types';

interface OwnProps {
    forelder?: Forelder;
    onChange: (forelder: Forelder) => void;
}

type Props = OwnProps & InjectedIntlProps;

const VelgErMorEllerFar: React.StatelessComponent<Props> = ({ forelder, onChange, intl }) => (
    <RadioGroup
        legend="Er du mor eller far?"
        name="aleneforelderErMor"
        onChange={(value) => onChange(value as Forelder)}
        checked={forelder}
        options={[
            {
                id: 'js-erMor',
                label: 'Mor',
                value: Forelder.mor
            },
            {
                id: 'js-erFar',
                label: 'Far',
                value: Forelder.farMedmor
            }
        ]}
    />
);

export default injectIntl(VelgErMorEllerFar);
