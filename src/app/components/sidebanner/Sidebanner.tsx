import React from 'react';
import { injectIntl, InjectedIntl} from 'react-intl';
import TypografiBase from 'nav-frontend-typografi';
import getMessage from 'common/utils/i18nUtils';
import BEMHelper from 'common/utils/bem';
import './sidebanner.less';

const cls = BEMHelper('sidebanner');

const Sidebanner = ({text, intl}: {text: string, intl: InjectedIntl}) => {
    return(
        <header className={cls.block}>
            <TypografiBase type="sidetittel">{getMessage(intl, text)} </TypografiBase>
        </header>
    )
};

export default injectIntl(Sidebanner);