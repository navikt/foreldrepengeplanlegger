import { pluralize } from 'app/utils';

const Tekst = {
	forelder1: 'Forelder 1',
	forelder2: 'Forelder 2',
	skjema: {
		labelForelder1: 'Forelder 1',
		labelForelder2: 'Forelder 2',
		labelTermindato: 'Termindato',
		labelDekningsgrad: (harForelder2: boolean) =>
			`Hvilken sats ønsker ${harForelder2 ? 'dere' : 'du'}?`,
		labelDekningsgrad80: (uker: number) => `80% foreldrepenger i ${uker} uker`,
		labelDekningsgrad100: (uker: number) =>
			`100% foreldrepenger i ${uker} uker`,
		fordelingFellespermisjon: `Hvordan vil dere fordele fellesperioden?`,
		fordelingFellespermisjonInfo: (uker: number) =>
			`I tillegg til fellesperioden har dere ${uker} uker hver.`,
		fordelingForelder1: (uker: number, navn?: string) =>
			`${navn || 'Forelder 1'}: ${uker} uker`,
		fordelingForelder2: (uker: number, navn?: string) =>
			`${navn || 'Forelder 2'}: ${uker} uker`,
		info: {
			dekningsgrad: `Luctus mauris est sit nunc vehicula. Aliquam lacus in. Donec integer odio. 
			Libero tincidunt arcu est eget pede. Arcu metus quisque in eget sociis.`,
			fordelingFellesperiode: `Libero tincidunt arcu est eget pede. Arcu metus quisque in eget sociis.`,
			utsettelse: `Luctus mauris est sit nunc vehicula. Aliquam lacus in. Donec integer odio.`
		}
	},
	uker: (uker: number) => `${uker} ${pluralize(uker, 'uke', 'uker')}`
};

export default Tekst;
