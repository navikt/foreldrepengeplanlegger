import * as React from 'react';
import { Periodetype } from '../../../types';
import Block from 'common/components/block/Block';
import { Element } from 'nav-frontend-typografi';
import DropdownButton from 'common/components/dropdownButton/DropdownButton';
import RadioGroup, { RadioOption } from 'common/components/skjema/radioGroup/RadioGroup';
import Knapperad from 'common/components/knapperad/Knapperad';
import { Knapp } from 'nav-frontend-knapper';
import { CheckboksPanel } from 'nav-frontend-skjema';
import { closeMenu } from 'react-aria-menubutton';
import Periodeikon from '../../periodeikon/Periodeikon';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/utils/i18nUtils';

export type PeriodetypeMenyChangeEvent = (evt: { periodetype: Periodetype; gradering: number | undefined }) => void;

interface OwnProps {
    id: string;
    periodetype?: Periodetype;
    gradering?: number;
    onChange: PeriodetypeMenyChangeEvent;
}

type Props = OwnProps & InjectedIntlProps;

interface State {
    periodetype: Periodetype | undefined;
    erGradert: boolean;
    gradering: number | undefined;
}

const options: RadioOption[] = [
    { value: Periodetype.Uttak, label: 'Uttak' },
    { value: Periodetype.Ferie, label: 'Ferie' },
    { value: Periodetype.Arbeid, label: 'Arbeid' },
    { value: Periodetype.UbetaltPermisjon, label: 'Ubetalt permisjon' }
];

class PeriodetypeDropdown extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            erGradert: props.gradering !== undefined,
            periodetype: props.periodetype,
            gradering: undefined
        };
    }
    renderPeriodetypeLabel() {
        const { periodetype, intl } = this.props;
        return periodetype ? (
            <div className="valgtPeriodetype">
                <div className="valgtPeriodetype__ikon">
                    <Periodeikon periodetype={periodetype} />
                </div>
                <div className="valgtPeriodetype__label">{getMessage(intl, `periodetype.${periodetype}`)}</div>
            </div>
        ) : (
            'Velg'
        );
    }
    render() {
        const { id, onChange } = this.props;
        const wrapperId = `wrapper-${id}`;
        return (
            <DropdownButton label={this.renderPeriodetypeLabel()} dialogClassName="periodetypeMeny" id={wrapperId}>
                <Block margin="xs">
                    <Element>Velg periodetype</Element>
                </Block>
                <Block margin="s">
                    <RadioGroup
                        name="periodetype"
                        options={options}
                        checked={this.state.periodetype}
                        onChange={(type) => this.setState({ periodetype: type as Periodetype })}
                        columns={1}
                    />
                </Block>
                <Block margin="xs">
                    <Element>Gradert periode?</Element>
                </Block>
                <Block margin="s">
                    <CheckboksPanel
                        checked={this.state.erGradert}
                        label="Gradert"
                        onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                            this.setState({ erGradert: evt.target.checked })
                        }
                    />
                </Block>
                <Knapperad align="center">
                    <Knapp
                        htmlType="button"
                        disabled={this.state.periodetype === undefined}
                        onClick={() => {
                            closeMenu(wrapperId);
                            onChange({ periodetype: this.state.periodetype!, gradering: this.state.gradering });
                        }}>
                        Ok
                    </Knapp>
                </Knapperad>
            </DropdownButton>
        );
    }
}

export default injectIntl(PeriodetypeDropdown);
