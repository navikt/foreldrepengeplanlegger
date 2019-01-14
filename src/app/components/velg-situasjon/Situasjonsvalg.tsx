import * as React from 'react';
import classnames from 'classnames';
import { Situasjon } from '../../types';
import { FormattedMessage } from 'react-intl';
import Foreldrepar from 'common/components/foreldrepar/Foreldrepar';

import './situasjonsvalg.less';
import BEMHelper from 'common/utils/bem';

interface Props {
    situasjon: Situasjon;
    onChange: (checked: boolean) => void;
    checked?: boolean;
}

interface State {
    hasFocus: boolean;
}

const getForeldreparFromSituasjon = (situasjon: Situasjon): React.ReactNode => {
    switch (situasjon) {
        case Situasjon.farOgMor:
            return <Foreldrepar firstParent="far1" secondParent="mor1" />;
        case Situasjon.bareFar:
            return <Foreldrepar firstParent="far1" secondParent="mor1" variant="andreForelderHalvtSynlig" />;
        case Situasjon.bareMor:
            return <Foreldrepar firstParent="far1" secondParent="mor1" variant="førsteForelderHalvtSynlig" />;
        case Situasjon.aleneomsorg:
            return <Foreldrepar firstParent="far2" secondParent="mor2" variant="foreldreSeparert" />;
        case Situasjon.morOgMedmor:
            return <Foreldrepar firstParent="medmor1" secondParent="medmor2" />;
        case Situasjon.farOgFar:
            return <Foreldrepar firstParent="far4" secondParent="far3" />;
    }
};

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
        return (
            <label
                className={classnames(bem.className, {
                    [bem.modifier('valgt')]: checked,
                    [bem.modifier('medFokus')]: this.state.hasFocus
                })}>
                <div className={bem.element('ikonOgLabel')}>
                    <div className={bem.element('ikon')} role="presentation" aria-hidden={true}>
                        {getForeldreparFromSituasjon(situasjon)}
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
                />
            </label>
        );
    }
}
export default Situasjonsvalg;
