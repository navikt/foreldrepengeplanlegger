import * as React from 'react';
import { SkjemaGruppe, Fieldset } from 'nav-frontend-skjema';
import NumberStepper, { Props as NumberStepperProps } from 'common/components/numberStepper/NumberStepper';
import { Feil } from 'common/components/skjema/skjemaInputElement/types';
import BEMHelper from 'common/utils/bem';

import './skjemaNumberStepper.less';

const bem = BEMHelper('skjemaNumberStepper');

interface Props extends NumberStepperProps {
    tittel: string;
    feil?: Feil;
    labelPlacement?: 'above' | 'below';
}

const SkjemaNumberStepper: React.StatelessComponent<Props> = (props) => {
    const { tittel, feil, labelPlacement = 'above', ...stepperProps } = props;
    return (
        <SkjemaGruppe feil={feil} className={bem.classNames(bem.block, bem.modifier(labelPlacement))}>
            <Fieldset legend={tittel}>
                <NumberStepper {...stepperProps} />
            </Fieldset>
        </SkjemaGruppe>
    );
};

export default SkjemaNumberStepper;
