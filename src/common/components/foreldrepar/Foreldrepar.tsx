import * as React from 'react';
import { FlexibleSvg } from '../customSvg/CustomSVG';
import BEMHelper from 'common/utils/bem';
import { ForeldreparForelder, ForeldreparIllustrasjonsvariant } from 'common/components/foreldrepar/foreldreparTypes';

import './foreldrepar.less';

interface Props {
    forelder1: ForeldreparForelder;
    forelder2?: ForeldreparForelder;
    variant?: ForeldreparIllustrasjonsvariant;
    kompakt?: boolean;
}

const bem = BEMHelper('foreldrepar');

const Foreldrepar: React.StatelessComponent<Props> = ({ forelder1, forelder2, variant, kompakt }) => {
    const firstSvg = require(`./assets/${forelder1}.svg`).default;
    const secondSvg = forelder2 ? require(`./assets/${forelder2}.svg`).default : undefined;

    return (
        <div role="presentation" className={bem.classNames(bem.block, bem.modifierConditional('kompakt', kompakt))}>
            <Forelder
                className={bem.element('firstParent')}
                svg={firstSvg}
                lessOpacity={variant === 'førsteForelderHalvtSynlig'}
            />
            {secondSvg && (
                <>
                    {variant && variant === 'foreldreSeparert' && <span className={bem.element('parentSeparator')} />}
                    <Forelder
                        className={bem.element('secondParent')}
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
            className={bem.classNames(className, bem.modifierConditional('halfOpacity', lessOpacity))}
            iconRef={svg}
            width={31}
            height={45}
        />
    );

    return svgToRender;
};

export default Foreldrepar;
