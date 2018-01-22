import * as moment from 'moment';

export const isValidISODate = (isoDato: Date) => !!(isoDato && moment(isoDato, moment.ISO_8601).isValid());

export const dateToISODate = (dato: Date) => {
	const parsetDato = moment(dato);
	return dato && parsetDato.isValid() ? parsetDato.toISOString() : '';
};

export const ISODateToMaskedInput = (dato: Date) => {
	const parsetDato = moment(dato);
	return dato && parsetDato.isValid() ? parsetDato.format('DD.MM.YYYY') : '';
};

export const datePickerToISODate = (dato: Date) => {
	const parsetDato = moment.utc(dato, 'DD.MM.YYYY', true);
	return parsetDato.isValid() ? parsetDato.toISOString() : '';
};
