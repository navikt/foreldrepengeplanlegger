import { Periode } from '../../types';

export interface PeriodelisteBaseProps {
    perioder: Periode[];
}

export interface PeriodelisteElementBaseProps {
    periode: Periode;
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

export interface PeriodeElementProps extends PeriodelisteActions {
    periode: Periode;
}

export type PeriodelisteProps = PeriodelisteBaseProps & PeriodelisteActions & PeriodelisteFeatures;
export type PeriodelisteElementProps = PeriodeElementProps & PeriodelisteActions & PeriodelisteFeatures;
