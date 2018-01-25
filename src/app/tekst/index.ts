export default {
	skjema: {
		labelForelder1: 'Navn forelder 1',
		labelForelder2: 'Navn forelder 2',
		labelTermindato: 'Termindato',
		labelDekningsgrad: 'Hvilken sats ønsker du',
		labelDekningsgrad80: (uker: number) => `80% i (${uker} uker)`,
		labelDekningsgrad100: (uker: number) => `100% i (${uker} uker)`,
		fordelingFellespermisjon: (ukerFellesperiode: number) =>
			`Fordeling av fellespermisjonen (${ukerFellesperiode} uker)`,
		fordelingForelder1: (uker: number, navn?: string) => `${navn || 'Forelder 1'}: ${uker} uker`,
		fordelingForelder2: (uker: number, navn?: string) => `${navn || 'Forelder 2'}: ${uker} uker`
	}
};
