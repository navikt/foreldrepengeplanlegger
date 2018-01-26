export default {
	skjema: {
		labelForelder1: 'Forelder 1',
		labelForelder2: 'Forelder 2',
		labelTermindato: 'Termindato',
		labelDekningsgrad: (harForelder2: boolean) => `Hvilken sats ønsker ${harForelder2 ? 'dere' : 'du'}?`,
		labelDekningsgrad80: (uker: number) => `80% i (${uker} uker)`,
		labelDekningsgrad100: (uker: number) => `100% i (${uker} uker)`,
		fordelingFellespermisjon: (ukerFellesperiode: number) =>
			`Fordeling av fellespermisjonen (${ukerFellesperiode} uker)`,
		fordelingForelder1: (uker: number, navn?: string) => `${navn || 'Forelder 1'}: ${uker} uker`,
		fordelingForelder2: (uker: number, navn?: string) => `${navn || 'Forelder 2'}: ${uker} uker`
	}
};
