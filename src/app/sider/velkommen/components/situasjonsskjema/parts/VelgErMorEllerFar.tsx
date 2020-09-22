import * as React from 'react';
import { useIntl } from 'react-intl';
import RadioGroup from 'common/components/skjema/radioGroup/RadioGroup';
import getMessage from 'common/util/i18nUtils';
import { Forelder } from 'common/types';

interface Props {
    forelder?: Forelder;
    onChange: (forelder: Forelder) => void;
}

const VelgErMorEllerFar: React.FunctionComponent<Props> = ({ forelder, onChange }) => {
    const intl = useIntl();

    return (
        <RadioGroup
            legend={getMessage(intl, 'situasjonskjema.morEllerFar.label')}
            name="aleneforelderErMor"
            onChange={(value) => onChange(value as Forelder)}
            checked={forelder}
            options={[
                {
                    id: 'js-erMor',
                    label: getMessage(intl, 'situasjonskjema.morEllerFar.mor.label'),
                    value: Forelder.mor,
                },
                {
                    id: 'js-erFar',
                    label: getMessage(intl, 'situasjonskjema.morEllerFar.far.label'),
                    value: Forelder.farMedmor,
                },
            ]}
        />
    );
};

export default VelgErMorEllerFar;
