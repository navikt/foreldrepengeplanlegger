import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import RadioGroup from 'common/components/skjema/radioGroup/RadioGroup';
import getMessage from 'common/util/i18nUtils';

interface OwnProps {
    antallBarn?: number;
    onChange: (antall: number) => void;
}

type Props = OwnProps & InjectedIntlProps;

const VelgAntallBarn: React.StatelessComponent<Props> = ({ antallBarn, onChange, intl }) => (
    <RadioGroup
        name="antallBarn"
        onChange={(value) => (value ? onChange(parseInt(value, 10)) : null)}
        checked={`${antallBarn}`}
        options={[
            {
                id: 'js-ettBarn',
                label: getMessage(intl, 'antallBarn.alternativ.Barn-1'),
                value: '1'
            },
            {
                id: 'js-tvillinger',
                label: getMessage(intl, 'antallBarn.alternativ.Barn-2'),
                value: '2'
            },
            {
                id: 'js-flereBarn',
                label: getMessage(intl, 'antallBarn.alternativ.Barn-3'),
                value: '3'
            }
        ]}
    />
);

export default injectIntl(VelgAntallBarn);
