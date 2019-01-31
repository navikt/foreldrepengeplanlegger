import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { Fieldset } from 'nav-frontend-skjema';
import DatoInput from 'common/components/skjema/datoInput/DatoInput';
import { Row, Column } from 'nav-frontend-grid';

interface TidsperiodeChangeEvent {
    fom?: Date;
    tom?: Date;
}

interface OwnProps {
    fom: Date | undefined;
    tom: Date | undefined;
    onChange: (evt: TidsperiodeChangeEvent) => void;
    onSetVarighet?: (dager: number) => void;
}

type Props = OwnProps & InjectedIntlProps;

const FomTomValg: React.StatelessComponent<Props> = ({ intl, onChange, fom, tom }) => {
    return (
        <Fieldset legend="Velg tidsperiode">
            <Row>
                <Column xs="6">
                    <DatoInput
                        name="startdato"
                        label="Fra og med"
                        dato={fom}
                        locale={intl.locale}
                        id="tidsperiodeFra"
                        onChange={(dato) =>
                            onChange({
                                fom: dato,
                                tom
                            })
                        }
                    />
                </Column>
                <Column xs="6">
                    <DatoInput
                        name="sluttdato"
                        label="Til og med"
                        dato={tom}
                        locale={intl.locale}
                        id="tidsperiodeTil"
                        onChange={(dato) =>
                            onChange({
                                fom,
                                tom: dato
                            })
                        }
                    />
                </Column>
            </Row>
        </Fieldset>
    );
};

export default injectIntl(FomTomValg);
