import React from 'react';
import { injectIntl, InjectedIntl } from 'react-intl';
import TypografiBase from 'nav-frontend-typografi';
import getMessage from 'common/util/i18nUtils';
import BEMHelper from 'common/util/bem';
import './sidebanner.less';

const cls = BEMHelper('sidebanner');

const Sidebanner = ({ text, intl }: { text: string; intl: InjectedIntl }) => {
    return (
        <div className={cls.classNames(cls.block, 'no-print')}>
            <TypografiBase type="sidetittel">{getMessage(intl, text)} </TypografiBase>
        </div>
    );
};

export default injectIntl(Sidebanner);
