import * as React from 'react';
import DatoInput from 'common/components/skjema/datoInput/DatoInput';
import { Checkbox } from 'nav-frontend-skjema';
import Block from 'common/components/block/Block';
import UkerOgDagerVelger from 'common/components/ukerOgDagerVelger/UkerOgDagerVelger';
import { getUkerOgDagerFromDager, formaterDatoUtenDag } from 'common/utils/datoUtils';
import { Tidsperiode } from 'nav-datovelger/src/datovelger/types';
import { Periode, Periodetype } from '../../../types';
import LinkButton from 'common/components/linkButton/LinkButton';
import { getDagerGradert } from '../../../utils/forbrukUtils';
import { Undertittel, Ingress } from 'nav-frontend-typografi';
import Tittel from 'common/components/tittel/Tittel';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import getMessage from 'common/utils/i18nUtils';

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

type Props = VarighetSkjemaProps & InjectedIntlProps;

interface State {
    varighetEllerSluttdato: 'sluttdato' | 'varighet';
}

const VarighetStartdato: React.StatelessComponent<Props> = ({
    onTidsperiodeChange,
    tidsperiode,
    minDato,
    maksDato,
    periodetype,
    erNyPeriode,
    intl
}) => {
    const låstStartdato = periodetype !== Periodetype.UttakFørTermin && erNyPeriode === false;
    const label = getMessage(intl, 'periodeskjema.tid.startdato');
    return (
        <>
            {låstStartdato && tidsperiode.fom && (
                <>
                    <Block margin="xs">
                        <Undertittel>{label}</Undertittel>
                    </Block>
                    <Tittel
                        tittel={
                            <Ingress className="capitalizeFirstLetter">{formaterDatoUtenDag(tidsperiode.fom)}</Ingress>
                        }
                        info={{
                            tekst: getMessage(intl, 'periodeskjema.tid.startdato.låstInfo')
                        }}
                    />
                </>
            )}
            {låstStartdato === false && (
                <DatoInput
                    id="fom"
                    name="fom"
                    label={{
                        label: <Undertittel className="blokk-xxs">{label}</Undertittel>,
                        ariaLabel: label
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
    maksDato,
    intl
}) => {
    const label = getMessage(intl, 'periodeskjema.tid.sluttdato');
    return (
        <DatoInput
            id="tom"
            name="tom"
            label={{
                label: <Undertittel className="blokk-xxs">{label}</Undertittel>,
                ariaLabel: label
            }}
            visÅrValger={true}
            dato={tidsperiode.tom}
            avgrensninger={{ minDato: tidsperiode.fom || minDato, maksDato, helgedagerIkkeTillatt: true }}
            onChange={(dato) => onTidsperiodeChange({ tom: dato, fom: tidsperiode.fom })}
        />
    );
};

const VarighetStartdatoFørTermin: React.StatelessComponent<Props> = (props) => {
    const { ingenVarighet, onVarighetChange, intl } = props;
    return (
        <Block margin="s">
            <Block margin="s">
                <VarighetStartdato {...props} />
            </Block>
            <Checkbox
                label={getMessage(intl, 'periodeskjema.tid.skalIkkeHaDagerFørTermin')}
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
            gradering,
            intl
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
                            <FormattedMessage id="periodeskjema.tid.nesteDag" />{' '}
                            <LinkButton
                                onClick={() => onTidsperiodeChange({ fom: nesteUttaksdag, tom: tidsperiode.tom })}>
                                {formaterDatoUtenDag(nesteUttaksdag)}
                            </LinkButton>
                        </Block>
                    )}
                </Block>
                <Block margin="s">
                    <VarighetSluttdato {...this.props} />
                </Block>

                <Block margin="s">
                    <UkerOgDagerVelger
                        tittel={getMessage(intl, 'periodeskjema.tid.lengde')}
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
                            <FormattedMessage id="periodeskjema.tid.brukGjenståendeDager" />
                        </LinkButton>
                    )}
            </div>
        );
    }
}

export default injectIntl(VarighetSkjema);
