import React from 'react';
import { useIntl } from 'react-intl';
import TypografiBase from 'nav-frontend-typografi';
import getMessage from 'common/util/i18nUtils';
import BEMHelper from 'common/util/bem';
import './sidebanner.less';

const cls = BEMHelper('sidebanner');

interface Props {
    text: string;
}

const Sidebanner: React.FunctionComponent<Props> = ({ text }) => {
    const intl = useIntl();

    return (
        <div className={cls.classNames(cls.block, 'no-print')}>
            <TypografiBase type="sidetittel">{getMessage(intl, text)} </TypografiBase>
        </div>
    );
};

export default Sidebanner;
