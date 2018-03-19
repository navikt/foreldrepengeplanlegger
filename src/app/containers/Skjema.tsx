import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { addYears } from 'date-fns';

import { Row, Column } from 'nav-frontend-grid';
import { Input } from 'nav-frontend-skjema';
import DateInput from 'shared/components/dateInput/DateInput';
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
import { intlString } from 'app/intl/IntlTekst';
import SkjemaDekningsgrad from 'app/components/skjema//SkjemaDekningsgrad';
import SkjemaFordelingFellesperiode from 'app/components/skjema/SkjemaFordelingFellesperiode';
import EkspanderbartInnhold from 'shared/components/ekspanderbartInnhold/EkspanderbartInnhold';
import AktivitetskravInfo from 'app/components/content/AktivitetskravInfo';
import { renderDag } from 'app/utils/renderUtils';

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
								placeholder="Navn"
								onChange={(e: any) =>
									dispatch(setNavnForelder1(e.target.value))
								}
							/>
						</Column>
						<Column xs="6">
							<Input
								name="navnforelder2"
								label={intlString(intl, 'skjema.label.forelder2')}
								value={form.navnForelder2 || ''}
								placeholder="Navn"
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
						disableWeekends={false}
						initialMonth={new Date()}
						renderDay={renderDag}
						errorMessage={
							form.termindatoErUgyldig
								? intlString(intl, 'skjema.feilmelding.ugyldig_termindato')
								: undefined
						}
					/>
				</div>
				<EkspanderbartInnhold
					erApen={form.termindato !== undefined}
					animert={false}>
					<div className="blokk-m">
						<SkjemaDekningsgrad
							dekningsgrad={form.dekningsgrad}
							antallUkerTotalt80={form.permisjonsregler.antallUkerTotalt80}
							antallUkerTotalt100={form.permisjonsregler.antallUkerTotalt100}
							permisjonsregler={form.permisjonsregler}
							onChange={(dekningsgrad) =>
								dispatch(setDekningsgrad(dekningsgrad))
							}
						/>
					</div>
				</EkspanderbartInnhold>

				<EkspanderbartInnhold
					animert={false}
					erApen={form.dekningsgrad && form.termindato !== undefined}>
					<div className="blokk-s">
						<SkjemaFordelingFellesperiode
							navnForelder1={form.navnForelder1}
							navnForelder2={form.navnForelder2}
							ukerFellesperiode={form.ukerFellesperiode}
							ukerForelder1={form.fellesperiodeukerForelder1}
							onChange={(uker) => dispatch(settAntallDagerMor(uker))}
							introRenderer={() => (
								<AktivitetskravInfo
									permisjonsregler={form.permisjonsregler}
									navnForelder1={form.navnForelder1}
									navnForelder2={form.navnForelder2}
								/>
							)}
						/>
					</div>
				</EkspanderbartInnhold>
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

export default injectIntl(
	connect<StateProps, {}, InjectedIntlProps>(mapStateToProps)(Skjema)
);
