import * as React from 'react';
import { connect } from 'react-redux';
import { Row, Column } from 'nav-frontend-grid';

import { Input, SkjemaGruppe } from 'nav-frontend-skjema';
import DateInput from 'shared/components/dateInput/DateInput';
import RangeInput from 'shared/components/rangeInput/RangeInput';
import TransformingRadioGroup from 'shared/components/transformingRadioGroup/TransformingRadioGroup';

import { DispatchProps, AppState, FormState } from 'app/redux/types';
import {
	setNavnForelder1,
	setNavnForelder2,
	setTermindato,
	setDekningsgrad,
	settAntallDagerMor
} from 'app/redux/actions';
import Tekst from 'app/tekst';
import { Dekningsgrad } from 'app/types';

export interface StateProps {
	form: FormState;
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
								value={form.navnForelder1}
								onChange={(e: any) => dispatch(setNavnForelder1(e.target.value))}
							/>
						</Column>
						<Column xs="6">
							<Input
								name="navnforelder2"
								label={Tekst.skjema.labelForelder2}
								value={form.navnForelder2}
								onChange={(e: any) => dispatch(setNavnForelder2(e.target.value))}
							/>
						</Column>
					</Row>
				</div>

				<div className="blokk-s">
					<DateInput
						id="input-termindato"
						selectedDate={form.termindato}
						label={Tekst.skjema.labelTermindato}
						onChange={(dato) => dispatch(setTermindato(new Date(dato)))}
					/>
				</div>

				<div className="blokk-s">
					<TransformingRadioGroup
						stage={{
							name: 'dekningsgrad',
							legend: Tekst.skjema.labelDekningsgrad(form.navnForelder2 ? form.navnForelder2 !== '' : false),
							values: [
								{
									label: Tekst.skjema.labelDekningsgrad80(form.grunndata.antallUkerTotalt80),
									value: '80%'
								},
								{
									label: Tekst.skjema.labelDekningsgrad100(form.grunndata.antallUkerTotalt100),
									value: '100%'
								}
							],
							selectedValue: form.dekningsgrad
						}}
						collapsed={!!form.dekningsgrad}
						expanded={form.dekningsgrad === undefined}
						onClickCollapsed={(value) => dispatch(setDekningsgrad(undefined))}
						onClickExpanded={(evt, value) => {
							dispatch(setDekningsgrad(value as Dekningsgrad));
						}}
					/>
				</div>

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
