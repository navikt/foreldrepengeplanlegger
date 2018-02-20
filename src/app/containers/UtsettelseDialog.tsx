import * as React from 'react';
import { connect } from 'react-redux';

import Modal from 'nav-frontend-modal';

import UtsettelseSkjema from '../components/utsettelseSkjema/UtsettelseSkjema';
import { DispatchProps, AppState } from 'app/redux/types';
import {
	utsettelseLukkDialog,
	utsettelseVisDialog,
	opprettEllerOppdaterUtsettelse,
	slettUtsettelse
} from 'app/redux/actions';
import { Utsettelsesperiode, Tidsperiode } from 'app/types';
import Periodeberegner from 'app/utils/Periodeberegner';
import { grunnfordeling } from 'app/data/grunnfordeling';
import { getForsteUttaksdagEtterDato } from 'app/utils/uttaksdagerUtils';
import { Element } from 'nav-frontend-typografi';
import LeggTilKnapp from 'app/elements/leggTilKnapp/LeggTilKnapp';

interface StateProps {
	isOpen: boolean;
	utsettelser: Utsettelsesperiode[];
	tidsrom: Tidsperiode;
	utsettelse?: Utsettelsesperiode;
	forelder1?: string;
	forelder2?: string;
}

type Props = StateProps & DispatchProps;

const UtsettelseDialog: React.StatelessComponent<Props> = (props: Props) => {
	return (
		<div>
			<div className="blokk-xs">
				<Element>Utsettelse av permisjonstiden</Element>
			</div>
			<LeggTilKnapp onClick={() => props.dispatch(utsettelseVisDialog())} />
			<Modal
				isOpen={props.isOpen}
				contentLabel="Utsettelse"
				onRequestClose={() => props.dispatch(utsettelseLukkDialog())}
				className="utsettelseSkjemaDialog"
				children={
					props.isOpen && (
						<UtsettelseSkjema
							registrerteUtsettelser={props.utsettelser}
							utsettelse={props.utsettelse}
							forelder1={props.forelder1}
							forelder2={props.forelder2}
							tidsrom={props.tidsrom}
							onChange={(utsettelse) =>
								props.dispatch(opprettEllerOppdaterUtsettelse(utsettelse))
							}
							onFjern={(utsettelse) =>
								props.dispatch(slettUtsettelse(utsettelse))
							}
						/>
					)
				}
			/>
		</div>
	);
};

const mapStateToProps = (state: AppState): StateProps => {
	const periodeberegner = Periodeberegner(
		state.form.termindato || new Date(),
		state.form.dekningsgrad || '100%',
		state.form.fellesperiodeukerForelder1,
		state.form.fellesperiodeukerForelder2,
		grunnfordeling
	);

	return {
		utsettelser: state.utsettelse.utsettelser,
		utsettelse: state.utsettelse.valgtUtsettelse,
		forelder1: state.form.navnForelder1,
		forelder2: state.form.navnForelder2,
		isOpen: state.utsettelse.dialogErApen,
		tidsrom: {
			startdato: getForsteUttaksdagEtterDato(
				periodeberegner.getModrekvotePostTermin().sluttdato
			),
			sluttdato: periodeberegner.getSistePermisjonsdag()
		}
	};
};

export default connect(mapStateToProps)(UtsettelseDialog);
