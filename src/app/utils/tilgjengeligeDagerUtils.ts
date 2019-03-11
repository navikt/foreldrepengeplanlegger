import { TilgjengeligeDager } from '../types';

export const getProsentFordeling = (
    tilgjengeligeDager: TilgjengeligeDager,
    inkluderForeldrepengerFørTermin: boolean
): {
    pstMor: number;
    pstFelles: number;
    pstFarMedmor: number;
} => {
    const pstMultiplikator =
        100 / (inkluderForeldrepengerFørTermin ? tilgjengeligeDager.dagerTotalt : tilgjengeligeDager.dagerEtterTermin);

    const pstMor = Math.round(
        pstMultiplikator * tilgjengeligeDager.dagerMor +
            (inkluderForeldrepengerFørTermin ? tilgjengeligeDager.dagerForeldrepengerFørFødsel : 0)
    );
    const pstFarMedmor = Math.round(pstMultiplikator * tilgjengeligeDager.dagerFar);
    const pstFelles = 100 - pstMor - pstFarMedmor;

    return {
        pstMor,
        pstFarMedmor,
        pstFelles
    };
};