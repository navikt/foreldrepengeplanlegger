import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Knapp } from 'nav-frontend-knapper';

import { Element } from 'nav-frontend-typografi';

import Skjema from './Skjema';
import {
	AppState,
	UtsettelseState,
	DispatchProps,
	FormState
} from 'app/redux/types';
import { tidslinjeFraPerioder } from 'app/selectors/tidslinjeSelector';
import UtsettelseDialog from 'app/containers/UtsettelseDialog';
import {
	Tidslinjeinnslag,
	TidslinjeinnslagType,
	InnslagPeriodetype
} from 'app/components/tidslinje/types';
import { utsettelseVisDialog, visTidslinje } from 'app/redux/actions';
import {
	Utsettelsesperiode,
	Tidsperiode,
	Periodetype,
	StonadskontoType
} from 'app/types';
import IntlTekst, { intlString } from 'app/intl/IntlTekst';
import { getGyldigTidsromForUtsettelse } from 'app/utils/permisjonUtils';
import Veilederinfo from 'app/elements/veilederinfo/Veilederinfo';
import UtvidetInformasjon from 'app/elements/utvidetInformasjon/UtvidetInformasjon';
import Permisjonsplan from 'app/containers/Permisjonsplan';
import UlonnetPermisjon from 'app/components/utsettelseSkjema/UlonnetPermisjon';

export interface StateProps {
	form: FormState;
	innslag: Tidslinjeinnslag[];
	utsettelse: UtsettelseState;
	visPermisjonsplan: boolean;
}

export type Props = StateProps &
	RouteComponentProps<{}> &
	DispatchProps &
	InjectedIntlProps;

export class Main extends React.Component<Props> {
	render() {
		const {
			form,
			utsettelse,
			innslag,
			visPermisjonsplan,
			dispatch,
			intl
		} = this.props;

		if (form.fellesperiodeukerForelder2 > 0) {
			const forsteForelder2Periode = innslag.find(
				(i) =>
					i.type === TidslinjeinnslagType.periode &&
					i.periode.type === Periodetype.Stonadsperiode &&
					i.periode.forelder === 'forelder2' &&
					i.periode.konto === StonadskontoType.Fellesperiode
			);
			if (forsteForelder2Periode) {
				(forsteForelder2Periode as InnslagPeriodetype).ekstrainfo = {
					tekst: intlString(intl, 'tidslinje.aktivitetskrav')
				};
			}
		}
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
					<div className="blokk-s">
						<Veilederinfo>
							<p>
								<IntlTekst id="veileder.forbehold.intro" />
							</p>
							<UtvidetInformasjon erApen={true}>
								<div className="blokkPad-s">
									<Element tag="h2">
										<IntlTekst id="veileder.forbehold.utvidetinfo.tittel" />
									</Element>
									<IntlTekst id="veileder.forbehold.utvidetinfo.html" />
								</div>
								<div className="blokkPad-s">
									<UlonnetPermisjon />
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
					{!this.props.visPermisjonsplan &&
						this.props.form.dekningsgrad &&
						this.props.form.termindato && (
							<div className="blokk-m no-print m-textCenter">
								<Knapp
									type="standard"
									onClick={() => dispatch(visTidslinje(true))}>
									<IntlTekst id="knapp.vispermisjonsplan" />
								</Knapp>
							</div>
						)}
				</section>

				{visPermisjonsplan && (
					<Permisjonsplan
						navnForelder1={navnForelder1}
						navnForelder2={navnForelder2}
						permisjonsregler={form.permisjonsregler}
						fellesperiodeukerForelder1={form.fellesperiodeukerForelder1}
						fellesperiodeukerForelder2={form.fellesperiodeukerForelder2}
						innslag={innslag}
						onRedigerUtsettelse={(u: Utsettelsesperiode) =>
							dispatch(utsettelseVisDialog(u))
						}
						onLeggTilUtsettelse={() => dispatch(utsettelseVisDialog())}
					/>
				)}

				{tidsromForUtsettelse && (
					<div>
						<UtsettelseDialog
							isOpen={utsettelse.dialogErApen}
							navnForelder1={navnForelder1}
							navnForelder2={navnForelder2}
							utsettelser={utsettelse.utsettelser}
							utsettelse={utsettelse.valgtUtsettelse}
							tidsrom={tidsromForUtsettelse}
							permisjonsregler={form.permisjonsregler}
						/>
					</div>
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
		visPermisjonsplan:
			innslag &&
			innslag.length > 0 &&
			state.form.dekningsgrad !== undefined &&
			state.form.termindato !== undefined &&
			state.view.visTidslinje === true
	};
};

export default connect(mapStateToProps)(withRouter(injectIntl(Main)));
