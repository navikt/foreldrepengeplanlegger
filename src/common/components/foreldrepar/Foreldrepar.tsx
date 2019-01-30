import * as React from 'react';
import { FlexibleSvg } from '../customSvg/CustomSVG';
import classnames from 'classnames';
import BEMHelper from 'common/utils/bem';
import { ForeldreparForelder, ForeldreparIllustrasjonsvariant } from 'common/components/foreldrepar/foreldreparTypes';

import './foreldrepar.less';

interface Props {
    firstParent: ForeldreparForelder;
    secondParent?: ForeldreparForelder;
    variant?: ForeldreparIllustrasjonsvariant;
}

const cls = BEMHelper('foreldrepar');

const Foreldrepar: React.StatelessComponent<Props> = ({ firstParent, secondParent, variant }) => {
    const firstSvg = require(`./assets/${firstParent}.svg`).default;
    const secondSvg = secondParent ? require(`./assets/${secondParent}.svg`).default : undefined;

    return (
        <div
            role="presentation"
            className={classnames(cls.block, {
                [cls.element('closerParents')]: variant && variant === 'foreldreNærmere'
            })}>
            <Forelder
                className={cls.element('firstParent')}
                svg={firstSvg}
                lessOpacity={variant === 'førsteForelderHalvtSynlig'}
            />
            {secondSvg && (
                <>
                    {variant && variant === 'foreldreSeparert' && <span className={cls.element('parentSeparator')} />}
                    <Forelder
                        className={cls.element('secondParent')}
                        svg={secondSvg}
                        lessOpacity={variant === 'andreForelderHalvtSynlig'}
                    />
                </>
            )}
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
