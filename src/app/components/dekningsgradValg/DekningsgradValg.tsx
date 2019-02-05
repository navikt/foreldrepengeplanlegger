import * as React from 'react';
import RadioGroup from 'common/components/skjema/radioGroup/RadioGroup';
import { Dekningsgrad } from 'common/types';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { getVarighetString } from 'common/utils/intlUtils';

interface Props {
    dekningsgrad?: Dekningsgrad;
    dager100: number;
    dager80: number;
    onChange: (dekningsgrad: Dekningsgrad) => void;
}

const DekningsgradValg: React.StatelessComponent<Props & InjectedIntlProps> = ({
    dekningsgrad,
    dager100,
    dager80,
    onChange,
    intl
}) => (
    <RadioGroup
        name="dekningsgrad"
        options={[
            {
                label: `${getVarighetString(dager100, intl)} med 100 prosent foreldrepenger`,
                value: '100'
            },
            {
                label: `${getVarighetString(dager80, intl)} med 80 prosent foreldrepenger`,
                value: '80'
            }
        ]}
        onChange={onChange}
        checked={dekningsgrad}
        columns={2}
        sameHeight={true}
    />
);

export default injectIntl(DekningsgradValg);
