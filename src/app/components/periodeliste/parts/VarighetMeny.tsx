import * as React from 'react';
import { UkerOgDager } from '../../../types';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import UkerOgDagerVelger from 'common/components/ukerOgDagerVelger/UkerOgDagerVelger';
import { Tidsperiode } from 'nav-datovelger';
import Varighet from '../../varighet/Varighet';
import Block from 'common/components/block/Block';
import FomTomValg from './FomTomValg';
import { Checkbox } from 'nav-frontend-skjema';
import DropdownForm from 'common/components/dropdownForm/DropdownForm';
import DagMndPeriode from 'common/components/dagMnd/DagMndPeriode';

export interface VarighetChangeEvent {
    ukerOgDager: UkerOgDager;
    ingenVarighet?: boolean;
    dager: number;
}

type VarighetVariant = 'foreldrepengerFørTermin' | 'låstStartdato' | 'kunFomTom';

interface OwnProps {
    uker: number;
    dager: number;
    førsteUttaksdag: Date;
    sisteUttaksdag: Date;
    fom?: Date;
    tom?: Date;
    startdatoErLåst?: boolean;
    sluttdatoErLåst?: boolean;
    ingenVarighet?: boolean;
    gradert?: boolean;
    minDager?: number;
    visLukkKnapp?: boolean;
    lukkAutomatisk?: boolean;
    onTidsperiodeChange: (tidsperiode: Tidsperiode) => void;
    onVarighetChange?: (evt: VarighetChangeEvent) => void;
}

type Props = OwnProps & InjectedIntlProps;

const VIS_DATO: boolean = true;

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

const VarighetValg: React.StatelessComponent<Props> = ({
    uker,
    dager,
    minDager,
    ingenVarighet,
    onVarighetChange,
    gradert
}) => {
    return onVarighetChange ? (
        <UkerOgDagerVelger
            // tittel={gradert ? 'Velg hvor mye foreldrepenger som skal brukes' : 'Velg variget'}
            tittel={'Velg varighet'}
            uker={uker}
            dager={dager}
            disabled={ingenVarighet}
            minDager={minDager}
            onChange={(ukerOgDager) =>
                onVarighetChange({ ukerOgDager, dager: ukerOgDager.uker * 5 + ukerOgDager.dager })
            }
        />
    ) : null;
};

const VarighetMenyInnhold: React.StatelessComponent<Props> = (props) => {
    const { uker, dager, onVarighetChange, ingenVarighet } = props;
    const variant = getVarighetVariant(props);
    if (variant === 'låstStartdato') {
        return (
            <>
                <Block>
                    <DatoValg {...props} />
                </Block>
                {onVarighetChange && (
                    <Block margin="xs">
                        <VarighetValg {...props} />
                    </Block>
                )}
            </>
        );
    } else if (variant === 'foreldrepengerFørTermin') {
        return (
            <>
                <Block animated={true} visible={ingenVarighet !== true}>
                    <Block>
                        <DatoValg {...props} />
                    </Block>
                    {onVarighetChange && (
                        <Block margin="xs">
                            <VarighetValg {...props} />
                        </Block>
                    )}
                </Block>
                {onVarighetChange && (
                    <Block>
                        <Checkbox
                            label="Jeg skal ikke ha uttak før termin"
                            checked={ingenVarighet === true || false}
                            onChange={(evt) =>
                                onVarighetChange({
                                    ukerOgDager: { uker, dager },
                                    ingenVarighet: evt.target.checked,
                                    dager: uker * 5 + dager
                                })
                            }
                        />
                    </Block>
                )}
            </>
        );
    }
    return (
        <Block margin="xs">
            <DatoValg {...props} />
        </Block>
    );
};

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
        // return 'Hvor lenge skal perioden vare?';
    }
};

const VarighetMenyLabel: React.StatelessComponent<Props> = (props) => {
    const { fom, tom, uker, dager, ingenVarighet } = props;
    if (!fom || !tom) {
        return <span>Velg tid</span>;
    }
    if (VIS_DATO) {
        return <DagMndPeriode fom={fom} tom={tom} />;
    } else {
        if (!fom || !tom) {
            return <span>Velg tid</span>;
        }
        return (
            <Block align="center" margin="none">
                <Varighet dager={ingenVarighet ? 0 : (uker * 5 + dager) | 0} layout="vertical" />
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
        if (this.props.fom && tidsperiode.tom !== undefined && this.props.tom === undefined && this.dropdown) {
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
