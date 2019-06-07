export interface FordelingForbrukDeltOmsorg {
    mor: {
        pstAvTotal: number;
        pstBrukt: number;
    };
    felles: {
        pstAvTotal: number;
        pstBruktMor: number;
        pstBruktFar: number;
        pstForMye: number;
    };
    farMedmor: {
        pstAvTotal: number;
        pstBrukt: number;
    };
}

export interface FordelingForbrukIkkeDeltOmsorg {
    pstBrukt: number;
    pstForMye?: number;
}

export type FordelingForbrukGrafData = FordelingForbrukDeltOmsorg | FordelingForbrukIkkeDeltOmsorg;
