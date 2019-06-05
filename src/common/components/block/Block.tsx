import * as React from 'react';
import classNames from 'classnames';
import BEMHelper from 'common/util/bem';
import { Collapse } from 'react-collapse';
import { collapseSpringConfig } from 'common/util/animationUtils';
import Infoboks from 'common/components/infoboks/Infoboks';

import './block.less';

export type BlockPadding = 'xxl' | 'xl' | 'l' | 'ml' | 'm' | 's' | 'xs' | 'xxs' | 'xxs' | 'none';

export interface BlockProps {
    header?: {
        title: string;
        info?: string;
        stil?: 'normal' | 'seksjon';
    };
    visible?: boolean;
    animated?: boolean;
    margin?: BlockPadding;
    marginTop?: BlockPadding;
    hasChildBlocks?: boolean;
    children: React.ReactNode;
    align?: undefined | 'left' | 'center' | 'right';
    style?: 'info' | undefined;
    screenOnly?: boolean;
}

const cls = BEMHelper('block');

const Block: React.StatelessComponent<BlockProps> = ({
    visible,
    margin,
    marginTop,
    header,
    animated = false,
    children,
    hasChildBlocks,
    align,
    screenOnly,
    style
}) => {
    if (children === undefined || (animated !== true && visible === false)) {
        return null;
    }
    let bottomMargin: BlockPadding;
    if (margin === undefined && marginTop === undefined) {
        bottomMargin = 'l';
    } else if (margin === undefined && marginTop !== undefined) {
        bottomMargin = 'none';
    } else if (margin !== undefined) {
        bottomMargin = margin;
    } else {
        bottomMargin = 'l';
    }

    const contentClass = classNames(
        cls.block,
        !hasChildBlocks ? cls.modifier(bottomMargin) : cls.modifier('none'),
        screenOnly ? 'no-print' : undefined,
        {
            [cls.modifier(`top-${marginTop}`)]: marginTop,
            [cls.modifier(`align-${align}`)]: align,
            [cls.modifier(`style-${style}`)]: style
        }
    );
    const content =
        header !== undefined ? (
            <section className={contentClass}>
                <div className={cls.element('heading', `stil-${header.stil || 'normal'}`)}>
                    <h1 className={`typo-element ${cls.element('title')}`}>{header.title}</h1>
                    {header.info && <Infoboks tekst={header.info} contentFullWidth={true} />}
                </div>
                {children}
            </section>
        ) : (
            <div className={contentClass}>{children}</div>
        );

    if (animated === true && 1 + 1 === 2) {
        return (
            <Collapse isOpened={visible !== false} springConfig={collapseSpringConfig}>
                {content}
            </Collapse>
        );
    }
    return visible === true || visible === undefined ? content : null;
};

export default Block;
