import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Periodetype, Forelder } from '../../types';
import { getPeriodetypeFarge } from '../../utils/styleutils';
import ArbeidIkon from './ikoner/ArbeidIkon';
import FerieIkon from './ikoner/FerieIkon';
import UttakIkon from './ikoner/UttakIkon';
import GradertUttakIkon from './ikoner/GradertUttakIkon';
import BEMHelper from 'common/utils/bem';
import UlønnetPermisjonIkon from './ikoner/Ul\u00F8nnetPermisjonIkon';

import './periodeikon.less';

export interface Props {
    periodetype?: Periodetype;
    forelder?: Forelder;
}

const bem = BEMHelper('periodeikon');

const getPeriodetypeIkon = (periodetype?: Periodetype, title = '', forelder?: Forelder) => {
    switch (periodetype) {
        case 'arbeid':
            return <ArbeidIkon title={title} />;
        case 'ferie':
            return <FerieIkon title={title} />;
        case 'gradertUttak':
            return <GradertUttakIkon title={title} />;
        case 'ulønnetPermisjon':
            return <UlønnetPermisjonIkon title={title} />;
        default:
            return <UttakIkon title={title} />;
    }
};

const Periodeikon: React.StatelessComponent<Props & InjectedIntlProps> = ({ periodetype, forelder }) => {
    const farge = getPeriodetypeFarge(periodetype, forelder);
    return (
        <div className={bem.classNames(bem.block, bem.modifier(`${farge}`))}>
            {getPeriodetypeIkon(periodetype, '', forelder)}
        </div>
    );
};

export default injectIntl(Periodeikon);
