import * as React from 'react';
import classNames from 'classnames';
import BEMHelper from 'common/utils/bem';
import { Collapse } from 'react-collapse';
import { collapseSpringConfig } from 'common/utils/animationUtils';
import { Undertittel, Element } from 'nav-frontend-typografi';

import './block.less';

export type BlockPadding = 'xl' | 'l' | 'm' | 's' | 'xs' | 'xxs' | 'none';

export interface BlockProps {
    title?: React.ReactNode;
    headingSize?: 'm' | 'l';
    visible?: boolean;
    animated?: boolean;
    margin?: BlockPadding;
    hasChildBlocks?: boolean;
    children: React.ReactNode;
    align?: undefined | 'left' | 'center' | 'right';
}

const bem = BEMHelper('block');

const Block: React.StatelessComponent<BlockProps> = ({
    visible,
    margin = 'm',
    title,
    animated = false,
    children,
    hasChildBlocks,
    align,
    headingSize = 'm'
}) => {
    if (children === undefined || (animated !== true && visible === false)) {
        return null;
    }
    const contentClass = classNames(bem.block, !hasChildBlocks ? bem.modifier(margin) : bem.modifier('none'), {
        [bem.modifier(`align-${align}`)]: align
    });
    const content =
        title !== undefined ? (
            <section className={contentClass}>
                <div className="heading">
                    {headingSize === 'm' ? (
                        <Element tag="h1">{title}</Element>
                    ) : (
                        <Undertittel tag="h1">{title}</Undertittel>
                    )}
                </div>
                {children}
            </section>
        ) : (
            <div className={contentClass}>{children}</div>
        );

    if (animated === true) {
        return (
            <Collapse isOpened={visible !== false} springConfig={collapseSpringConfig}>
                {content}
            </Collapse>
        );
    }
    return visible === true || visible === undefined ? content : null;
};

export default Block;
