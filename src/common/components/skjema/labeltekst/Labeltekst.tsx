import { MessageValue } from 'common/util/i18nUtils';
import * as React from 'react';
import { useIntl } from 'react-intl';

import './labeltekst.less';

interface OwnProps {
    children?: React.ReactNode;
    intlId?: string;
    intlValue?: { [key: string]: MessageValue };
}

export type Props = OwnProps;

const Labeltekst: React.FunctionComponent<Props> = ({ children, intlId, intlValue }) => {
    const intl = useIntl();

    return <span className="labeltext">{intlId ? intl.formatMessage({ id: intlId }, intlValue) : children}</span>;
};

export default Labeltekst;
