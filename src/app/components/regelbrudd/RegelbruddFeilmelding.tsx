import * as React from 'react';
import { RegelbruddIntlFeilmelding } from '../../utils/regler/types';
import { FormattedMessage, injectIntl, InjectedIntlProps, InjectedIntl } from 'react-intl';

interface Props {
    feilmelding: RegelbruddIntlFeilmelding;
}

export const getRegelbruddFeilmeldingValue = (
    intl: InjectedIntl,
    feilmelding: RegelbruddIntlFeilmelding
): { [key: string]: string } | undefined => {
    const { values } = feilmelding;
    if (values === undefined) {
        return undefined;
    }
    const newValues: { [key: string]: string } = {};

    Object.keys(values).forEach((key) => {
        const value = values[key];
        if (value) {
            newValues[key] = typeof value === 'function' ? value(intl) : `${value}`;
        }
    });

    return newValues;
};

const RegelbruddFeilmelding: React.StatelessComponent<Props & InjectedIntlProps> = ({ intl, feilmelding }) => (
    <div>
        <FormattedMessage id={feilmelding.intlKey} values={getRegelbruddFeilmeldingValue(intl, feilmelding)} />
    </div>
);

export default injectIntl(RegelbruddFeilmelding);
