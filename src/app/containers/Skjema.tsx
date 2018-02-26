import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { addYears } from 'date-fns';

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
import { Dekningsgrad } from 'app/types';
import FordelingFellesperiodeRange from 'app/components/fordelingFellesperiodeRange/FordelingFellesperiodeRange';
import Infotekster from 'app/tekst/infotekster';
import VeilederinfoContainer from 'app/connectedComponents/VeilederinfoContainer';
import Sporsmal from 'app/elements/sporsmal/Sporsmal';
import IntlTekst, { intlString } from 'app/intl/IntlTekst';

export interface StateProps {
	form: FormState;
	utsettelse: UtsettelseState;
}

type Props = StateProps & DispatchProps & InjectedIntlProps;

class Skjema extends React.Component<Props> {
	render() {
		const { dispatch, intl, form } = this.props;

		return (
			<div className="planlegger-skjema">
				<div className="blokk-s">
					<Row>
						<Column xs="6">
							<Input
								name="navnforelder1"
								label={intlString(intl, 'skjema.label.forelder1')}
								value={form.navnForelder1 || ''}
								onChange={(e: any) =>
									dispatch(setNavnForelder1(e.target.value))
								}
							/>
						</Column>
						<Column xs="6">
							<Input
								name="navnforelder2"
								label={intlString(intl, 'skjema.label.forelder1')}
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
						fromDate={addYears(new Date(), -1)}
						toDate={addYears(new Date(), 2)}
						selectedDate={form.termindato}
						label={intlString(intl, 'skjema.label.termindato')}
						onChange={(dato) => dispatch(setTermindato(new Date(dato)))}
						disableWeekends={true}
					/>
				</div>

				<div className="blokk-m">
					<Radioliste
						inputnavn="dekningsgrad"
						tittel={
							<Sporsmal
								info={{
									id: Infotekster.sats,
									label: intlString(intl, 'skjema.veiledning.sats.alttekst')
								}}>
								<IntlTekst id="skjema.label.sats" />
							</Sporsmal>
						}
						beskrivelse={
							<VeilederinfoContainer id={Infotekster.sats} stil="info">
								<IntlTekst id="skjema.veiledning.sats" />
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
								tittel: intlString(intl, 'skjema.label.sats80', {
									uker: form.permisjonsregler.antallUkerTotalt80
								}),
								verdi: '80%'
							},
							{
								tittel: intlString(intl, 'skjema.label.sats100', {
									uker: form.permisjonsregler.antallUkerTotalt100
								}),
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
								navnForelder1={
									form.navnForelder1 || intlString(intl, 'forelder1')
								}
								navnForelder2={
									form.navnForelder2 || intlString(intl, 'forelder2')
								}
								ukerFellesperiode={form.ukerFellesperiode}
								ukerForelder1={form.fellesperiodeukerForelder1}
								ukerModrekvote={form.permisjonsregler.antallUkerMødrekvote}
								ukerFedrekvote={form.permisjonsregler.antallUkerFedrekvote}
								ukerForTermin={
									form.permisjonsregler.antallUkerForelder1FørFødsel
								}
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

export default connect<StateProps, {}>(mapStateToProps)(injectIntl(Skjema));
