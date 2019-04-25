import { Periode, OmForeldre, Uttaksdatoer } from '../../types';
import { UttaksplanRegelTestresultat, RegelAvvik } from '../../utils/regler/types';

interface PeriodelisteBaseProps {
    perioder: Periode[];
    periodeFørTermin?: Periode;
    omForeldre: OmForeldre;
    familiehendelsesdato: Date;
    regelTestresultat: UttaksplanRegelTestresultat;
    disabled?: boolean;
}

interface PeriodelisteElementBaseProps {
    perioder: Periode[];
    periode: Periode;
    periodeFørTermin?: Periode;
    omForeldre: OmForeldre;
    typeErLåst?: boolean;
    forelderErLåst?: boolean;
    startdatoErLåst?: boolean;
    sluttdatoErLåst?: boolean;
    kanSlettes?: boolean;
    regelAvvik: RegelAvvik[] | undefined;
    disabled?: boolean;
}

interface PeriodelisteDatoer {
    uttaksdatoer: Uttaksdatoer;
}

export interface PeriodelisteActions {
    onAdd: (periode: Periode) => void;
    onUpdate: (periode: Periode) => void;
    onRemove: (periode: Periode) => void;
    onMove?: (periode: Periode, toIndex: number) => void;
    onResetPlan?: (resetØnsketFordeling?: boolean) => void;
    onSlåSammenPerioder?: (periode1: Periode, periode2: Periode) => void;
}

export interface PeriodelisteFeatures {
    sortable?: boolean;
    lockable?: boolean;
}

export type PeriodelisteProps = PeriodelisteBaseProps & PeriodelisteDatoer & PeriodelisteActions & PeriodelisteFeatures;

export type PeriodelisteElementProps = PeriodelisteElementBaseProps &
    PeriodelisteDatoer &
    PeriodelisteActions &
    PeriodelisteFeatures;
