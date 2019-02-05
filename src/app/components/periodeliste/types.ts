import { Periode, OmForeldre, Uttaksdatoer } from '../../types';

interface PeriodelisteBaseProps {
    perioder: Periode[];
    periodeFørTermin?: Periode;
    omForeldre: OmForeldre;
    familiehendelsesdato: Date;
}

interface PeriodelisteElementBaseProps {
    periode: Periode;
    omForeldre: OmForeldre;
    typeErLåst?: boolean;
    forelderErLåst?: boolean;
    startdatoErLåst?: boolean;
    sluttdatoErLåst?: boolean;
    slettErLåst?: boolean;
}

interface PeriodelisteDatoer {
    uttaksdatoer: Uttaksdatoer;
}

export interface PeriodelisteActions {
    onAdd: (periode: Periode) => void;
    onUpdate: (periode: Periode) => void;
    onRemove: (periode: Periode) => void;
    onMove?: (periode: Periode, toIndex: number) => void;
    onResetPlan?: () => void;
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
