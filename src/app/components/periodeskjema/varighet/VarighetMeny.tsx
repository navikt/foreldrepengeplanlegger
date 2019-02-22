import * as React from 'react';
import DropdownForm, { DropdownFormStyle } from 'common/components/dropdownForm/DropdownForm';
import VarighetSkjema, { VarighetSkjemaProps } from './VarighetSkjema';
import DagMndPeriode from 'common/components/dagMnd/DagMndPeriode';

// export interface OwnProps {
//     dager?: number;
//     brukteUttaksdager?: number;
//     fom?: Date;
//     tom?: Date;
//     startdatoErLåst?: boolean;
//     sluttdatoErLåst?: boolean;
//     ingenVarighet?: boolean;
//     gradert?: boolean;
//     minDager?: number;
//     visLukkKnapp?: boolean;
//     lukkAutomatisk?: boolean;
//     førsteUttaksdag: Date;
//     sisteUttaksdag: Date;
//     forelderNavn?: string;
//     gradering: number | undefined;
//     dropdownStyle?: DropdownFormStyle;
//     periodetype: Periodetype | undefined;
//     erNyPeriode: boolean;
//     perioder: Periode[];
//     periodeFørTermin?: Periode;
//     omForeldre: OmForeldre;
//     gjenståendeDager?: number;
//     onTidsperiodeChange: (tidsperiode: Partial<Tidsperiode>) => void;
//     onVarighetChange?: (evt: VarighetChangeEvent) => void;
// }

export type VarighetSkjemaType = 'låstStartdato' | 'foreldrepengerFørFødsel' | 'åpen';

interface OwnProps {
    dropdownStyle: DropdownFormStyle;
    skjemaProps: VarighetSkjemaProps;
}

type Props = OwnProps;

const getVarighetLabel = (props: VarighetSkjemaProps): React.ReactNode => {
    const { tidsperiode, ingenVarighet } = props;
    const { fom, tom } = tidsperiode;
    if (!fom || !tom) {
        return <span>Velg tid</span>;
    }
    if (ingenVarighet) {
        return <span>-</span>;
    }
    return <DagMndPeriode fom={fom} tom={tom} />;
};

class VarighetMeny extends React.Component<Props, {}> {
    dropdown: DropdownForm | null;

    constructor(props: Props) {
        super(props);
    }

    render() {
        const { dropdownStyle = 'filled' } = this.props;
        return (
            <DropdownForm
                ref={(c) => (this.dropdown = c)}
                labelRenderer={() => getVarighetLabel(this.props.skjemaProps)}
                contentRenderer={() => <VarighetSkjema {...this.props.skjemaProps} />}
                labelAlignment="center"
                contentClassName="varighetDialog"
                style={dropdownStyle}
                dropdownPlacement="right"
                renderCloseButton={true}
            />
        );
    }
}

export default VarighetMeny;