import * as React from 'react';
import { FlexibleSvg } from '../custom-svg/CustomSVG';
import classnames from 'classnames';
import BEMHelper from 'common/utils/bem';

import './foreldrepar.less';

export type ForeldreparForelder = 'far1' | 'far2' | 'far3' | 'far4' | 'medmor1' | 'medmor2' | 'mor1' | 'mor2';

type Illustrasjonsvariant =
    | 'førsteForelderHalvtSynlig'
    | 'andreForelderHalvtSynlig'
    | 'foreldreSeparert'
    | 'foreldreNærmere';

interface Props {
    firstParent: ForeldreparForelder;
    secondParent: ForeldreparForelder;
    variant?: Illustrasjonsvariant;
}

const cls = BEMHelper('foreldrepar');

const Foreldrepar: React.StatelessComponent<Props> = ({ firstParent, secondParent, variant }) => {
    const firstSvg = require(`./assets/${firstParent}.svg`).default;
    const secondSvg = require(`./assets/${secondParent}.svg`).default;

    return (
        <div
            role="presentation"
            className={classnames(cls.className, {
                [cls.element('closerParents')]: variant && variant === 'foreldreNærmere'
            })}>
            <Forelder
                className={cls.element('firstParent')}
                svg={firstSvg}
                lessOpacity={variant === 'førsteForelderHalvtSynlig'}
            />
            {variant && variant === 'foreldreSeparert' && <span className={cls.element('parentSeparator')} />}
            <Forelder
                className={cls.element('secondParent')}
                svg={secondSvg}
                lessOpacity={variant === 'andreForelderHalvtSynlig'}
            />
        </div>
    );
};

const Forelder = ({ className, svg, lessOpacity }: { className: string; svg: any; lessOpacity?: boolean }) => {
    const svgToRender = (
        <FlexibleSvg
            className={classnames(className, { [cls.element('halfOpacity')]: lessOpacity })}
            iconRef={svg}
            width={31}
            height={45}
        />
    );

    return svgToRender;
};

export default Foreldrepar;
