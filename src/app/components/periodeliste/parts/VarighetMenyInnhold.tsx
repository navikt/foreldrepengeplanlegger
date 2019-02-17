import * as React from 'react';
import { VarighetMenyProps, getVarighetVariant } from './VarighetMeny';
import Block from 'common/components/block/Block';
import { Checkbox } from 'nav-frontend-skjema';
import FomTomValg from './FomTomValg';
import { getUkerOgDagerFromDager } from 'common/utils/datoUtils';
import UkerOgDagerVelger from 'common/components/ukerOgDagerVelger/UkerOgDagerVelger';
import { Element } from 'nav-frontend-typografi';
import Varighet from '../../varighet/Varighet';
import Alertstriper from 'nav-frontend-alertstriper';
import RadioGroup from 'common/components/skjema/radioGroup/RadioGroup';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';

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

interface State {
    plassering: NyPeriodePlassering;
}

class VarighetMenyInnhold extends React.Component<VarighetMenyProps, State> {
    constructor(props: VarighetMenyProps) {
        super(props);
        this.state = {
            plassering: undefined
        };
    }
    render() {
        const props = this.props;
        const { onVarighetChange, ingenVarighet } = props;
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
                    <RadioGroup
                        name="plassering"
                        legend="Ønsker du å legge til ny periode inne i planen, eller på slutten?"
                        checked={this.state.plassering}
                        columns={2}
                        sameHeight={true}
                        onChange={(plassering) => this.setState({ plassering: plassering as NyPeriodePlassering })}
                        options={[
                            {
                                label: 'Inne i planen',
                                value: 'inni'
                            },
                            {
                                label: 'Etter siste periode',
                                value: 'etter'
                            }
                        ]}
                    />
                </Block>

                <Block visible={this.state.plassering !== undefined} margin="s">
                    {this.state.plassering === 'etter' && (
                        <>
                            <Block>
                                <DatoValg {...props} startdatoErLåst={true} />
                            </Block>
                            <VarighetValg {...props} />
                        </>
                    )}
                    {this.state.plassering === 'inni' && (
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
export default VarighetMenyInnhold;
