import * as React from 'react';
import classNames from 'classnames';
import { Situasjon } from '../../../../types';
import { FormattedMessage } from 'react-intl';
import BEMHelper from 'common/util/bem';
import SituasjonForeldrepar from '../../../situasjonForeldrepar/SituasjonForeldrepar';

import './velgSituasjon.less';

interface Props {
    situasjon: Situasjon;
    onChange: (checked: boolean) => void;
    checked?: boolean;
}

interface State {
    hasFocus: boolean;
}

const bem = BEMHelper('situasjonsvalg');

class Situasjonsvalg extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.toggleOutline = this.toggleOutline.bind(this);
        this.state = { hasFocus: false };
    }

    toggleOutline() {
        this.setState({ hasFocus: !this.state.hasFocus });
    }

    render() {
        const { situasjon, checked, onChange } = this.props;
        const inputId = `situasjon_${situasjon}`;
        return (
            <label
                htmlFor={inputId}
                className={classNames(bem.block, {
                    [bem.modifier('valgt')]: checked,
                    [bem.modifier('medFokus')]: this.state.hasFocus
                })}>
                <div className={bem.element('ikonOgLabel')}>
                    <div className={bem.element('ikon')} role="presentation" aria-hidden={true}>
                        <SituasjonForeldrepar situasjon={situasjon} />
                    </div>
                    <div className={bem.element('label')}>
                        <FormattedMessage id={`situasjon.${situasjon}`} />
                    </div>
                </div>
                <input
                    type="radio"
                    name="situasjon"
                    onChange={(evt) => onChange(evt.target.checked)}
                    checked={checked}
                    value={situasjon}
                    className={bem.element('input')}
                    onFocus={() => this.toggleOutline()}
                    onBlur={() => this.toggleOutline()}
                    id={inputId}
                />
            </label>
        );
    }
}
export default Situasjonsvalg;
