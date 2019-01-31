import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import DatoInput from 'common/components/skjema/datoInput/DatoInput';
import { Row, Column } from 'nav-frontend-grid';
import Block from 'common/components/block/Block';
import { Uttaksdagen } from '../../../utils/Uttaksdagen';
import { formaterDato } from 'common/utils/datoUtils';

interface TidsperiodeChangeEvent {
    fom?: Date;
    tom?: Date;
}

interface OwnProps {
    fom: Date | undefined;
    tom: Date | undefined;
    låstFomDato?: boolean;
    tomLabel?: React.ReactNode;
    fomLabel?: React.ReactNode;
    onChange: (evt: TidsperiodeChangeEvent) => void;
    onSetVarighet?: (dager: number) => void;
}

type Props = OwnProps & InjectedIntlProps;

const FomTomValg: React.StatelessComponent<Props> = ({
    intl,
    onChange,
    fom,
    tom,
    låstFomDato,
    fomLabel = 'Startdato',
    tomLabel = 'Sluttdato'
}) => {
    return (
        <>
            <Block margin="none">
                <Row>
                    {låstFomDato !== true && (
                        <Column xs="12" sm="6">
                            <Block margin="xs">
                                <DatoInput
                                    name="startdato"
                                    label={fomLabel}
                                    dato={fom}
                                    locale={intl.locale}
                                    id="tidsperiodeFra"
                                    disabled={låstFomDato}
                                    avgrensninger={{ helgedagerIkkeTillatt: true }}
                                    onChange={(dato) =>
                                        onChange({
                                            fom: dato,
                                            tom
                                        })
                                    }
                                />
                            </Block>
                        </Column>
                    )}
                    <Column xs="12" sm="6">
                        <Block margin="xs">
                            <DatoInput
                                name="sluttdato"
                                label={tomLabel}
                                dato={tom}
                                locale={intl.locale}
                                id="tidsperiodeTil"
                                avgrensninger={{
                                    helgedagerIkkeTillatt: true,
                                    minDato: låstFomDato && fom ? Uttaksdagen(fom).neste() : undefined
                                }}
                                onChange={(dato) =>
                                    onChange({
                                        fom,
                                        tom: dato
                                    })
                                }
                            />
                        </Block>
                    </Column>
                </Row>
            </Block>
            {låstFomDato && fom && (
                <div className="comment">
                    Perioden starter <strong>{formaterDato(fom)}</strong> (første dag etter foregående periode). For å
                    endre når denne perioden starter, må du endre sluttdato på foregående periode.
                </div>
            )}
        </>
    );
};

export default injectIntl(FomTomValg);
