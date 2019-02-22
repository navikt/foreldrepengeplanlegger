import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Tidsperiode } from 'nav-datovelger';
import Varighet from '../../varighet/Varighet';
import Block from 'common/components/block/Block';
import DropdownForm, { DropdownFormStyle } from 'common/components/dropdownForm/DropdownForm';
import DagMndPeriode from 'common/components/dagMnd/DagMndPeriode';
import VarighetMenyInnhold from './VarighetMenyInnholdOld';
import { Periodetype, Periode, OmForeldre } from '../../../types';

export interface VarighetChangeEvent {
    ingenVarighet?: boolean;
    dager?: number;
}

const AUTOCLOSE_MENY = false;

type VarighetVariantOld = 'foreldrepengerFørTermin' | 'låstStartdato' | 'kunFomTom' | 'åpen' | 'nyPeriodePåSlutten';

export interface OwnProps {
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
    gradering: number | undefined;
    dropdownStyle?: DropdownFormStyle;
    periodetype: Periodetype | undefined;
    erNyPeriode: boolean;
    perioder: Periode[];
    periodeFørTermin?: Periode;
    omForeldre: OmForeldre;
    gjenståendeDager?: number;
    onTidsperiodeChange: (tidsperiode: Partial<Tidsperiode>) => void;
    onVarighetChange?: (evt: VarighetChangeEvent) => void;
}

export type VarighetMenyProps = OwnProps & InjectedIntlProps;

const VIS_DATO: boolean = true;

export const getVarighetVariant = (props: VarighetMenyProps): VarighetVariantOld => {
    const { sluttdatoErLåst, startdatoErLåst, onVarighetChange, periodetype, erNyPeriode } = props;
    if (startdatoErLåst === true && erNyPeriode === true) {
        return 'nyPeriodePåSlutten';
    } else if (startdatoErLåst === true && sluttdatoErLåst !== true) {
        return 'låstStartdato';
    } else if (onVarighetChange === undefined) {
        return 'kunFomTom';
    } else if (periodetype === Periodetype.UttakFørTermin) {
        return 'foreldrepengerFørTermin';
    }
    return 'åpen';
};

const getTittel = (variant: VarighetVariantOld): string => {
    switch (variant) {
        case 'foreldrepengerFørTermin':
            return 'Når ønsker du å starte uttaket før termin?';
        default:
        case 'kunFomTom':
            return 'Velg tid';
    }
};

const VarighetMenyLabel: React.StatelessComponent<VarighetMenyProps> = (props) => {
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

class VarighetMenyOld extends React.Component<VarighetMenyProps, {}> {
    dropdown: DropdownForm | null;
    constructor(props: VarighetMenyProps) {
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
        const { dropdownStyle = 'filled' } = this.props;
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
                style={dropdownStyle}
                dropdownPlacement="right"
            />
        );
    }
}

export default injectIntl(VarighetMenyOld);
