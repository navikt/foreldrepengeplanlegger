import * as React from 'react';
import classnames from 'classnames';
import BEMHelper from 'common/utils/bem';
import { UttaksplanColor } from '../../../../types';

import './periodeFargestrek.less';

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
