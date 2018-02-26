import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Utsettelsesperiode } from 'app/types';
import {
	getForelderNavn,
	getArsakTekstKey
} from 'app/components/tidslinje/tidslinjeUtils';
import InnslagLayout from 'app/components/tidslinje/elementer/InnslagLayout';
import { getAntallUttaksdagerITidsperiode } from 'app/utils/uttaksdagerUtils';
import IntlTekst, { intlString } from 'app/intl/IntlTekst';
import { PeriodeinnslagProps } from '../Periodeinnslag';

const Utsettelsesinfo: React.StatelessComponent<
	PeriodeinnslagProps & InjectedIntlProps
> = (props) => {
	const { innslag, onRedigerUtsettelse } = props;
	const periode: Utsettelsesperiode = innslag.periode as Utsettelsesperiode;
	const dager = getAntallUttaksdagerITidsperiode(periode.tidsperiode);
	const navn = getForelderNavn(
		periode.forelder,
		props.navnForelder1,
		props.navnForelder2
	);
	const arsak = intlString(props.intl, getArsakTekstKey(periode.arsak));
	return (
		<InnslagLayout
			tidsperiode={innslag.periode.tidsperiode}
			onRediger={
				onRedigerUtsettelse ? () => onRedigerUtsettelse(periode) : undefined
			}>
			<IntlTekst
				id="tidslinje.utsettelse"
				values={{
					navn,
					arsak,
					dager
				}}
			/>
		</InnslagLayout>
	);
};

export default injectIntl(Utsettelsesinfo);
