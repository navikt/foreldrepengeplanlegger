/**
 * Fjerner klokkeslett på dato
 */
export const normaliserDato = (dato: Date): Date =>
	new Date(dato.getFullYear(), dato.getMonth(), dato.getDate());

export const pluralize = (
	value: number,
	singular: string,
	plural: string
): string => (value === 1 ? singular : plural);
