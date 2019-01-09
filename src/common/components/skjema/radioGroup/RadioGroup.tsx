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
    legend: string;
    options: RadioOption[];
    checked?: string;
    onChange: (value: string | undefined) => void;
    twoColumns?: boolean;
}

type Props = OwnProps;

class RadioGroup extends React.Component<Props> {
    render() {
        const { twoColumns = false, legend, checked, name, options, onChange } = this.props;

        const cls = classnames('radioPanelWrapper', {
            'radioPanelWrapper--twoColumns': twoColumns === true
        });
        return (
            <div className="radioPanelGruppe">
                <Fieldset legend={legend}>
                    <div className="radioPanelGruppe--responsive">
                        {options.map((option) => {
                            return (
                                <div className={cls} key={option.value}>
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
                </Fieldset>
            </div>
        );
    }
}

export default RadioGroup;
