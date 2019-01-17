import * as React from 'react';
import { Row, Column } from 'nav-frontend-grid';
import { UkerOgDager } from 'app/types';
import { Fieldset, SkjemaGruppe } from 'nav-frontend-skjema';
import { Feil } from 'common/components/skjema/skjema-input-element/types';
import SkjemaNumberStepper from 'common/components/skjema/skjemaNumberStepper/SkjemaNumberStepper';

interface Props {
    tittel: string;
    uker: number;
    dager: number;
    onChange: (ukerOgDager: UkerOgDager) => void;
    feil?: Feil;
}

const UkerOgDagerVelger: React.StatelessComponent<Props> = ({ uker, dager, feil, tittel, onChange }) => (
    <div className="ukerOgDagerVelger">
        <SkjemaGruppe feil={feil}>
            <Fieldset legend={tittel}>
                <Row>
                    <Column xs="12" sm="4">
                        <SkjemaNumberStepper
                            legend="Uker"
                            min={0}
                            value={uker}
                            onChange={(u) => onChange({ uker: u, dager })}
                        />
                    </Column>
                    <Column xs="12" sm="4">
                        <SkjemaNumberStepper
                            legend="Dager"
                            min={uker > 0 ? -1 : 1}
                            value={dager}
                            onChange={(d) => onChange({ uker, dager: d })}
                        />
                    </Column>
                </Row>
            </Fieldset>
        </SkjemaGruppe>
    </div>
);

export default UkerOgDagerVelger;
