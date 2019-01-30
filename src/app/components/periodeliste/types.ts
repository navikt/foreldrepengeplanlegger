import { Periode, OmForeldre } from '../../types';

export interface PeriodelisteBaseProps {
    perioder: Periode[];
    omForeldre: OmForeldre;
}

export interface PeriodelisteElementBaseProps {
    periode: Periode;
    omForeldre: OmForeldre;
}

export interface PeriodelisteActions {
    onAdd: (periode: Periode) => void;
    onUpdate: (periode: Periode) => void;
    onRemove: (periode: Periode) => void;
    onMove?: (periode: Periode, toIndex: number) => void;
}

export interface PeriodelisteFeatures {
    sortable?: boolean;
    lockable?: boolean;
}

export type PeriodelisteProps = PeriodelisteBaseProps & PeriodelisteActions & PeriodelisteFeatures;
export type PeriodelisteElementProps = PeriodelisteElementBaseProps & PeriodelisteActions & PeriodelisteFeatures;
