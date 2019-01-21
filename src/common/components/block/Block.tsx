import * as React from 'react';
import classNames from 'classnames';
import BEMHelper from 'common/utils/bem';

import './block.less';
import { Collapse } from 'react-collapse';
import { collapseSpringConfig } from 'common/utils/animationUtils';

export type BlockPadding = 'xl' | 'l' | 'm' | 's' | 'xs' | 'xxs' | 'none';

export interface BlockProps {
    /** Default true */
    title?: string;
    visible?: boolean;
    /** Animation is set to default true if visible is !undefined, unless animated is set to false */
    animated?: boolean;
    /** Size - default m */
    margin?: BlockPadding;
    /** If Block contains child Block. If so, it disables animation */
    hasChildBlocks?: boolean;
    /** content */
    children: React.ReactNode;
    /** content */
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
    align
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
                    <h1 className={`typo-element ${bem.element('title')}`}>{title}</h1>
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
