import * as React from 'react';
import { connect } from 'react-redux';

import { Row, Column } from 'nav-frontend-grid';
import { Input } from 'nav-frontend-skjema';

import DateInput from 'shared/components/dateInput/DateInput';
import Radioliste from 'shared/components/radioliste/Radioliste';

import {
	DispatchProps,
	AppState,
	FormState,
	UtsettelseState
} from 'app/redux/types';
import {
	setNavnForelder1,
	setNavnForelder2,
	setTermindato,
	setDekningsgrad,
	settAntallDagerMor
} from 'app/redux/actions';
import Tekst from 'app/tekst';
import { Dekningsgrad } from 'app/types';
import FordelingFellesperiodeRange from 'app/components/fordelingFellesperiodeRange/FordelingFellesperiodeRange';
import { grunnfordeling } from 'app/data/grunnfordeling';
import Infotekster from 'app/tekst/infotekster';
import VeilederinfoContainer from 'app/connectedComponents/VeilederinfoContainer';
import Sporsmal from 'app/elements/sporsmal/Sporsmal';

export interface StateProps {
	form: FormState;
	utsettelse: UtsettelseState;
}

type Props = StateProps & DispatchProps;

class Skjema extends React.Component<Props> {
	render() {
		const { dispatch, form } = this.props;

		return (
			<div className="planlegger-skjema">
				<div className="blokk-s">
					<Row>
						<Column xs="6">
							<Input
								name="navnforelder1"
								label={Tekst.skjema.labelForelder1}
								value={form.navnForelder1 || ''}
								onChange={(e: any) =>
									dispatch(setNavnForelder1(e.target.value))
								}
							/>
						</Column>
						<Column xs="6">
							<Input
								name="navnforelder2"
								label={Tekst.skjema.labelForelder2}
								value={form.navnForelder2 || ''}
								onChange={(e: any) =>
									dispatch(setNavnForelder2(e.target.value))
								}
							/>
						</Column>
					</Row>
				</div>
				<div className="blokk-m">
					<DateInput
						id="input-termindato"
						selectedDate={form.termindato}
						label={Tekst.skjema.labelTermindato}
						onChange={(dato) => dispatch(setTermindato(new Date(dato)))}
						disableWeekends={true}
					/>
				</div>

				<div className="blokk-m">
					<Radioliste
						inputnavn="dekningsgrad"
						tittel={
							<Sporsmal
								info={{ id: Infotekster.sats, label: 'Les mer om sats' }}>
								{Tekst.skjema.labelDekningsgrad(
									form.navnForelder2 ? form.navnForelder2 !== '' : false
								)}
							</Sporsmal>
						}
						beskrivelse={
							<VeilederinfoContainer id={Infotekster.sats} stil="info">
								Valget av antall uker gjelder dere begge. Den totale
								utbetalingen blir høyere ved å velge 100 prosent.
							</VeilederinfoContainer>
						}
						valgtVerdi={form.dekningsgrad}
						onChange={(value) =>
							dispatch(setDekningsgrad(value as Dekningsgrad))
						}
						stil="ekstern"
						kolonner="2"
						valg={[
							{
								tittel: Tekst.skjema.labelDekningsgrad80(
									form.grunnfordeling.antallUkerTotalt80
								),
								verdi: '80%'
							},
							{
								tittel: Tekst.skjema.labelDekningsgrad100(
									form.grunnfordeling.antallUkerTotalt100
								),
								verdi: '100%'
							}
						]}
					/>
				</div>

				{form.ukerFellesperiode &&
					form.dekningsgrad &&
					form.termindato && (
						<div className="blokk-s">
							<FordelingFellesperiodeRange
								navnForelder1={form.navnForelder1 || Tekst.forelder1}
								navnForelder2={form.navnForelder2 || Tekst.forelder2}
								ukerFellesperiode={form.ukerFellesperiode}
								ukerForelder1={form.fellesperiodeukerForelder1}
								ukerHver={grunnfordeling.antallUkerFedrekvote}
								onChange={(uker) => dispatch(settAntallDagerMor(uker))}
							/>
						</div>
					)}
			</div>
		);
	}
}

const mapStateToProps = (state: AppState): StateProps => {
	return {
		form: state.form,
		utsettelse: state.utsettelse
	};
};

export default connect<StateProps, {}>(mapStateToProps)(Skjema);
