import * as React from 'react';
import { Utsettelsesperiode, UtsettelseArsakType } from 'app/types';
import { getForelderNavn } from 'app/components/tidslinje/tidslinjeUtils';
import InnslagLayout from 'app/components/tidslinje/elementer/InnslagLayout';

import { PeriodeinnslagProps } from '../Periodeinnslag';

const Utsettelsesinfo: React.StatelessComponent<PeriodeinnslagProps> = (
	props
) => {
	const { innslag } = props;
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
	return (
		<InnslagLayout tidsperiode={innslag.periode.tidsperiode}>
			{getForelderNavn(
				periode.forelder,
				props.navnForelder1,
				props.navnForelder2
			)}{' '}
			utsetter med {getArsakTekst(periode.arsak)}.
		</InnslagLayout>
	);
};

export default Utsettelsesinfo;
