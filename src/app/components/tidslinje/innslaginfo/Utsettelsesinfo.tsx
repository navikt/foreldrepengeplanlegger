import * as React from 'react';
import { Utsettelsesperiode, UtsettelseArsakType } from 'app/types';
import { getForelderNavn } from 'app/components/tidslinje/tidslinjeUtils';
import InnslagLayout from 'app/components/tidslinje/elementer/InnslagLayout';
import { PeriodeinnslagProps } from '../Periodeinnslag';
import { getAntallUttaksdagerITidsperiode } from 'app/utils/uttaksdagerUtils';
import { pluralize } from 'app/utils';

const Utsettelsesinfo: React.StatelessComponent<PeriodeinnslagProps> = (
	props
) => {
	const { innslag, onRedigerUtsettelse } = props;
	const periode: Utsettelsesperiode = innslag.periode as Utsettelsesperiode;
	const getArsakTekst = (arsak: UtsettelseArsakType) => {
		switch (arsak) {
			case UtsettelseArsakType.Arbeid:
				return 'arbeid';
			case UtsettelseArsakType.Ferie:
				return 'ferie';
			case UtsettelseArsakType.Sykdom:
				return 'sykdom';
			default:
				return '';
		}
	};
	const dager = getAntallUttaksdagerITidsperiode(periode.tidsperiode);
	return (
		<InnslagLayout
			tidsperiode={innslag.periode.tidsperiode}
			onRediger={
				onRedigerUtsettelse ? () => onRedigerUtsettelse(periode) : undefined
			}>
			{getForelderNavn(
				periode.forelder,
				props.navnForelder1,
				props.navnForelder2
			)}{' '}
			utsetter permisjonen med {getArsakTekst(periode.arsak)} i{' '}
			{`${dager} ${pluralize(dager, 'dag', 'dager')}`}
		</InnslagLayout>
	);
};

export default Utsettelsesinfo;
