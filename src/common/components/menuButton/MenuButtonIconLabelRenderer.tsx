import * as React from 'react';
import classnames from 'classnames';
import { MenuButtonOption, MenuButtonIconRenderer } from 'common/components/menuButton/MenuButton';
import BEMHelper from 'common/utils/bem';
import AriaText from 'common/components/aria/AriaText';

interface Props {
    option: MenuButtonOption;
    isSelected: boolean;
    iconRenderer?: MenuButtonIconRenderer;
    iconOnly?: boolean;
}

const bem = BEMHelper('menuButtonIconLabel');

const MenuButtonIconLabelRenderer: React.StatelessComponent<Props> = ({
    option,
    iconRenderer,
    isSelected,
    iconOnly = false
}) => {
    return (
        <div className={classnames(bem.block, { [`${bem.block}--iconOnly`]: iconOnly })}>
            {iconRenderer && <div className={bem.element('icon')}>{iconRenderer(option, isSelected)}</div>}
            {iconOnly ? (
                <AriaText>{option.label}</AriaText>
            ) : (
                <div className={bem.element('label')}>{option.label}</div>
            )}
        </div>
    );
};

export default MenuButtonIconLabelRenderer;
