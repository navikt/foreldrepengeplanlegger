import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import IconBox from '../icon-box/IconBox';
import { Periodetype, Forelder } from '../../types';
import { getPeriodetypeFarge } from '../../utils/styleutils';
import ArbeidIkon from './ikoner/ArbeidIkon';
import FerieIkon from './ikoner/FerieIkon';
import UttakIkon from './ikoner/UttakIkon';

export interface Props {
    periodetype: Periodetype;
    forelder?: Forelder;
}

const getPeriodetypeIkon = (periodetype: Periodetype, title = '') => {
    switch (periodetype) {
        case 'arbeid':
            return <ArbeidIkon title={title} />;
        case 'ferie':
            return <FerieIkon title={title} />;
        default:
            return <UttakIkon title={title} />;
    }
};

const Periodeikon: React.StatelessComponent<Props & InjectedIntlProps> = ({ periodetype, forelder }) => {
    return <IconBox color={getPeriodetypeFarge(periodetype, forelder)}>{getPeriodetypeIkon(periodetype)}</IconBox>;
};

export default injectIntl(Periodeikon);
