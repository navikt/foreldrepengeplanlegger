import * as React from 'react';
import { UkerOgDager } from 'app/types';
import { Fieldset, SkjemaGruppe } from 'nav-frontend-skjema';
import { Feil } from 'common/components/skjema/skjemaInputElement/types';
import SkjemaNumberStepper from 'common/components/skjema/skjemaNumberStepper/SkjemaNumberStepper';
import BEMHelper from 'common/util/bem';

import './ukerOgDagerVelger.less';

export interface Props {
    tittel: string;
    uker: number;
    dager: number;
    minDager?: number;
    disabled?: boolean;
    feil?: Feil;
    onChange: (ukerOgDager: UkerOgDager) => void;
}

const bem = BEMHelper('ukerOgDagerVelger');

const UkerOgDagerVelger: React.StatelessComponent<Props> = ({
    uker,
    dager,
    feil,
    tittel,
    minDager,
    disabled,
    onChange
}) => (
    <div className={bem.block}>
        <SkjemaGruppe feil={feil}>
            <Fieldset legend={tittel}>
                <div className={bem.element('ukerOgDager')}>
                    <div className={bem.element('uker')}>
                        <SkjemaNumberStepper
                            tittel="Uker"
                            inputAriaLabel="Uker"
                            min={0}
                            value={uker}
                            disabled={disabled}
                            onChange={(u) => onChange({ uker: u === undefined ? 0 : u, dager })}
                        />
                    </div>
                    <div className={bem.element('dager')}>
                        <SkjemaNumberStepper
                            tittel="Dager"
                            inputAriaLabel="Dager"
                            min={uker !== undefined && uker > 0 ? -1 : minDager}
                            value={dager}
                            disabled={disabled}
                            onChange={(d) => onChange({ uker, dager: d === undefined ? 0 : d })}
                        />
                    </div>
                </div>
            </Fieldset>
        </SkjemaGruppe>
    </div>
);

export default UkerOgDagerVelger;
