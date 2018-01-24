export default {
	skjema: {
		labelForelder1: 'Forelder 1',
		labelForelder2: 'Forelder 2',
		labelTermindato: 'Termindato',
		labelDekningsgrad: 'Hvilken sats ønsker du',
		labelDekningsgrad80: (uker: number) => `80% i (${uker} uker)`,
		labelDekningsgrad100: (uker: number) => `100% i (${uker} uker)`,
		fordelingFellespermisjon: (ukerFellesperiode: number) =>
			`Fordeling av fellespermisjonen (${ukerFellesperiode} uker)`,
		fordelingForelder1: 'Forelder 1',
		fordelingForelder2: 'Forelder 2'
	}
};
