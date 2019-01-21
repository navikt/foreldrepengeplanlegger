import * as React from 'react';
import classnames from 'classnames';
import BEMHelper from 'common/utils/bem';

import './periodeFargestrek.less';
import { UttaksplanColor } from '../../../../types';

export interface Props {
    farge: UttaksplanColor | undefined;
    gradert?: boolean;
}

const bem = BEMHelper('periodeFargestrek');

const PeriodeFargestrek: React.StatelessComponent<Props> = ({ farge, gradert }) => {
    return (
        <div
            className={classnames(
                bem.block,
                bem.modifier(farge),
                gradert ? `${bem.modifier(farge)}--gradert` : undefined
            )}
        />
    );
};
export default PeriodeFargestrek;
