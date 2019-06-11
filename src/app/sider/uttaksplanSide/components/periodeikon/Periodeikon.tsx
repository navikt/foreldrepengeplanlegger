import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Periodetype } from '../../../../types';
import { getPeriodetypeFarge } from '../../../../utils/styleutils';
import ArbeidIkon from './ikoner/ArbeidIkon';
import FerieIkon from './ikoner/FerieIkon';
import UttakIkon from './ikoner/UttakIkon';
import GradertUttakIkon from './ikoner/GradertUttakIkon';
import BEMHelper from 'common/util/bem';
import UlønnetPermisjonIkon from './ikoner/UlønnetPermisjonIkon';
import { getUttaksplanHexFromFarge } from 'common/util/colors';

import './periodeikon.less';
import { UttaksplanFarge, Forelder } from 'common/types';

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

const PeriodeIkonBkg: React.StatelessComponent<{ farge: UttaksplanFarge; gradertFarge?: UttaksplanFarge }> = ({
    farge,
    gradertFarge
}) => {
    const fill = getUttaksplanHexFromFarge(farge);
    const gradertFill = gradertFarge ? getUttaksplanHexFromFarge(gradertFarge) : undefined;
    return (
        <svg role="presentation" focusable="false" width={32} height={32}>
            <g fill="none" fillRule="evenodd">
                <rect fill={fill} width={32} height={32} rx={8} />
                {gradertFill && (
                    <path
                        d="M29.284 2a7.982 7.982 0 0 1 2.768 6.052v16a8 8 0 0 1-8 8h-16A7.982 7.982 0 0 1 2 29.284L29.284 2z"
                        fill={gradertFill}
                    />
                )}
                {/*
                    BottomGradering
                <path
                    d="M2.768 30.052A7.982 7.982 0 0 1 0 24V8a8 8 0 0 1 8-8h16a7.982 7.982 0 0 1 6.052 2.768L2.768 30.052z"
                    fill="#E7BBBB"
                /> */}
            </g>
        </svg>
    );
};

const Periodeikon: React.StatelessComponent<Props & InjectedIntlProps> = ({ periodetype, forelder }) => {
    const farge = getPeriodetypeFarge(periodetype, forelder);
    return (
        <span className={bem.classNames(bem.block)}>
            <span className={bem.element('bkg')}>
                <PeriodeIkonBkg farge={farge} />
            </span>
            <span className={bem.element('ikon')}>{getPeriodetypeIkon(periodetype, '', forelder)}</span>
        </span>
    );
};

export default injectIntl(Periodeikon);
