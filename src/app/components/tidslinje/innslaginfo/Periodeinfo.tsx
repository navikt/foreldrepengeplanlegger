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

const Periodeinfo: React.StatelessComponent<PeriodeinnslagProps> = (props) => {
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
			starter sin permisjon: {Tekst.uker(oppsummering.ukerTotalt)} totalt{' '}
			oppdelt i {separerTekstArray(detaljetekster)}.
		</InnslagLayout>
	);
};

export default Periodeinfo;
