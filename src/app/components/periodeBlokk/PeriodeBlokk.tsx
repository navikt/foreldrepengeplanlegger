import * as React from 'react';
import classNames from 'classnames';
import { UttaksplanColor } from '../../types';
import BEMHelper from 'common/utils/bem';

import './periodeBlokk.less';

interface Props {
    farge?: UttaksplanColor;
    nyPeriode?: boolean;
    children: React.ReactNode;
}

const bem = BEMHelper('periodeBlokk');

const PeriodeFargestrek: React.StatelessComponent<{ farge: UttaksplanColor; gradert?: boolean }> = ({
    farge,
    gradert
}) => {
    const bemStrek = bem.child('fargestrek');
    return (
        <div
            className={classNames(
                bemStrek.block,
                bemStrek.modifier(farge),
                gradert ? `${bemStrek.modifier(farge)}--gradert` : undefined
            )}
        />
    );
};

const PeriodeBlokk: React.StatelessComponent<Props> = ({ farge, nyPeriode, children }) => (
    <div className={classNames(bem.block, nyPeriode ? bem.modifier('nyPeriode') : undefined)}>
        <PeriodeFargestrek farge={farge || 'yellow'} />
        <div className={bem.element('content')}>{children}</div>
    </div>
);

export default PeriodeBlokk;
