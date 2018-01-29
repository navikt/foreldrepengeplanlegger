import * as React from 'react';
import { connect } from 'react-redux';

import { Row, Column } from 'nav-frontend-grid';
import { Input } from 'nav-frontend-skjema';

import DateInput from 'shared/components/dateInput/DateInput';
import RangeInput, { RangeInputValueLabelRendererOptions } from 'shared/components/rangeInput/RangeInput';
import TransformingRadioGroup from 'shared/components/transformingRadioGroup/TransformingRadioGroup';

import { DispatchProps, AppState, FormState, UtsettelseState } from 'app/redux/types';
import {
	setNavnForelder1,
	setNavnForelder2,
	setTermindato,
	setDekningsgrad,
	settAntallDagerMor
} from 'app/redux/actions';
import Tekst from 'app/tekst';
import { Dekningsgrad } from 'app/types';
import SkjemaInfotekst from 'app/components/skjemaInfotekst/SkjemaInfotekst';

export interface StateProps {
	form: FormState;
	utsettelse: UtsettelseState;
}

type Props = StateProps & DispatchProps;

const pluralize = (value: number, singular: string, plural: string): string => (value === 1 ? singular : plural);

const fordelingFellesperiodeLabelRenderer = (
	options: RangeInputValueLabelRendererOptions,
	navnForelder1: string,
	navnForelder2?: string
) => {
	const ukerForelder1 = options.value || 0;
	const ukerForelder2 = options.max - (options.value || 0);
	return (
		<div className="skjema_fordelingFellesperiode">
			<div className="skjema_fordelingFellesperiode__forelder1">
				<div className="skjema_fordelingFellesperiode__forelderNavn">{navnForelder1}</div>
				<div className="skjema_fordelingFellesperiode__uker">
					{ukerForelder1} {pluralize(ukerForelder1 || 0, 'uke', 'uker')}
				</div>
			</div>
			{navnForelder2 && (
				<div className="skjema_fordelingFellesperiode__forelder2">
					<div className="skjema_fordelingFellesperiode__forelderNavn">{navnForelder2}</div>
					<div className="skjema_fordelingFellesperiode__uker">
						{ukerForelder2} {pluralize(ukerForelder2, 'uke', 'uker')}
					</div>
				</div>
			)}
		</div>
	);
};

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
				<div className="blokk-m">
					<DateInput
						id="input-termindato"
						selectedDate={form.termindato}
						label={Tekst.skjema.labelTermindato}
						onChange={(dato) => dispatch(setTermindato(new Date(dato)))}
					/>
				</div>

				<div className="blokk-m">
					<SkjemaInfotekst id="info-dekningsgrad">{Tekst.skjema.info.dekningsgrad}</SkjemaInfotekst>
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
					<div className="blokk-s">
						<SkjemaInfotekst id="info-fordeling">{Tekst.skjema.info.fordelingFellesperiode}</SkjemaInfotekst>
						<RangeInput
							label={Tekst.skjema.fordelingFellespermisjon}
							value={form.ukerForelder1}
							min={0}
							max={form.ukerFellesperiode}
							onChange={(dager) => dispatch(settAntallDagerMor(dager))}
							valueLabelRenderer={(options) =>
								fordelingFellesperiodeLabelRenderer(options, form.navnForelder1 || 'Forelder 1', form.navnForelder2)
							}
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
