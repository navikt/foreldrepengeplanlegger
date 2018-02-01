import * as React from 'react';
import { connect } from 'react-redux';

import Modal from 'nav-frontend-modal';

import UtsettelseSkjema from '../components/utsettelseSkjema/UtsettelseSkjema';
import { DispatchProps, AppState } from 'app/redux/types';
import { utsettelseLukkDialog, utsettelseVisDialog, opprettEllerOppdaterUtsettelse } from 'app/redux/actions';
import { Utsettelsesperiode } from 'app/types';
import LeggTilKnapp from 'app/components/leggTilKnapp/LeggTilKnapp';
import SkjemaInputElement from 'shared/components/skjemaInputElement/SkjemaInputElement';
import SkjemaInfotekst from 'app/components/skjemaInfotekst/SkjemaInfotekst';
import Tekst from 'app/tekst';

interface StateProps {
	isOpen: boolean;
	utsettelser: Utsettelsesperiode[];
	utsettelse?: Utsettelsesperiode;
	forelder1?: string;
	forelder2?: string;
}

type Props = StateProps & DispatchProps;

const UtsettelseDialog: React.StatelessComponent<Props> = (props: Props) => (
	<div>
		<SkjemaInfotekst id="info-dekningsgrad">{Tekst.skjema.info.utsettelse}</SkjemaInfotekst>
		<SkjemaInputElement label="Utsettelse av permisjonstiden">
			<LeggTilKnapp onClick={() => props.dispatch(utsettelseVisDialog())} />
		</SkjemaInputElement>
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
		utsettelser: state.utsettelse.utsettelser,
		utsettelse: state.utsettelse.valgtUtsettelse,
		forelder1: state.form.navnForelder1,
		forelder2: state.form.navnForelder2,
		isOpen: state.utsettelse.dialogErApen
	};
};

export default connect(mapStateToProps)(UtsettelseDialog);
