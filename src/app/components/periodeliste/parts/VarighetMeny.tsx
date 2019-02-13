import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import UkerOgDagerVelger from 'common/components/ukerOgDagerVelger/UkerOgDagerVelger';
import { Tidsperiode } from 'nav-datovelger';
import Varighet from '../../varighet/Varighet';
import Block from 'common/components/block/Block';
import FomTomValg from './FomTomValg';
import { Checkbox } from 'nav-frontend-skjema';
import DropdownForm from 'common/components/dropdownForm/DropdownForm';
import DagMndPeriode from 'common/components/dagMnd/DagMndPeriode';
import { getUkerOgDagerFromDager } from 'common/utils/datoUtils';
import Alertstriper from 'nav-frontend-alertstriper';
import { Element } from 'nav-frontend-typografi';

export interface VarighetChangeEvent {
    ingenVarighet?: boolean;
    dager?: number;
}

const AUTOCLOSE_MENY = false;

type VarighetVariant = 'foreldrepengerFørTermin' | 'låstStartdato' | 'kunFomTom';

interface OwnProps {
    dager?: number;
    brukteUttaksdager?: number;
    fom?: Date;
    tom?: Date;
    startdatoErLåst?: boolean;
    sluttdatoErLåst?: boolean;
    ingenVarighet?: boolean;
    gradert?: boolean;
    minDager?: number;
    visLukkKnapp?: boolean;
    lukkAutomatisk?: boolean;
    førsteUttaksdag: Date;
    sisteUttaksdag: Date;
    forelderNavn?: string;
    gradering?: number;
    onTidsperiodeChange: (tidsperiode: Tidsperiode) => void;
    onVarighetChange?: (evt: VarighetChangeEvent) => void;
}

type Props = OwnProps & InjectedIntlProps;

const VIS_DATO: boolean = true;

const getVarighetVariant = (props: Props): VarighetVariant => {
    const { sluttdatoErLåst, startdatoErLåst, onVarighetChange } = props;
    if (startdatoErLåst === true && sluttdatoErLåst !== true) {
        return 'låstStartdato';
    } else if (onVarighetChange === undefined) {
        return 'kunFomTom';
    }
    return 'foreldrepengerFørTermin';
};

const getTittel = (variant: VarighetVariant): string => {
    switch (variant) {
        case 'foreldrepengerFørTermin':
            return 'Når ønsker du å starte uttaket før termin?';
        default:
        case 'kunFomTom':
            return 'Velg når perioden skal starte og slutte';
    }
};

const DatoValg: React.StatelessComponent<Props> = (props) => {
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

const Footer: React.StatelessComponent<Props> = (props) => {
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

const VarighetValg: React.StatelessComponent<Props> = (props) => {
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

const VarighetMenyInnhold: React.StatelessComponent<Props> = (props) => {
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
        <Block margin="xs">
            <DatoValg {...props} />
            <BrukteUttaksdagerInfo dager={props.brukteUttaksdager} />
        </Block>
    );
};

const VarighetMenyLabel: React.StatelessComponent<Props> = (props) => {
    const { fom, tom, dager, ingenVarighet } = props;
    if (!fom || !tom) {
        return <span>Velg tid</span>;
    }
    if (ingenVarighet) {
        return <span>-</span>;
    }
    if (VIS_DATO) {
        return <DagMndPeriode fom={fom} tom={tom} />;
    } else {
        if (!fom || !tom) {
            return <span>Velg tid</span>;
        }
        return (
            <Block align="center" margin="none">
                <Varighet dager={ingenVarighet ? 0 : dager || 0} layout="vertical" />
            </Block>
        );
    }
};

class VarighetMeny extends React.Component<Props, {}> {
    dropdown: DropdownForm | null;
    constructor(props: Props) {
        super(props);
        this.handleTidsperiodeChange = this.handleTidsperiodeChange.bind(this);
    }
    handleTidsperiodeChange(tidsperiode: Tidsperiode) {
        this.props.onTidsperiodeChange(tidsperiode);
        if (
            AUTOCLOSE_MENY &&
            this.props.fom &&
            tidsperiode.tom !== undefined &&
            this.props.tom === undefined &&
            this.dropdown
        ) {
            this.dropdown.closeMenu();
        }
    }
    render() {
        const variant = getVarighetVariant(this.props);
        return (
            <DropdownForm
                ref={(c) => (this.dropdown = c)}
                labelRenderer={() => <VarighetMenyLabel {...this.props} />}
                contentRenderer={() => (
                    <VarighetMenyInnhold {...this.props} onTidsperiodeChange={this.handleTidsperiodeChange} />
                )}
                labelAlignment="center"
                contentClassName="varighetDialog"
                contentTitle={getTittel(variant)}
                renderCloseButton={this.props.visLukkKnapp}
                dropdownPlacement="right"
            />
        );
    }
}

export default injectIntl(VarighetMeny);
