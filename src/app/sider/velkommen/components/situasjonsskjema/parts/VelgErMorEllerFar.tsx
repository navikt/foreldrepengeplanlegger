import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import RadioGroup from 'common/components/skjema/radioGroup/RadioGroup';
import getMessage from 'common/util/i18nUtils';
import { Forelder } from 'common/types';

interface OwnProps {
    forelder?: Forelder;
    onChange: (forelder: Forelder) => void;
}

type Props = OwnProps & InjectedIntlProps;

const VelgErMorEllerFar: React.StatelessComponent<Props> = ({ forelder, onChange, intl }) => (
    <RadioGroup
        legend={getMessage(intl, 'situasjonskjema.morEllerFar.label')}
        name="aleneforelderErMor"
        onChange={(value) => onChange(value as Forelder)}
        checked={forelder}
        options={[
            {
                id: 'js-erMor',
                label: getMessage(intl, 'situasjonskjema.morEllerFar.mor.label'),
                value: Forelder.mor
            },
            {
                id: 'js-erFar',
                label: getMessage(intl, 'situasjonskjema.morEllerFar.far.label'),
                value: Forelder.farMedmor
            }
        ]}
    />
);

export default injectIntl(VelgErMorEllerFar);
