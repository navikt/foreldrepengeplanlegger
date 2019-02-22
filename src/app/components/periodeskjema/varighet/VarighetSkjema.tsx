import * as React from 'react';
import DatoInput from 'common/components/skjema/datoInput/DatoInput';
import { Checkbox } from 'nav-frontend-skjema';
import Block from 'common/components/block/Block';
import TabPanel from 'common/components/tabPanel/TabPanel';
import UkerOgDagerVelger from 'common/components/ukerOgDagerVelger/UkerOgDagerVelger';
import { getUkerOgDagerFromDager, formaterDato } from 'common/utils/datoUtils';
import { VarighetSkjemaType } from './VarighetMeny';
import { Tidsperiode } from 'nav-datovelger/src/datovelger/types';
import DropdownDialogTittel from '../../periodeliste/parts/DropdownDialogTittel';
import Varighet from '../../varighet/Varighet';
import { Periode } from '../../../types';
import { Periodene } from '../../../utils/Periodene';
import AlertStripe from 'nav-frontend-alertstriper';
import LinkButton from 'common/components/linkButton/LinkButton';

export interface VarighetChangeEvent {
    ingenVarighet?: boolean;
    dager?: number;
}

export interface VarighetSkjemaProps {
    tidsperiode: Partial<Tidsperiode>;
    minDato?: Date;
    maksDato?: Date;
    antallDager?: number;
    antallBrukteUttaksdager?: number;
    skjematype: VarighetSkjemaType;
    ingenVarighet?: boolean;
    perioder: Periode[];
    erNyPeriode: boolean;
    nesteUttaksdag: Date;
    onTidsperiodeChange: (tidsperiode: Partial<Tidsperiode>) => void;
    onVarighetChange: (evt: VarighetChangeEvent) => void;
}

type Props = VarighetSkjemaProps;

interface State {
    varighetEllerSluttdato: 'sluttdato' | 'varighet';
}

const getKonsekvensNyPeriodeInniPlan = (perioder: Periode[], dato: Date): React.ReactNode => {
    const berørtPeriode = Periodene(perioder).finnPeriodeMedDato(dato);
    if (berørtPeriode) {
        return (
            <AlertStripe type="info">
                Dager etter <strong>{formaterDato(dato)}</strong> vil bli forskjøvet tilsvarende varigheten på denne
                perioden
            </AlertStripe>
        );
    }
    return null;
};

const VarighetStartdato: React.StatelessComponent<Props> = ({
    onTidsperiodeChange,
    tidsperiode,
    minDato,
    maksDato
}) => {
    return (
        <>
            <DatoInput
                id="fom"
                name="fom"
                label="Når skal perioden starte?"
                visÅrValger={true}
                dato={tidsperiode.fom}
                avgrensninger={{ minDato, maksDato, helgedagerIkkeTillatt: true }}
                onChange={(dato) => onTidsperiodeChange({ fom: dato, tom: tidsperiode.tom })}
            />
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
            label="Når er siste dag i perioden?"
            visÅrValger={true}
            dato={tidsperiode.tom}
            avgrensninger={{ minDato: minDato || tidsperiode.fom, maksDato, helgedagerIkkeTillatt: true }}
            onChange={(dato) => onTidsperiodeChange({ tom: dato, fom: tidsperiode.fom })}
        />
    );
};

const VarighetStartdatoFørTermin: React.StatelessComponent<Props> = (props) => {
    const { ingenVarighet, onVarighetChange } = props;
    return (
        <div>
            <DropdownDialogTittel>Når ønsker du å starte uttaket før termin?</DropdownDialogTittel>
            <Block margin="xs">
                <VarighetStartdato {...props} />
            </Block>
            <Checkbox
                label="Jeg skal ikke ha uttak før termin"
                checked={ingenVarighet === true || false}
                onChange={(evt) => onVarighetChange({ ingenVarighet: evt.target.checked })}
            />
        </div>
    );
};

const BrukteUttaksdagerInfo: React.StatelessComponent<{ dager: number | undefined }> = ({ dager }) => {
    if (dager !== undefined && dager > 0) {
        return (
            <Block margin="xs">
                Perioden inneholder{' '}
                <strong>
                    <Varighet dager={dager} separator={' og '} />
                </strong>{' '}
                med foreldrepenger.
            </Block>
        );
    }
    return null;
};

class VarighetSkjema extends React.Component<Props, State> {
    render() {
        const {
            skjematype,
            onVarighetChange,
            antallDager,
            tidsperiode,
            onTidsperiodeChange,
            nesteUttaksdag,
            perioder,
            erNyPeriode
        } = this.props;
        const { uker, dager } = getUkerOgDagerFromDager(antallDager || 0);
        const { fom } = tidsperiode;
        switch (skjematype) {
            case 'foreldrepengerFørFødsel':
                return <VarighetStartdatoFørTermin {...this.props} />;
            default:
                return (
                    <div>
                        <DropdownDialogTittel>Velg tid</DropdownDialogTittel>
                        <Block>
                            <Block margin="xs">
                                <VarighetStartdato {...this.props} />
                            </Block>
                            {fom === undefined && (
                                <>
                                    <span className="comment">Hurtigvalg:</span>{' '}
                                    <LinkButton
                                        onClick={() =>
                                            onTidsperiodeChange({ fom: nesteUttaksdag, tom: tidsperiode.tom })
                                        }>
                                        Etter siste periode
                                    </LinkButton>
                                </>
                            )}
                            {fom && erNyPeriode && getKonsekvensNyPeriodeInniPlan(perioder, fom)}
                        </Block>
                        <Block visible={tidsperiode.fom !== undefined} margin="s">
                            <TabPanel
                                tabs={[
                                    {
                                        label: 'Sluttdato',
                                        contentRenderer: () => (
                                            <>
                                                <Block margin="s">
                                                    <VarighetSluttdato {...this.props} />
                                                </Block>
                                                <BrukteUttaksdagerInfo dager={this.props.antallBrukteUttaksdager} />
                                            </>
                                        )
                                    },
                                    {
                                        label: 'Varighet',
                                        contentRenderer: () => (
                                            <>
                                                <Block margin="s">
                                                    <UkerOgDagerVelger
                                                        tittel="Velg hvor lenge perioden skal vare?"
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
                                                {tidsperiode.tom && (
                                                    <Block margin="xs">
                                                        Siste dag blir <strong>{formaterDato(tidsperiode.tom)}</strong>.
                                                    </Block>
                                                )}
                                            </>
                                        )
                                    }
                                ]}
                            />
                        </Block>
                    </div>
                );
        }
    }
}

export default VarighetSkjema;
