import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { Element } from 'nav-frontend-typografi';

import Tidslinje from 'app/components/tidslinje/Tidslinje';
import Skjema from './Skjema';
import {
	AppState,
	UtsettelseState,
	DispatchProps,
	FormState
} from 'app/redux/types';
import { tidslinjeFraPerioder } from 'app/selectors/tidslinjeSelector';
import UtsettelseDialog from 'app/containers/UtsettelseDialog';
import { Tidslinjeinnslag } from 'app/components/tidslinje/types';
import {
	utsettelseVisDialog,
	ubetaltPermisjonVisDialog
} from 'app/redux/actions';
import { Utsettelsesperiode } from 'app/types';
import { Systemtittel } from 'nav-frontend-typografi';
import Permisjonsoppsummering from 'app/components/permisjonsoppsummering/Permisjonsoppsummering';
import Tekst from 'app/tekst';
import UbetaltPermisjonDialog from 'app/containers/UbetaltPermisjonDialog';
import IntlTekst from 'app/intl/IntlTekst';
import LeggTilKnapp from 'app/elements/leggTilKnapp/LeggTilKnapp';

export interface StateProps {
	form: FormState;
	innslag: Tidslinjeinnslag[];
	utsettelse: UtsettelseState;
	visTidslinjeOgUtsettelse: boolean;
}

export type Props = StateProps & RouteComponentProps<{}> & DispatchProps;

export class Main extends React.Component<Props> {
	render() {
		const { form } = this.props;
		return (
			<div>
				<div className="introtekst">
					<p>
						<IntlTekst id="tittel.introtekst" />
					</p>
				</div>

				<section>
					<h2 className="sr-only">Fyll ut skjema og se din permisjonsplan</h2>
					<div className="blokk-m no-print">
						<Skjema />
					</div>

					{this.props.visTidslinjeOgUtsettelse && (
						<div className="no-print blokk-l">
							<div className="blokk-xs">
								<Element>Ubetalt permisjon</Element>
							</div>
							<div className="blokk-xxs">
								<div className="knapperekke">
									<LeggTilKnapp
										onClick={() => this.props.dispatch(utsettelseVisDialog())}>
										Legg til ferie eller arbeid
									</LeggTilKnapp>
									<LeggTilKnapp
										onClick={() =>
											this.props.dispatch(ubetaltPermisjonVisDialog())
										}>
										Legg til ulønnet permisjon
									</LeggTilKnapp>
								</div>
							</div>
						</div>
					)}
				</section>

				{this.props.visTidslinjeOgUtsettelse && (
					<section className="tidsplan">
						<div className="blokk-m">
							<Systemtittel>Planen deres</Systemtittel>
						</div>
						<div className="blokk-m">
							<Tidslinje
								innslag={this.props.innslag}
								navnForelder1={form.navnForelder1 || Tekst.forelder1}
								navnForelder2={form.navnForelder2 || Tekst.forelder2}
								onRedigerUtsettelse={(utsettelse: Utsettelsesperiode) =>
									this.props.dispatch(utsettelseVisDialog(utsettelse))
								}
							/>
						</div>
						<h3 className="sr-only">Fordeling av permisjon oppsummert</h3>
						<Permisjonsoppsummering
							foreldrepengerMor={
								form.grunnfordeling.antallUkerForelder1ForFodsel
							}
							modrekvote={form.grunnfordeling.antallUkerModrekvote}
							fedrekvote={form.grunnfordeling.antallUkerFedrekvote}
							fellesukerForelder1={form.fellesperiodeukerForelder1}
							fellesukerForelder2={form.fellesperiodeukerForelder2}
							navnForelder1={form.navnForelder1 || Tekst.forelder1}
							navnForelder2={form.navnForelder2 || Tekst.forelder2}
						/>
					</section>
				)}
				<UtsettelseDialog />
				<UbetaltPermisjonDialog />
			</div>
		);
	}
}

const mapStateToProps = (state: AppState): StateProps => {
	const innslag = tidslinjeFraPerioder(state);
	return {
		innslag,
		form: state.form,
		utsettelse: state.utsettelse,
		visTidslinjeOgUtsettelse:
			innslag &&
			innslag.length > 0 &&
			state.form.dekningsgrad !== undefined &&
			state.form.termindato !== undefined
	};
};

export default connect(mapStateToProps)(withRouter(Main));