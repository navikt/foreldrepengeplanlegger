import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';

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
import { utsettelseVisDialog } from 'app/redux/actions';
import { Utsettelsesperiode } from 'app/types';
import Veileder from 'app/components/veileder/Veileder';
import { Systemtittel } from 'nav-frontend-typografi';
import Permisjonsoppsummering from 'app/components/permisjonsoppsummering/Permisjonsoppsummering';
import { grunnfordeling } from 'app/data/grunnfordeling';
import Tekst from 'app/tekst';

export interface StateProps {
	form: FormState;
	innslag: Tidslinjeinnslag[];
	utsettelse: UtsettelseState;
	visTidslinjeOgUtsettelse: boolean;
}

export type Props = StateProps & RouteComponentProps<{}> & DispatchProps;

export class Uttaksplan extends React.Component<Props> {
	render() {
		return (
			<div>
				<div className="introtekst">
					<div className="introtekst__veileder">
						<Veileder ansikt="glad" farge="lilla" className="veilederSvg" />
					</div>
					<p>
						Hei, hver forelder har rett på 10 uker permisjon hver. I tillegg har
						dere enten 36 eller 26 uker dere kan fordele mellom dere basert på
						den totale permisjonslengden dere velger, som er 59 uker eller 49
						uker.
					</p>
				</div>

				<section>
					<h2 className="sr-only">Fyll ut skjema og se din permisjonsplan</h2>
					<div className="blokk-m no-print">
						<Skjema />
					</div>

					{this.props.visTidslinjeOgUtsettelse && (
						<div className="blokk-l no-print">
							<UtsettelseDialog />
						</div>
					)}
				</section>

				{this.props.visTidslinjeOgUtsettelse && (
					<section className="tidsplan">
						<div className="blokk-s">
							<Systemtittel>Deres tidslinje</Systemtittel>
						</div>
						<div className="blokk-m">
							<Permisjonsoppsummering
								foreldrepengerMor={grunnfordeling.antallUkerForelder1ForFodsel}
								modrekvote={grunnfordeling.antallUkerModrekvote}
								fedrekvote={grunnfordeling.antallUkerFedrekvote}
								fellesukerForelder1={this.props.form.fellesperiodeukerForelder1}
								fellesukerForelder2={this.props.form.fellesperiodeukerForelder2}
								navnForelder1={this.props.form.navnForelder1 || Tekst.forelder1}
								navnForelder2={this.props.form.navnForelder2 || Tekst.forelder2}
							/>
						</div>
						<h3 className="sr-only">Tidslinjen</h3>
						<Tidslinje
							innslag={this.props.innslag}
							navnForelder1={this.props.form.navnForelder1 || Tekst.forelder1}
							navnForelder2={this.props.form.navnForelder2 || Tekst.forelder2}
							onRedigerUtsettelse={(utsettelse: Utsettelsesperiode) =>
								this.props.dispatch(utsettelseVisDialog(utsettelse))
							}
						/>
					</section>
				)}
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

export default connect(mapStateToProps)(withRouter(Uttaksplan));
