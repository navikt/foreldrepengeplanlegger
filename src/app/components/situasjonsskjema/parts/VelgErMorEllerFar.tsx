import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import RadioGroup from 'common/components/skjema/radioGroup/RadioGroup';

interface OwnProps {
    erMor?: boolean;
    onChange: (erMor: boolean) => void;
}

type Props = OwnProps & InjectedIntlProps;

const VelgErMorEllerFar: React.StatelessComponent<Props> = ({ erMor, onChange, intl }) => (
    <RadioGroup
        legend="Er du mor eller far/medmor?"
        name="aleneforelderErMor"
        onChange={(value) => onChange(value === 'true')}
        checked={erMor !== undefined ? (erMor ? 'true' : 'false') : undefined}
        options={[
            {
                id: 'js-erMor',
                label: 'Mor',
                value: 'true'
            },
            {
                id: 'js-erFarMedmor',
                label: 'Far/medmor',
                value: 'false'
            }
        ]}
    />
);

export default injectIntl(VelgErMorEllerFar);
