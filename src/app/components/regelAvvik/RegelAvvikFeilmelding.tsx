import * as React from 'react';
import { RegelAvvikInfo } from '../../utils/regler/types';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import { getRegelIntlValues } from '../../utils/regler/regelUtils';
import { isArray } from 'util';

interface Props {
    info: RegelAvvikInfo;
}

const RegelAvvikFeilmelding: React.StatelessComponent<Props & InjectedIntlProps> = ({ intl, info }) => {
    return isArray(info) ? (
        <>
            {info.map((i, idx) => (
                <FormattedMessage key={idx} id={i.intlKey || 'missingKey'} values={getRegelIntlValues(intl, i)} />
            ))}
        </>
    ) : (
        <FormattedMessage id={info.intlKey || 'missingKey'} values={getRegelIntlValues(intl, info)} />
    );
};

export default injectIntl(RegelAvvikFeilmelding);
