import * as React from 'react';
import classNames from 'classnames';
import BEMHelper from 'common/util/bem';

import './periodeBlokk.less';
import { UttaksplanFarge } from 'common/types';

interface Props {
    farge?: UttaksplanFarge;
    transparent?: boolean;
    nyPeriode?: boolean;
    children: React.ReactNode;
}

const bem = BEMHelper('periodeBlokk');

const PeriodeFargestrek: React.FunctionComponent<{ farge: UttaksplanFarge; gradert?: boolean }> = ({
    farge,
    gradert,
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

const PeriodeBlokk: React.FunctionComponent<Props> = ({ farge, nyPeriode, children, transparent }) => (
    <div
        className={classNames(
            bem.block,
            bem.modifierConditional('nyPeriode', nyPeriode),
            bem.modifierConditional('transparent', transparent)
        )}>
        <PeriodeFargestrek farge={farge || 'gul'} />
        <div className={bem.element('content')}>{children}</div>
    </div>
);

export default PeriodeBlokk;
