import * as React from 'react';
import Modal from 'nav-frontend-modal';

import UtsettelseSkjema from '../components/utsettelseSkjema/UtsettelseSkjema';
import { DispatchProps, AppState } from 'app/redux/types';
import { utsettelseLukkDialog, utsettelseVisDialog, opprettEllerOppdaterUtsettelse } from 'app/redux/actions';
import { connect } from 'react-redux';

interface StateProps {
	isOpen: boolean;
	utsettelse?: {};
	forelder1?: string;
	forelder2?: string;
}

type Props = StateProps & DispatchProps;

const UtsettelseDialog: React.StatelessComponent<Props> = (props: Props) => (
	<div>
		<button onClick={() => props.dispatch(utsettelseVisDialog())}>Legg til utsettelse</button>
		<Modal
			isOpen={props.isOpen}
			contentLabel="Utsettelse"
			onRequestClose={() => props.dispatch(utsettelseLukkDialog())}
			className="utsettelseSkjemaDialog"
			children={
				props.isOpen && (
					<UtsettelseSkjema
						utsettelse={props.utsettelse}
						forelder1={props.forelder1}
						forelder2={props.forelder2}
						onChange={(utsettelse) => props.dispatch(opprettEllerOppdaterUtsettelse(utsettelse))}
					/>
				)
			}
		/>
	</div>
);

const mapStateToProps = (state: AppState): StateProps => {
	return {
		utsettelse: state.utsettelse,
		forelder1: state.form.navnForelder1,
		forelder2: state.form.navnForelder2,
		isOpen: state.utsettelse.dialogErApen
	};
};

export default connect(mapStateToProps)(UtsettelseDialog);
