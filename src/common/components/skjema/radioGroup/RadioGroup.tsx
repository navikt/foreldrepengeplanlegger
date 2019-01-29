import * as React from 'react';
import * as classnames from 'classnames';
import { Fieldset, RadioPanel } from 'nav-frontend-skjema';

import './radioGroup.less';

export interface RadioOption {
    id?: string;
    label: string;
    value: string;
    disabled?: boolean;
}

interface OwnProps {
    name: string;
    legend?: string;
    options: RadioOption[];
    checked?: string;
    onChange: (value: string | undefined) => void;
    columns?: 1 | 2 | 3;
    sameHeight?: boolean;
}

type Props = OwnProps;

class RadioGroup extends React.Component<Props> {
    render() {
        const { columns = 3, legend, checked, name, options, sameHeight, onChange } = this.props;

        const wrapperCls = classnames('radioPanelWrapper', `radioPanelWrapper--columns-${columns}`, {
            'radioPanelWrapper--sameHeight': sameHeight
        });
        const content = (
            <div className="radioPanelGruppe--responsive">
                {options.map((option) => {
                    return (
                        <div className={wrapperCls} key={option.value}>
                            <RadioPanel
                                name={name}
                                checked={checked === option.value}
                                onChange={() => onChange(option.value)}
                                {...option}
                            />
                        </div>
                    );
                })}
            </div>
        );
        return (
            <div className="radioPanelGruppe">{legend ? <Fieldset legend={legend}>{content}</Fieldset> : content}</div>
        );
    }
}

export default RadioGroup;
