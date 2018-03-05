import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { getForelderNavn } from 'app/components/tidslinje/tidslinjeUtils';
import InnslagLayout from 'app/components/tidslinje/elementer/InnslagLayout';
import { PeriodeinnslagProps } from '../Periodeinnslag';
import { TidslinjeinnslagType } from 'app/components/tidslinje/types';
import { getForsteUttaksdagForDato } from 'app/utils/uttaksdagerUtils';

interface OwnProps {
	/** Default false. Om en skal vise fordeling av kvoter */
	visDetaljer?: boolean;
}

type Props = OwnProps & PeriodeinnslagProps;

const Periodeinfo: React.StatelessComponent<Props & InjectedIntlProps> = ({
	innslag,
	nesteInnslag,
	navnForelder1,
	navnForelder2
}) => {
	const navn = getForelderNavn(
		innslag.periode.forelder,
		navnForelder1,
		navnForelder2
	);
	let tidsperiode = { ...innslag.periode.tidsperiode };
	if (nesteInnslag) {
		tidsperiode.sluttdato = getForsteUttaksdagForDato(
			nesteInnslag.type === TidslinjeinnslagType.hendelse
				? nesteInnslag.dato
				: nesteInnslag.periode.tidsperiode.startdato
		);
	}

	return (
		<InnslagLayout tidsperiode={tidsperiode}>{navn} permisjon</InnslagLayout>
	);
};

export default injectIntl(Periodeinfo);
