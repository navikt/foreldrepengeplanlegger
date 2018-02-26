import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import {
	getForelderNavn,
	oppsummerPerioder,
	getStondskontoTekstKey
} from 'app/components/tidslinje/tidslinjeUtils';
import InnslagLayout from 'app/components/tidslinje/elementer/InnslagLayout';
import { separerTekstArray } from 'app/utils';
import { intlString } from 'app/intl/IntlTekst';
import { PeriodeinnslagProps } from '../Periodeinnslag';

interface OwnProps {
	/** Default false. Om en skal vise fordeling av kvoter */
	visDetaljer?: boolean;
}

type Props = OwnProps & PeriodeinnslagProps;

const Periodeinfo: React.StatelessComponent<Props & InjectedIntlProps> = (
	props
) => {
	const oppsummering = oppsummerPerioder(props.innslag);
	const navn = getForelderNavn(
		props.innslag.periode.forelder,
		props.navnForelder1,
		props.navnForelder2
	);

	if (props.visDetaljer) {
		const detaljetekster: string[] = [];
		oppsummering.perioder.forEach((uker, key) => {
			detaljetekster.push(
				intlString(props.intl, 'tidslinje.periodeinfo.konto.uker', {
					uker,
					konto: intlString(props.intl, getStondskontoTekstKey(key))
				})
			);
		});
		return (
			<InnslagLayout tidsperiode={oppsummering.tidsperiode}>
				{intlString(
					props.intl,
					'tidslinje.periodeinfo.starterpermisjon.detaljert',
					{
						navn,
						uker: oppsummering.ukerTotalt,
						detaljer: separerTekstArray(detaljetekster)
					}
				)}
			</InnslagLayout>
		);
	}

	return (
		<InnslagLayout tidsperiode={oppsummering.tidsperiode}>
			{intlString(props.intl, 'tidslinje.periodeinfo.starterpermisjon.enkel', {
				navn
			})}
		</InnslagLayout>
	);
};

export default injectIntl(Periodeinfo);
