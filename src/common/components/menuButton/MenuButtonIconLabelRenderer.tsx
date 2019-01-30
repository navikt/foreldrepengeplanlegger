import * as React from 'react';
import { MenuButtonOption, MenuButtonIconRenderer } from 'common/components/menuButton/MenuButton';
import BEMHelper from 'common/utils/bem';

interface Props {
    option: MenuButtonOption;
    isSelected: boolean;
    iconRenderer?: MenuButtonIconRenderer;
}

const bem = BEMHelper('menuButtonIconLabel');

const MenuButtonIconLabelRenderer: React.StatelessComponent<Props> = ({ option, iconRenderer, isSelected }) => {
    return (
        <div className={bem.block}>
            {iconRenderer && <div className={bem.element('icon')}>{iconRenderer(option, isSelected)}</div>}
            <div className={bem.element('label')}>{option.label}</div>
        </div>
    );
};

export default MenuButtonIconLabelRenderer;
