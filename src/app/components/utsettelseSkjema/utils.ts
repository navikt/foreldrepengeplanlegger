import {
	UtsettelseArsakType,
	Forelder,
	Tidsperiode,
	Utsettelsesperiode,
	Permisjonsregler
} from 'app/types';
import { validerDato } from 'app/utils';
import { intlString } from 'app/intl/IntlTekst';
import { AppTekster } from 'app/intl/tekstnokler';
import {
	getUttaksdagerSomErFridager,
	getAntallUttaksdagerITidsperiode,
	getForsteUttaksdagForDato
} from 'app/utils/uttaksdagerUtils';
import {
	getAntallFeriedagerForForelder,
	getSisteMuligePermisjonsdag
} from 'app/utils/permisjonUtils';
import { isAfter, isBefore } from 'date-fns';

import { State as SkjemaState, Props as SkjemaProps } from './UtsettelseSkjema';
import { Valideringsfeil } from 'app/components/utsettelseSkjema/types';
import { erFridag } from 'app/utils/fridagerUtils';

export function getDefaultState(utsettelse?: Utsettelsesperiode): SkjemaState {
	return utsettelse
		? {
				valideringsfeil: new Map(),
				arsak: utsettelse.arsak,
				forelder: utsettelse.forelder,
				startdato: utsettelse.tidsperiode
					? utsettelse.tidsperiode.startdato
					: undefined,
				sluttdato: utsettelse.tidsperiode
					? utsettelse.tidsperiode.sluttdato
					: undefined
		  }
		: {
				valideringsfeil: new Map()
		  };
}

export function validerUtsettelseskjema(
	state: SkjemaState,
	props: SkjemaProps
): Valideringsfeil {
	const {
		termindato,
		tidsrom,
		permisjonsregler,
		registrerteUtsettelser,
		utsettelse,
		intl
	} = props;
	const { arsak, forelder, startdato, sluttdato } = state;
	const valideringsfeil: Valideringsfeil = new Map();
	const ugyldigeTidsrom = getUgyldigeTidsrom(
		registrerteUtsettelser,
		utsettelse
	);

	if (!startdato) {
		valideringsfeil.set('startdato', {
			feilmelding: intlString(intl, 'utsettelseskjema.feil.startdatoMangler')
		});
	} else {
		const datoValideringsfeil = validerDato(
			startdato,
			tidsrom,
			ugyldigeTidsrom,
			termindato
		);
		if (datoValideringsfeil) {
			valideringsfeil.set('startdato', {
				feilmelding: intlString(
					intl,
					`datovalidering.${datoValideringsfeil}` as AppTekster,
					{ datonavn: intlString(intl, 'startdato') }
				)
			});
		}
	}
	if (!sluttdato) {
		valideringsfeil.set('sluttdato', {
			feilmelding: intlString(intl, 'utsettelseskjema.feil.sluttdatoMangler')
		});
	} else {
		const datoValideringsfeil = validerDato(
			sluttdato,
			{
				...tidsrom,
				sluttdato: getTilTidsromSluttdato(
					termindato,
					permisjonsregler,
					startdato || tidsrom.startdato,
					registrerteUtsettelser
				)
			},
			ugyldigeTidsrom
		);
		if (datoValideringsfeil) {
			valideringsfeil.set('sluttdato', {
				feilmelding: intlString(
					intl,
					`datovalidering.${datoValideringsfeil}` as AppTekster,
					{ datonavn: intlString(intl, 'sluttdato') }
				)
			});
		} else if (startdato && isBefore(sluttdato, startdato)) {
			valideringsfeil.set('sluttdato', {
				feilmelding: intlString(
					intl,
					'utsettelseskjema.feil.sluttdatoEtterStartdato'
				)
			});
		}
	}
	if (
		arsak === UtsettelseArsakType.Ferie &&
		getAntallFeriedager(
			arsak,
			forelder,
			startdato,
			sluttdato,
			registrerteUtsettelser,
			utsettelse
		) > permisjonsregler.maksFeriedagerMedOverføring
	) {
		valideringsfeil.set('feriedager', {
			feilmelding: intlString(
				intl,
				'utsettelseskjema.feil.ugyldigAntallFeriedager'
			)
		});
	}
	let helligdagFeilErRegistrert = false;
	if (arsak === UtsettelseArsakType.Ferie && startdato && erFridag(startdato)) {
		helligdagFeilErRegistrert = true;
		valideringsfeil.set('startdato', {
			feilmelding: intlString(
				intl,
				'utsettelseskjema.feil.startdatoErHelligdag'
			)
		});
	}

	if (arsak === UtsettelseArsakType.Ferie && sluttdato && erFridag(sluttdato)) {
		helligdagFeilErRegistrert = true;
		valideringsfeil.set('sluttdato', {
			feilmelding: intlString(
				intl,
				'utsettelseskjema.feil.sluttdatoErHelligdag'
			)
		});
	}
	if (
		!helligdagFeilErRegistrert &&
		arsak === UtsettelseArsakType.Ferie &&
		startdato &&
		sluttdato &&
		getUttaksdagerSomErFridager({
			startdato: startdato,
			sluttdato: sluttdato
		}).length > 0
	) {
		valideringsfeil.set('tidsperiode', {
			feilmelding: intlString(intl, 'utsettelseskjema.feil.helligdagIPeriode')
		});
	}
	return valideringsfeil;
}

