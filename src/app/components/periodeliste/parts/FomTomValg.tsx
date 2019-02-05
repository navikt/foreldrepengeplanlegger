import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import DatoInput from 'common/components/skjema/datoInput/DatoInput';
import { Row, Column } from 'nav-frontend-grid';
import Block from 'common/components/block/Block';

interface TidsperiodeChangeEvent {
    fom?: Date;
    tom?: Date;
}

interface OwnProps {
    fom: Date | undefined;
    tom: Date | undefined;
    minDato: Date;
    maksDato: Date;
    låstFomDato?: boolean;
    låstTomDato?: boolean;
    tomLabel?: React.ReactNode;
    fomLabel?: React.ReactNode;
    disabled?: boolean;
    footer?: React.ReactNode;
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
    låstTomDato,
    minDato,
    maksDato,
    fomLabel = 'Startdato',
    tomLabel = 'Sluttdato',
    disabled,
    footer
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
                                    visÅrValger={true}
                                    locale={intl.locale}
                                    id="tidsperiodeFra"
                                    disabled={disabled || låstFomDato}
                                    avgrensninger={{ helgedagerIkkeTillatt: true, minDato, maksDato }}
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
                    {låstTomDato !== true && (
                        <Column xs="12" sm="6">
                            <Block margin="xs">
                                <DatoInput
                                    name="sluttdato"
                                    label={tomLabel}
                                    dato={tom}
                                    visÅrValger={true}
                                    locale={intl.locale}
                                    id="tidsperiodeTil"
                                    disabled={disabled}
                                    dayPickerProps={{ initialMonth: fom }}
                                    avgrensninger={{
                                        helgedagerIkkeTillatt: true,
                                        minDato: fom ? fom : minDato,
                                        maksDato
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
                    )}
                </Row>
            </Block>
            {footer}
        </>
    );
};

export default injectIntl(FomTomValg);
