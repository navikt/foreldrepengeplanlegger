import * as React from 'react';
import { StonadskontoType } from 'app/types';
import {
	getForelderNavn,
	oppsummeringPerioder
} from 'app/components/tidslinje/tidslinjeUtils';
import InnslagLayout from 'app/components/tidslinje/elementer/InnslagLayout';
import Tekst from 'app/tekst';

import { PeriodeinnslagProps } from '../Periodeinnslag';

export const getStondskontoNavn = (konto: StonadskontoType) => {
	switch (konto) {
		case StonadskontoType.Fellesperiode:
			return 'fellespermisjon';
		case StonadskontoType.Fedrekvote:
			return 'fedrekvote';
		case StonadskontoType.Modrekvote:
		case StonadskontoType.ForeldrepengerForFodsel:
			return 'mødrekvote';
		default:
			return '';
	}
};

const Periodeinfo: React.StatelessComponent<PeriodeinnslagProps> = (props) => {
	const { periode } = props.innslag;
	const oppsummering = oppsummeringPerioder(props.innslag);
	const detaljetekster: string[] = [];
	oppsummering.perioder.forEach((uker, key) => {
		detaljetekster.push(`${Tekst.uker(uker)} ${getStondskontoNavn(key)}`);
	});

	return (
		<InnslagLayout tidsperiode={props.innslag.periode.tidsperiode}>
			{getForelderNavn(
				periode.forelder,
				props.navnForelder1,
				props.navnForelder2
			)}{' '}
			starter sin permisjon: {Tekst.uker(oppsummering.ukerTotalt)} totalt{' '}
			oppdelt i{' '}
			{detaljetekster.join(detaljetekster.length === 2 ? ' og ' : ', ')}.
		</InnslagLayout>
	);
};

export default Periodeinfo;