/**
 * Finner tidsrom som ikke kan velges gitt registrerte
 * utsettelser og aktiv utsettelse
 * @param registrerteUtsettelser
 * @param utsettelse
 */
export function getUgyldigeTidsrom(
	registrerteUtsettelser: Utsettelsesperiode[],
	utsettelse?: Utsettelsesperiode
): Tidsperiode[] | undefined {
	const ugyldigeTidsrom =
		registrerteUtsettelser &&
		registrerteUtsettelser
			.filter((u) => !utsettelse || utsettelse.id !== u.id)
			.map((u) => ({
				startdato: u.tidsperiode.startdato,
				sluttdato: u.tidsperiode.sluttdato
			}));
	return ugyldigeTidsrom;
}

/**
 * Finner siste gyldige sluttdato for en utsettelse
 * @param termindato
 * @param permisjonsregler
 * @param tilTidsromStartdato
 * @param registrerteUtsettelser
 */
export function getTilTidsromSluttdato(
	termindato: Date,
	permisjonsregler: Permisjonsregler,
	tilTidsromStartdato: Date,
	registrerteUtsettelser: Utsettelsesperiode[]
) {
	if (registrerteUtsettelser.length > 0) {
		const pafolgendeUtsettelser = registrerteUtsettelser.filter((u) =>
			isAfter(u.tidsperiode.startdato, tilTidsromStartdato)
		);
		if (pafolgendeUtsettelser.length > 0) {
			return getForsteUttaksdagForDato(
				pafolgendeUtsettelser[0].tidsperiode.startdato
			);
		}
	}
	return getSisteMuligePermisjonsdag(termindato, permisjonsregler);
}

/**
 * Henter ut antall feriedager som er registrert for en forelder, inkludert
 * ny utsettelse
 * @param arsak
 * @param forelder
 * @param startdato
 * @param sluttdato
 * @param registrerteUtsettelser
 * @param utsettelse
 */
export function getAntallFeriedager(
	arsak: UtsettelseArsakType | undefined,
	forelder: Forelder | undefined,
	startdato: Date | undefined,
	sluttdato: Date | undefined,
	registrerteUtsettelser: Utsettelsesperiode[],
	utsettelse: Utsettelsesperiode | undefined
) {
	let registrerteFeriedager = 0;
	let nyeFeriedager = 0;
	let feriedagerDenneUtsettelsen = 0;

	if (forelder && arsak === UtsettelseArsakType.Ferie) {
		registrerteFeriedager = getAntallFeriedagerForForelder(
			registrerteUtsettelser,
			forelder
		);
	}

	let fridager = 0;
	if (startdato && sluttdato) {
		const tidsperiode: Tidsperiode = {
			startdato,
			sluttdato
		};
		nyeFeriedager = getAntallUttaksdagerITidsperiode(tidsperiode);
		fridager = getUttaksdagerSomErFridager(tidsperiode).length;
	}

	if (utsettelse) {
		feriedagerDenneUtsettelsen = getAntallUttaksdagerITidsperiode(
			utsettelse.tidsperiode
		);
	}

	return (
		registrerteFeriedager +
		nyeFeriedager -
		feriedagerDenneUtsettelsen -
		fridager
	);
}
