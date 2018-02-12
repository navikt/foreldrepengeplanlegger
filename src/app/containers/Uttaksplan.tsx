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
import Veileder from 'shared/components/veileder/Veileder';
import UtsettelseDialog from 'app/containers/UtsettelseDialog';
import { Tidslinjeinnslag } from 'app/components/tidslinje/types';
import { utsettelseVisDialog } from 'app/redux/actions';
import { Utsettelsesperiode } from 'app/types';

export interface StateProps {
	form: FormState;
	innslag: Tidslinjeinnslag[];
	utsettelse: UtsettelseState;
	visTidslinje: boolean;
}

export type Props = StateProps & RouteComponentProps<{}> & DispatchProps;

export class Uttaksplan extends React.Component<Props> {
	render() {
		return (
			<div>
				<div className="introtekst">
					<div className="introtekst__veileder">
						<Veileder type="intro" svgClassName="veilederSvg" />
					</div>
					<p>
						Hei, hver forelder har rett på 10 uker permisjon hver. I tillegg har
						dere enten 36 eller 26 uker dere kan fordele mellom dere basert på
						den totale permisjonslengden dere velger, som er 59 uker eller 49
						uker.
					</p>
				</div>

				<div className="blokk-m">
					<Skjema />
				</div>

				<div className="blokk-m">
					<UtsettelseDialog />
				</div>

				{this.props.visTidslinje && (
					<Tidslinje
						innslag={this.props.innslag}
						navnForelder1={this.props.form.navnForelder1}
						navnForelder2={this.props.form.navnForelder2}
						onRedigerUtsettelse={(utsettelse: Utsettelsesperiode) =>
							this.props.dispatch(utsettelseVisDialog(utsettelse))
						}
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
		visTidslinje:
			innslag && innslag.length > 0 && state.form.dekningsgrad !== undefined
	};
};

export default connect(mapStateToProps)(withRouter(Uttaksplan));
