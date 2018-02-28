import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import { Element, Ingress, Systemtittel } from 'nav-frontend-typografi';

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
import { Utsettelsesperiode, Tidsperiode } from 'app/types';
import Permisjonsoppsummering from 'app/components/permisjonsoppsummering/Permisjonsoppsummering';
import IntlTekst, { intlString } from 'app/intl/IntlTekst';
import LeggTilKnapp from 'app/elements/leggTilKnapp/LeggTilKnapp';
import { getGyldigTidsromForUtsettelse } from 'app/utils/permisjonUtils';
import Veilederinfo from 'app/elements/veilederinfo/Veilederinfo';
import UtvidetInformasjon from 'app/elements/utvidetInformasjon/UtvidetInformasjon';
import EkspanderbartInnhold from 'shared/components/ekspanderbartInnhold/EkspanderbartInnhold';

export interface StateProps {
	form: FormState;
	innslag: Tidslinjeinnslag[];
	utsettelse: UtsettelseState;
	visTidslinjeOgUtsettelse: boolean;
}

export type Props = StateProps &
	RouteComponentProps<{}> &
	DispatchProps &
	InjectedIntlProps;

export class Main extends React.Component<Props> {
	render() {
		const { form, utsettelse, dispatch, intl } = this.props;
		const tidsromForUtsettelse: Tidsperiode | undefined =
			form.termindato && form.dekningsgrad
				? getGyldigTidsromForUtsettelse(
						form.termindato,
						form.dekningsgrad,
						form.permisjonsregler
				  )
				: undefined;

		const navnForelder1 = form.navnForelder1 || intlString(intl, 'forelder1');
		const navnForelder2 = form.navnForelder2 || intlString(intl, 'forelder2');

		return (
			<div>
				<div className="introtekst">
					<h1 className="m-textCenter applikasjonstittel blokk-m">
						<IntlTekst id="applikasjonstittel" />
					</h1>
					<Ingress className="blokk-m m-textCenter">
						<IntlTekst id="tittel.introtekst" />
					</Ingress>
					<div className="blokk-s">
						<Veilederinfo>
							<p>
								<IntlTekst id="veileder.forbehold.intro" />
							</p>
							<UtvidetInformasjon>
								<div className="blokkPad-s">
									<Element tag="h2">
										<IntlTekst id="veileder.forbehold.utvidetinfo.tittel" />
									</Element>
									<IntlTekst id="veileder.forbehold.utvidetinfo.html" />
								</div>
							</UtvidetInformasjon>
						</Veilederinfo>
					</div>
				</div>

				<section>
					<h2 className="sr-only">
						<IntlTekst id="skjermleser.skjema.tittel" />
					</h2>
					<div className="blokk-m no-print">
						<Skjema />
					</div>

					<EkspanderbartInnhold erApen={this.props.visTidslinjeOgUtsettelse}>
						<div className="no-print blokkPad-l">
							<div className="blokk-xs">
								<Element>
									<IntlTekst id="opphold.tittel" />
								</Element>
							</div>
							<div className="blokk-s">
								<LeggTilKnapp onClick={() => dispatch(utsettelseVisDialog())}>
									<IntlTekst id="opphold.knapp.leggtil" />
								</LeggTilKnapp>
							</div>
							<div className="blokk-s">
								<Veilederinfo>
									<Element className="blokk-xxxs">
										<IntlTekst id="veileder.ulonnetpermisjon.tittel" />
									</Element>
									<p>
										<IntlTekst id="veileder.ulonnetpermisjon.intro.html" />
									</p>
									<UtvidetInformasjon>
										<div className="blokkPad-s">
											<IntlTekst id="veileder.ulonnetpermisjon.utvidetinfo" />
										</div>
									</UtvidetInformasjon>
								</Veilederinfo>
							</div>
						</div>
					</EkspanderbartInnhold>
				</section>

				<EkspanderbartInnhold erApen={this.props.visTidslinjeOgUtsettelse}>
					<section className="tidsplan">
						<div className="blokk-m">
							<Systemtittel>
								<IntlTekst id="tidslinje.tittel" />
							</Systemtittel>
						</div>
						<div className="blokk-m">
							<Tidslinje
								innslag={this.props.innslag}
								navnForelder1={navnForelder1}
								navnForelder2={navnForelder1}
								onRedigerUtsettelse={(u: Utsettelsesperiode) =>
									dispatch(utsettelseVisDialog(u))
								}
							/>
						</div>
						<h3 className="sr-only">
							<IntlTekst id="skjermleser.tidslinje.oppsummering.tittel" />
						</h3>
						<Permisjonsoppsummering
							foreldrepengerMor={
								form.permisjonsregler.antallUkerForelder1FørFødsel
							}
							modrekvote={form.permisjonsregler.antallUkerMødrekvote}
							fedrekvote={form.permisjonsregler.antallUkerFedrekvote}
							fellesukerForelder1={form.fellesperiodeukerForelder1}
							fellesukerForelder2={form.fellesperiodeukerForelder2}
							navnForelder1={navnForelder1}
							navnForelder2={navnForelder1}
						/>
					</section>
				</EkspanderbartInnhold>
				{tidsromForUtsettelse && (
					<UtsettelseDialog
						isOpen={utsettelse.dialogErApen}
						navnForelder1={navnForelder1}
						navnForelder2={navnForelder2}
						utsettelser={utsettelse.utsettelser}
						utsettelse={utsettelse.valgtUtsettelse}
						tidsrom={tidsromForUtsettelse}
						permisjonsregler={form.permisjonsregler}
					/>
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

export default connect(mapStateToProps)(withRouter(injectIntl(Main)));
