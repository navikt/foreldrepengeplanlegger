import * as React from 'react';
import classnames from 'classnames';

import VeilederNormal from './VeilederNormalSvg';
import VeilederKompakt from './VeilederKompaktSvg';

import './veileder.less';

export type VeilederAnsiktstype = 'glad' | 'undrende' | 'skeptisk';

export interface VeilederProps {
    ansikt?: VeilederAnsiktstype;
    farge?: 'lilla' | 'gronn' | 'bla' | 'transparent';
    stil?: 'normal' | 'kompakt' | 'iNavVeilederPanel';
}

interface OwnProps {
    className?: string;
}

type Props = VeilederProps & OwnProps;

const Veileder = (props: Props) => {
    const { className, farge = 'lilla', ansikt = 'glad', stil = 'normal', ...rest } = props;

    const svgProps = {
        ...rest,
        width: '184',
        height: '184',
        className: classnames(
            'veileder',
            `veileder--tema-${farge}`,
            `veileder--${ansikt}`,
            `veileder--stil-${stil}`,
            props.className
        )
    };
    return stil !== 'kompakt' ? <VeilederNormal svgProps={svgProps} /> : <VeilederKompakt svgProps={svgProps} />;
};

export default Veileder;
