import * as React from 'react';
import DatoInput from 'common/components/skjema/datoInput/DatoInput';
import { Checkbox } from 'nav-frontend-skjema';
import Block from 'common/components/block/Block';
import UkerOgDagerVelger from 'common/components/ukerOgDagerVelger/UkerOgDagerVelger';
import { getUkerOgDagerFromDager, formaterDato, formaterDatoUtenDag } from 'common/utils/datoUtils';
import { Tidsperiode } from 'nav-datovelger/src/datovelger/types';
import { Periode, Periodetype } from '../../../types';
import LinkButton from 'common/components/linkButton/LinkButton';
import { getDagerGradert } from '../../../utils/forbrukUtils';
import { Undertittel, Element } from 'nav-frontend-typografi';
import Tittel from 'common/components/tittel/Tittel';

export interface VarighetChangeEvent {
    ingenVarighet?: boolean;
    dager?: number;
}

export interface VarighetSkjemaProps {
    tidsperiode: Partial<Tidsperiode>;
    minDato?: Date;
    maksDato?: Date;
    antallUttaksdager?: number;
    antallUttaksdagerBrukt?: number;
    ingenVarighet?: boolean;
    perioder: Periode[];
    erNyPeriode: boolean;
    periodetype: Periodetype | undefined;
    nesteUttaksdag?: Date;
    gjenståendeDager?: number;
    gradering?: number;
    onTidsperiodeChange: (tidsperiode: Partial<Tidsperiode>) => void;
    onVarighetChange: (evt: VarighetChangeEvent) => void;
}

type Props = VarighetSkjemaProps;

interface State {
    varighetEllerSluttdato: 'sluttdato' | 'varighet';
}

const VarighetStartdato: React.StatelessComponent<Props> = ({
    onTidsperiodeChange,
    tidsperiode,
    minDato,
    maksDato,
    periodetype,
    erNyPeriode
}) => {
    const låstStartdato = periodetype !== Periodetype.UttakFørTermin && erNyPeriode === false;
    return (
        <>
            {låstStartdato && tidsperiode.fom && (
                <>
                    <Block margin="xs">
                        <Undertittel>Startdato</Undertittel>
                    </Block>
                    <Tittel
                        tittel={<Element className="capitalizeFirstLetter">{formaterDato(tidsperiode.fom)}</Element>}
                        info={{
                            tekst:
                                'Startdato bestemmes ut fra når foregående periode slutter. For å endre denne periodens startdato, må du endre sluttdatoen på den foregående.'
                        }}
                    />
                </>
            )}
            {låstStartdato === false && (
                <DatoInput
                    id="fom"
                    name="fom"
                    label={{
                        label: <Undertittel className="blokk-xxs">Startdato</Undertittel>,
                        ariaLabel: 'Startdato'
                    }}
                    visÅrValger={true}
                    dato={tidsperiode.fom}
                    disabled={låstStartdato}
                    avgrensninger={{ minDato, maksDato, helgedagerIkkeTillatt: true }}
                    onChange={(dato) => onTidsperiodeChange({ fom: dato, tom: tidsperiode.tom })}
                />
            )}
        </>
    );
};

const VarighetSluttdato: React.StatelessComponent<Props> = ({
    onTidsperiodeChange,
    tidsperiode,
    minDato,
    maksDato
}) => {
    return (
        <DatoInput
            id="tom"
            name="tom"
            label={{ label: <Undertittel className="blokk-xxs">Sluttdato</Undertittel>, ariaLabel: 'Sluttdato' }}
            visÅrValger={true}
            dato={tidsperiode.tom}
            avgrensninger={{ minDato: tidsperiode.fom || minDato, maksDato, helgedagerIkkeTillatt: true }}
            onChange={(dato) => onTidsperiodeChange({ tom: dato, fom: tidsperiode.fom })}
        />
    );
};

const VarighetStartdatoFørTermin: React.StatelessComponent<Props> = (props) => {
    const { ingenVarighet, onVarighetChange } = props;
    return (
        <Block margin="s">
            <Block margin="s">
                <VarighetStartdato {...props} />
            </Block>
            <Checkbox
                label="Jeg skal ikke ha uttak før termin"
                checked={ingenVarighet === true || false}
                onChange={(evt) => onVarighetChange({ ingenVarighet: evt.target.checked })}
            />
        </Block>
    );
};

class VarighetSkjema extends React.Component<Props, State> {
    render() {
        const {
            onVarighetChange,
            antallUttaksdager,
            antallUttaksdagerBrukt,
            tidsperiode,
            onTidsperiodeChange,
            nesteUttaksdag,
            gjenståendeDager,
            periodetype,
            gradering
        } = this.props;
        const { uker, dager } = getUkerOgDagerFromDager(antallUttaksdager || 0);
        const { fom } = tidsperiode;

        if (periodetype === Periodetype.UttakFørTermin) {
            return <VarighetStartdatoFørTermin {...this.props} />;
        }
        return (
            <div>
                <Block>
                    <VarighetStartdato {...this.props} />
                    {fom === undefined && nesteUttaksdag !== undefined && (
                        <Block marginTop="xs">
                            Neste dag:{' '}
                            <LinkButton
                                onClick={() => onTidsperiodeChange({ fom: nesteUttaksdag, tom: tidsperiode.tom })}>
                                {formaterDatoUtenDag(nesteUttaksdag)}
                            </LinkButton>
                        </Block>
                    )}
                </Block>
                <Block visible={tidsperiode.fom !== undefined} margin="none">
                    <Block margin="s">
                        <VarighetSluttdato {...this.props} />
                    </Block>

                    <Block margin="s">
                        <UkerOgDagerVelger
                            tittel="Lengde"
                            dager={dager}
                            uker={uker}
                            minDager={1}
                            onChange={(ukerOgDager) =>
                                onVarighetChange({
                                    dager: ukerOgDager.dager + ukerOgDager.uker * 5
                                })
                            }
                        />
                    </Block>
                    {gjenståendeDager !== undefined &&
                        gjenståendeDager > 0 &&
                        (antallUttaksdager === undefined ||
                            (antallUttaksdagerBrukt !== undefined && antallUttaksdagerBrukt !== gjenståendeDager)) && (
                            <LinkButton
                                onClick={() =>
                                    onVarighetChange({
                                        dager: getDagerGradert(gjenståendeDager, gradering)
                                    })
                                }>
                                Bruk gjenstående dager
                            </LinkButton>
                        )}
                </Block>
            </div>
        );
    }
}

export default VarighetSkjema;
