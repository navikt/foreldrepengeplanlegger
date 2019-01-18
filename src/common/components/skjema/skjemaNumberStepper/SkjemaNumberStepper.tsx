import * as React from 'react';
import { SkjemaGruppe, Fieldset } from 'nav-frontend-skjema';
import NumberStepper, { Props as NumberStepperProps } from 'common/components/numberStepper/NumberStepper';
import { Feil } from 'common/components/skjema/skjemaInputElement/types';

interface Props extends NumberStepperProps {
    tittel: string;
    feil?: Feil;
}

const SkjemaNumberStepper: React.StatelessComponent<Props> = (props) => {
    const { tittel, feil, ...stepperProps } = props;
    return (
        <SkjemaGruppe feil={feil}>
            <Fieldset legend={tittel}>
                <NumberStepper {...stepperProps} />
            </Fieldset>
        </SkjemaGruppe>
    );
};

export default SkjemaNumberStepper;
