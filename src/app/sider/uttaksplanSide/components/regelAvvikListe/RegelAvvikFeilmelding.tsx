import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { getRegelIntlValues } from '../../../../../shared/regler/regelUtils';
import { HTMLValues } from '../../../../../shared/regler/regelTypes';
import { RegelTestresultatInfo } from 'shared/types';

interface Props {
    info: RegelTestresultatInfo;
}

const generateReactIntlHTMLValues = (values: HTMLValues) => {
    const { lenke } = values;
    let htmlValues = {};

    if (lenke) {
        const a = (msg: any) => (
            <a href={lenke.href} className="lenke" rel="noreferrer" target="_blank">
                {msg}
            </a>
        );

        htmlValues = { ...htmlValues, a };
    }

    return htmlValues;
};

const RegelAvvikFeilmelding: React.FunctionComponent<Props> = ({ info }) => {
    const intl = useIntl();
    const htmlValues = info.htmlValues ? generateReactIntlHTMLValues(info.htmlValues) : {};

    return info.renderAsHtml ? (
        <FormattedMessage
            id={info.intlKey || 'missingKey'}
            values={{ ...getRegelIntlValues(intl, info), ...htmlValues }}
        />
    ) : (
        <FormattedMessage id={info.intlKey || 'missingKey'} values={getRegelIntlValues(intl, info)} />
    );
};

export default RegelAvvikFeilmelding;
