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

export const separerTekstArray = (tekster: string[]): string => {
	const arr = [...tekster];
	const siste = arr.pop();
	return `${arr.join(', ')} og ${siste}`;
};
