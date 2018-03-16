import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Utsettelsesperiode, UtsettelseArsakType } from 'app/types';
import {
	getForelderNavn,
	getArsakTekstKey
} from 'app/components/tidslinje/tidslinjeUtils';
import InnslagLayout from 'app/components/tidslinje/elementer/InnslagLayout';
import IntlTekst, { intlString } from 'app/intl/IntlTekst';
import { PeriodeinnslagProps } from '../Periodeinnslag';
import { getUttaksdagerSomErFridager } from 'app/utils/uttaksdagerUtils';

const Utsettelsesinfo: React.StatelessComponent<
	PeriodeinnslagProps & InjectedIntlProps
> = (props) => {
	const { innslag, onRedigerUtsettelse, intl } = props;
	const periode: Utsettelsesperiode = innslag.periode as Utsettelsesperiode;
	const navn = getForelderNavn(
		periode.forelder,
		props.navnForelder1,
		props.navnForelder2
	);

	const arsak = intlString(props.intl, getArsakTekstKey(periode.arsak));
	const feriedager =
		periode.arsak === UtsettelseArsakType.Ferie
			? getUttaksdagerSomErFridager(periode.tidsperiode)
			: [];
	let ekstrainfo = undefined;
	if (feriedager.length > 0) {
		ekstrainfo = {
			tekst: intlString(intl, 'tidslinje.ferie.fridager', {
				antallDager: feriedager.length
			})
		};
	}
	return (
		<InnslagLayout
			tidsperiode={innslag.periode.tidsperiode}
			trekkFraFeriedager={feriedager.length > 0}
			ekstrainfo={ekstrainfo}
			onRediger={
				onRedigerUtsettelse ? () => onRedigerUtsettelse(periode) : undefined
			}>
			<IntlTekst
				id="tidslinje.utsettelse"
				values={{
					navn,
					arsak
				}}
			/>
		</InnslagLayout>
	);
};

export default injectIntl(Utsettelsesinfo);
