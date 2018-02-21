import * as React from 'react';
import { StonadskontoType } from 'app/types';
import {
	getForelderNavn,
	oppsummerPerioder
} from 'app/components/tidslinje/tidslinjeUtils';
import InnslagLayout from 'app/components/tidslinje/elementer/InnslagLayout';
import Tekst from 'app/tekst';

import { PeriodeinnslagProps } from '../Periodeinnslag';
import { separerTekstArray } from 'app/utils';

export const getStondskontoNavn = (konto: StonadskontoType) => {
	switch (konto) {
		case StonadskontoType.Fellesperiode:
			return 'fellespermisjon';
		case StonadskontoType.Fedrekvote:
			return 'fedrekvote';
		case StonadskontoType.Modrekvote:
			return 'mødrekvote';
		case StonadskontoType.ModrekvotePakrevd:
			return 'mødrekvotePåkrevd';
		case StonadskontoType.ForeldrepengerForFodsel:
			return 'foreldrepenger';
		default:
			return '';
	}
};

interface OwnProps {
	/** Default false. Om en skal vise fordeling av kvoter */
	visDetaljer?: boolean;
}

type Props = OwnProps & PeriodeinnslagProps;

const Periodeinfo: React.StatelessComponent<Props> = (props) => {
	const oppsummering = oppsummerPerioder(props.innslag);
	const detaljetekster: string[] = [];
	oppsummering.perioder.forEach((uker, key) => {
		detaljetekster.push(`${Tekst.uker(uker)} ${getStondskontoNavn(key)}`);
	});

	return (
		<InnslagLayout tidsperiode={oppsummering.tidsperiode}>
			{getForelderNavn(
				props.innslag.periode.forelder,
				props.navnForelder1,
				props.navnForelder2
			)}{' '}
			{props.visDetaljer ? (
				<span>
					starter sin permisjon: {Tekst.uker(oppsummering.ukerTotalt)} totalt{' '}
					oppdelt i {separerTekstArray(detaljetekster)}.
				</span>
			) : (
				'starter sin permisjon.'
			)}
		</InnslagLayout>
	);
};

export default Periodeinfo;
