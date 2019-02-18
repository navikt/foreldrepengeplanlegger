import * as React from 'react';
import moment from 'moment';
import { VarighetMenyProps, getVarighetVariant } from './VarighetMeny';
import Block from 'common/components/block/Block';
import { Checkbox, Select } from 'nav-frontend-skjema';
import FomTomValg from './FomTomValg';
import { getUkerOgDagerFromDager, formaterDatoTall } from 'common/utils/datoUtils';
import UkerOgDagerVelger from 'common/components/ukerOgDagerVelger/UkerOgDagerVelger';
import { Element } from 'nav-frontend-typografi';
import Varighet from '../../varighet/Varighet';
import Alertstriper from 'nav-frontend-alertstriper';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Uttaksdagen } from '../../../utils/Uttaksdagen';
import { Forelder, Periode } from '../../../types';
import LinkButton from 'common/components/linkButton/LinkButton';

const DatoValg: React.StatelessComponent<VarighetMenyProps> = (props) => {
    const {
        fom,
        tom,
        onTidsperiodeChange,
        sluttdatoErLåst,
        startdatoErLåst,
        ingenVarighet,
        førsteUttaksdag,
        sisteUttaksdag
    } = props;
    return (
        <FomTomValg
            onChange={onTidsperiodeChange}
            fom={fom}
            tom={tom}
            minDato={førsteUttaksdag}
            maksDato={sisteUttaksdag}
            låstFomDato={startdatoErLåst}
            låstTomDato={sluttdatoErLåst}
            disabled={ingenVarighet}
            footer={<Footer {...props} />}
            skjulLåstVerdi={true}
            tomLabel={startdatoErLåst ? 'Velg sluttdato' : undefined}
            fomLabel={sluttdatoErLåst ? 'Velg startdato' : undefined}
        />
    );
};

const VarighetValg: React.StatelessComponent<VarighetMenyProps> = (props) => {
    const {
        dager,
        minDager,
        ingenVarighet,
        gradering,
        forelderNavn,
        onVarighetChange,
        brukteUttaksdager,
        gradert
    } = props;

    if (onVarighetChange) {
        const ukerOgDager = getUkerOgDagerFromDager(dager || 0);
        return (
            <Block margin="s" visible={ingenVarighet !== true}>
                <UkerOgDagerVelger
                    tittel={'Velg varighet'}
                    uker={ukerOgDager.uker}
                    dager={ukerOgDager.dager}
                    disabled={ingenVarighet}
                    minDager={minDager}
                    onChange={(ud) => onVarighetChange({ dager: ud.uker * 5 + ud.dager })}
                />
                {gradert && gradering !== undefined && brukteUttaksdager && brukteUttaksdager >= 0 && (
                    <Alertstriper type="nav-ansatt">
                        <Element>Foreldrepenger og arbeid</Element>
                        På grunn av at {forelderNavn || 'du'} arbeider {100 - gradering} prosent, brukes{' '}
                        <strong>
                            <Varighet dager={brukteUttaksdager} separator={' og '} />
                        </strong>{' '}
                        dager med foreldrepenger i denne perioden.
                    </Alertstriper>
                )}
            </Block>
        );
    }
    return null;
};

const BrukteUttaksdagerInfo: React.StatelessComponent<{ dager: number | undefined }> = ({ dager }) => {
    if (dager !== undefined && dager > 0) {
        return (
            <Block margin="xs">
                Tidsperioden inneholder{' '}
                <strong>
                    <Varighet dager={dager} separator={' og '} />
                </strong>{' '}
                med foreldrepenger.
            </Block>
        );
    }
    return null;
};

const Footer: React.StatelessComponent<VarighetMenyProps> = (props) => {
    const { fom } = props;
    if (!fom) {
        return null;
    }
    switch (getVarighetVariant(props)) {
        case 'låstStartdato':
            return (
                <div className="comment">
                    Startdato bestemmes ut fra når foregående periode slutter. For å endre denne periodens startdato, må
                    du endre sluttdatoen på den foregående.
                </div>
            );

        default:
            return null;
    }
};

type NyPeriodePlassering = 'inni' | 'etter' | undefined;
const EgendefinertDatoValg = 'egendefinert';

interface State {
    plassering: NyPeriodePlassering;
    etterPeriode?: Periode;
    egendefinert?: boolean;
}

