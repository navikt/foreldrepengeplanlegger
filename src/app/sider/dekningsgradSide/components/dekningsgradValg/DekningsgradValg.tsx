import * as React from 'react';
import RadioGroup from 'common/components/skjema/radioGroup/RadioGroup';
import { Dekningsgrad } from 'common/types';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { getVarighetString } from 'common/util/intlUtils';
import getMessage from 'common/util/i18nUtils';

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
                label: getMessage(intl, 'dekningsgradvalg.100prosent', { uker: getVarighetString(dager100, intl) }),
                value: '100'
            },
            {
                label: getMessage(intl, 'dekningsgradvalg.80prosent', { uker: getVarighetString(dager80, intl) }),
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
