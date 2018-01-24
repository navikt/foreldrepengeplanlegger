import * as React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Column } from 'nav-frontend-grid';

import { Input, Radio, SkjemaGruppe } from 'nav-frontend-skjema';
import DateInput from 'shared/components/dateInput/DateInput';
import RangeInput from 'shared/components/rangeInput/RangeInput';

import { DispatchProps, AppState, FormState } from 'app/redux/types';
import {
	setNavnForelder1,
	setNavnForelder2,
	setTermindato,
	setDekningsgrad,
	settAntallDagerMor
} from 'app/redux/actions';
import Tekst from 'app/tekst';

export interface StateProps {
	form: FormState;
}

type Props = StateProps & DispatchProps;

class Skjema extends React.Component<Props> {
	render() {
		const { dispatch, form } = this.props;

		return (
			<div className="planlegger-skjema">
				<Container fluid={true} />
				<Row>
					<Column xs="12" md="6">
						<Input
							name="navnforelder1"
							label={Tekst.skjema.labelForelder1}
							value={form.navnForelder1}
							onChange={(e: any) => dispatch(setNavnForelder1(e.target.value))}
						/>
					</Column>
					<Column xs="12" md="6">
						<Input
							name="navnforelder2"
							label={Tekst.skjema.labelForelder1}
							value={form.navnForelder2}
							onChange={(e: any) => dispatch(setNavnForelder2(e.target.value))}
						/>
					</Column>
				</Row>
				<DateInput
					id="input-termindato"
					input={{ value: form.termindato }}
					label={Tekst.skjema.labelTermindato}
					onChange={(dato) => dispatch(setTermindato(new Date(dato)))}
				/>
				<SkjemaGruppe title={Tekst.skjema.labelDekningsgrad} className="skjemaelement">
					<Radio
						label={Tekst.skjema.labelDekningsgrad80(form.grunndata.antallUkerTotalt80)}
						checked={form.dekningsgrad === '80%'}
						name="sats"
						value="80%"
						onClick={() => dispatch(setDekningsgrad('80%'))}
					/>
					<Radio
						label={Tekst.skjema.labelDekningsgrad100(form.grunndata.antallUkerTotalt100)}
						checked={form.dekningsgrad === '100%'}
						name="sats"
						value="100%"
						onClick={() => dispatch(setDekningsgrad('100%'))}
					/>
				</SkjemaGruppe>

				{form.ukerFellesperiode && (
					<SkjemaGruppe title={Tekst.skjema.fordelingFellespermisjon(form.ukerFellesperiode)} className="skjemaelement">
						<RangeInput
							value={form.ukerForelder1}
							min={0}
							max={form.ukerFellesperiode}
							onChange={(dager) => dispatch(settAntallDagerMor(dager))}
							labelLeft={Tekst.skjema.fordelingForelder1(form.ukerForelder1 || 0, form.navnForelder1)}
							labelRight={Tekst.skjema.fordelingForelder2(form.ukerForelder2 || 0, form.navnForelder2)}
						/>
					</SkjemaGruppe>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state: AppState): StateProps => {
	return {
		form: state.form
	};
};

export default connect<StateProps, {}>(mapStateToProps)(Skjema);