class VarighetMenyInnhold extends React.Component<VarighetMenyProps & InjectedIntlProps, State> {
    constructor(props: VarighetMenyProps) {
        super(props);

        let periodeFørValgtTom: Periode | undefined;
        if (props.fom) {
            periodeFørValgtTom = props.perioder.find((p) =>
                moment(Uttaksdagen(p.tidsperiode.tom).neste()).isSame(props.fom, 'day')
            );
        }
        this.state = {
            plassering: undefined,
            egendefinert: props.tom !== undefined && periodeFørValgtTom === undefined,
            etterPeriode: periodeFørValgtTom
        };
        this.setEtterPeriodeTom = this.setEtterPeriodeTom.bind(this);
    }

    setEtterPeriodeTom(value: string) {
        if (value === EgendefinertDatoValg) {
            this.setState({ etterPeriode: undefined, egendefinert: true });
        } else {
            const { perioder } = this.props;
            const periode = perioder.find((p) => p.id === value);
            this.setState({ etterPeriode: periode, egendefinert: false });
            if (periode) {
                this.props.onTidsperiodeChange({ fom: Uttaksdagen(periode.tidsperiode.tom).neste() });
            }
        }
    }
    render() {
        const props = this.props;
        const { onVarighetChange, ingenVarighet, perioder, omForeldre, gjenståendeDager, intl } = props;
        const variant = getVarighetVariant(props);

        const handleIngenVarighet = (ingenVarighetValgt: boolean) => {
            onVarighetChange!({
                ingenVarighet: ingenVarighetValgt
            });
        };

        const kanVelgeVarighet = onVarighetChange && variant !== 'foreldrepengerFørTermin';
        if (variant === 'låstStartdato' || variant === 'foreldrepengerFørTermin') {
            return (
                <>
                    <Block>
                        <DatoValg {...props} />
                        {variant === 'foreldrepengerFørTermin' && (
                            <Block margin="none">
                                <Checkbox
                                    label="Jeg skal ikke ha uttak før termin"
                                    checked={ingenVarighet === true || false}
                                    onChange={(evt) => handleIngenVarighet(evt.target.checked)}
                                />
                            </Block>
                        )}
                    </Block>
                    {kanVelgeVarighet ? (
                        <VarighetValg {...props} />
                    ) : (
                        <BrukteUttaksdagerInfo dager={props.brukteUttaksdager} />
                    )}
                </>
            );
        }
        return (
            <Block margin="none">
                <Block>
                    <Select
                        label="Når skal perioden starte?"
                        onChange={(evt) => this.setEtterPeriodeTom(evt.target.value)}
                        value={
                            this.state.egendefinert
                                ? EgendefinertDatoValg
                                : this.state.etterPeriode
                                ? this.state.etterPeriode.id
                                : undefined
                        }>
                        <option key="">Velg tidspunkt</option>
                        {perioder.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.tidsperiode && `${formaterDatoTall(Uttaksdagen(p.tidsperiode.tom).neste())}`} - etter{' '}
                                {intl.formatMessage({ id: `periodetype.${p.type}` })} -{' '}
                                {omForeldre.antallForeldre === 2 && p.forelder === Forelder.mor
                                    ? omForeldre.mor.navn
                                    : omForeldre.farMedmor!.navn}
                            </option>
                        ))}
                        <option value={EgendefinertDatoValg}>Annen dato</option>
                    </Select>
                </Block>
                <Block visible={this.state.egendefinert || this.state.etterPeriode !== undefined} margin="s">
                    {this.state.etterPeriode !== undefined && (
                        <>
                            <Block>
                                <DatoValg {...props} startdatoErLåst={true} />
                            </Block>
                            <VarighetValg {...props} />
                            {gjenståendeDager !== undefined && gjenståendeDager > 0 && onVarighetChange && (
                                <div>
                                    <LinkButton onClick={() => onVarighetChange({ dager: gjenståendeDager })}>
                                        Bruk gjenstående dager
                                    </LinkButton>
                                </div>
                            )}
                        </>
                    )}
                    {this.state.egendefinert && (
                        <>
                            <Block margin="s">
                                <Veilederinfo>
                                    Når du plasserer en periode inne i planen, vil startdatoene forskyves for alle
                                    perioder etter den nye perioden
                                </Veilederinfo>
                            </Block>
                            <Block>
                                <DatoValg {...props} />
                            </Block>
                            <VarighetValg {...props} />
                        </>
                    )}
                </Block>
                <BrukteUttaksdagerInfo dager={props.brukteUttaksdager} />
            </Block>
        );
    }
}
export default injectIntl(VarighetMenyInnhold);
