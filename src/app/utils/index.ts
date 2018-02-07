/**
 * Fjerner klokkeslett på dato
 */
export const normaliserDato = (dato: Date): Date => new Date(dato.getFullYear(), dato.getMonth(), dato.getDate());
