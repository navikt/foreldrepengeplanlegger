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
		const { form } = this.props;
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
						<div className="blokk-m">
							<Systemtittel>Deres tidslinje</Systemtittel>
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
