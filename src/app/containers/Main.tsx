import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Knapp } from 'nav-frontend-knapper';
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
	StonadskontoType,
	Spraak
} from 'app/types';
import IntlTekst, { intlString } from 'app/intl/IntlTekst';
import { getGyldigTidsromForUtsettelse } from 'app/utils/permisjonUtils';
import Permisjonsplan from 'app/containers/Permisjonsplan';
import PlanleggerInfo from 'app/components/content/PlanleggerInfo';
import TidslinjeAktivitetskravInfo from 'app/components/content/TidslinjeAktivitetskravInfo';
import { getSisteRegistrertePermisjonsdag } from 'app/selectors/periodeSelector';

export interface StateProps {
	form: FormState;
	innslag: Tidslinjeinnslag[];
	utsettelse: UtsettelseState;
	visPermisjonsplan: boolean;
	sisteRegistrertePermisjonsdag?: Date;
}

interface OwnProps {
	sprak?: Spraak;
}
export type Props = OwnProps & StateProps & DispatchProps & InjectedIntlProps;

export class Main extends React.Component<Props> {
	render() {
		const {
			form,
			utsettelse,
			innslag,
			visPermisjonsplan,
			dispatch,
			sisteRegistrertePermisjonsdag,
			intl
		} = this.props;

		const navnForelder1 = form.navnForelder1 || intlString(intl, 'forelder1');
		const navnForelder2 = form.navnForelder2 || intlString(intl, 'forelder2');

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
					tekst: (
						<TidslinjeAktivitetskravInfo
							navnForelder1={navnForelder1}
							navnForelder2={navnForelder2}
						/>
					)
				};
			}
		}
		const tidsromForUtsettelse: Tidsperiode | undefined =
			form.termindato && form.dekningsgrad && sisteRegistrertePermisjonsdag
				? getGyldigTidsromForUtsettelse(
						form.termindato,
						form.dekningsgrad,
						form.permisjonsregler,
						sisteRegistrertePermisjonsdag
				  )
				: undefined;

		return (
			<div>
				<section className="introtekst">
					<h1 className="m-textCenter applikasjonstittel blokk-m">
						<IntlTekst id="applikasjonstittel" />
					</h1>
					<div className="blokk-s">
						<PlanleggerInfo />
					</div>
				</section>

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

				{tidsromForUtsettelse &&
					form.termindato && (
						<div>
							<UtsettelseDialog
								isOpen={utsettelse.dialogErApen}
								navnForelder1={navnForelder1}
								navnForelder2={navnForelder2}
								utsettelser={utsettelse.utsettelser}
								utsettelse={utsettelse.valgtUtsettelse}
								tidsrom={tidsromForUtsettelse}
								permisjonsregler={form.permisjonsregler}
								termindato={form.termindato}
							/>
						</div>
					)}
			</div>
		);
	}
}

const mapStateToProps = (state: AppState): StateProps => {
	let innslag: Tidslinjeinnslag[] = [];
	innslag = tidslinjeFraPerioder(state);

	return {
		innslag,
		form: state.form,
		utsettelse: state.utsettelse,
		sisteRegistrertePermisjonsdag: getSisteRegistrertePermisjonsdag(state),
		visPermisjonsplan:
			innslag &&
			innslag.length > 0 &&
			state.form.dekningsgrad !== undefined &&
			state.form.termindato !== undefined &&
			state.view.visTidslinje === true
	};
};

export default connect(mapStateToProps)(injectIntl(Main));
