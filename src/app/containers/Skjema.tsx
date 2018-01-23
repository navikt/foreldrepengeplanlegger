import * as React from 'react';
import { connect } from 'react-redux';

import { Input, Radio, SkjemaGruppe } from 'nav-frontend-skjema';
import DateInput from 'shared/components/dateInput/DateInput';
import RangeInput from 'shared/components/rangeInput/RangeInput';

import { AppState } from 'app/redux/reducers';
import { FormState } from 'app/redux/reducers/form';
import { DispatchProps } from 'app/redux/reduxTypes';
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
				<Input
					name="navnforelder1"
					label={Tekst.skjema.labelForelder1}
					value={form.navnForelder1}
					onChange={(e: any) => dispatch(setNavnForelder1(e.target.value))}
				/>
				<Input
					name="navnforelder2"
					label={Tekst.skjema.labelForelder1}
					value={form.navnForelder2}
					onChange={(e: any) => dispatch(setNavnForelder2(e.target.value))}
				/>
				<DateInput
					id="input-termindato"
					input={{ value: form.termindato }}
					label={Tekst.skjema.labelTermindato}
					onChange={(dato: Date) => dispatch(setTermindato(dato))}
				/>
				<SkjemaGruppe title={Tekst.skjema.labelDekningsgrad} className="skjemaelement">
					<Radio
						label={Tekst.skjema.labelDekningsgrad80(form.grunndata.antallUkerTotalt80)}
						selected={form.dekningsgrad === '80%'}
						name="sats"
						value="80%"
						onClick={() => dispatch(setDekningsgrad('80%'))}
					/>
					<Radio
						label={Tekst.skjema.labelDekningsgrad100(form.grunndata.antallUkerTotalt100)}
						selected={form.dekningsgrad === '100%'}
						name="sats"
						value="100%"
						onClick={() => dispatch(setDekningsgrad('100%'))}
					/>
				</SkjemaGruppe>

				<SkjemaGruppe title={Tekst.skjema.fordelingFellespermisjon(form.ukerFellesperiode)} className="skjemaelement">
					<RangeInput
						value={form.ukerForelder1}
						min={0}
						max={form.ukerFellesperiode}
						onChange={(dager) => dispatch(settAntallDagerMor(dager))}
						labelLeft={Tekst.skjema.fordelingForelder1}
						labelRight={Tekst.skjema.fordelingForelder2}
					/>
				</SkjemaGruppe>
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
