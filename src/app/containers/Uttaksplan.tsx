import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';

import Tidslinje from 'app/components/tidslinje/Tidslinje';
import Skjema from './Skjema';
import { AppState, UtsettelseState, DispatchProps, FormState } from 'app/redux/types';
import { TidslinjeInnslag } from 'app/components/tidslinje/types';
import { tidslinjeSelector } from 'app/selectors/tidslinjeSelector';
import Veileder from 'shared/components/veileder/Veileder';
import UtsettelseDialog from 'app/containers/UtsettelseDialog';
import { getPeriodedetaljer, getPerioderUtenUtsettelser } from 'app/utils/periodeUtils';

export interface StateProps {
	form: FormState;
	innslag: TidslinjeInnslag[];
	utsettelse: UtsettelseState;
	visTidslinje: boolean;
}

export type Props = StateProps & RouteComponentProps<{}> & DispatchProps;

export class Uttaksplan extends React.Component<Props> {
	render() {
		const perioder = getPerioderUtenUtsettelser(
			this.props.form.termindato || new Date(),
			this.props.form.dekningsgrad || '100%',
			this.props.form.grunnfordeling,
			this.props.form.ukerForelder1 || 0,
			this.props.form.ukerForelder2 || 0
		);
		return (
			<div>
				<div className="introtekst">
					<div className="introtekst__veileder">
						<Veileder type="intro" svgClassName="veilederSvg" />
					</div>
					<p>
						Hei, hver forelder har rett på 14 uker permisjon hver. I tillegg har dere enten 28 eller 18 uker dere kan
						fordele mellom dere basert på den totale permisjonslengden dere velger, som er 59 uker eller 49 uker.
					</p>
				</div>

				<div className="blokk-m">
					<Skjema />
				</div>

				<div className="blokk-m">
					<UtsettelseDialog />
				</div>

				<div className="blokk-m">
					<ul>{perioder.map((p, idx) => <li key={idx}>{getPeriodedetaljer(p)}</li>)}</ul>
				</div>

				{this.props.visTidslinje && <Tidslinje innslag={this.props.innslag} />}
			</div>
		);
	}
}

const mapStateToProps = (state: AppState): StateProps => {
	const innslag = tidslinjeSelector(state);
	return {
		innslag,
		form: state.form,
		utsettelse: state.utsettelse,
		visTidslinje: innslag && innslag.length > 0
	};
};

export default connect(mapStateToProps)(withRouter(Uttaksplan));
