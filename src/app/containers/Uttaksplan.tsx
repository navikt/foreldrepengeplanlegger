import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';

import Tidslinje from 'app/components/tidslinje/Tidslinje';
import Skjema from './Skjema';
import { AppState, UtsettelseState, DispatchProps } from 'app/redux/types';
import { TidslinjeInnslag } from 'app/components/tidslinje/types';
import { tidslinjeSelector } from 'app/selectors/tidslinjeSelector';
import Veileder from 'shared/components/veileder/Veileder';
import UtsettelseDialog from 'app/containers/UtsettelseDialog';

export interface StateProps {
	innslag: TidslinjeInnslag[];
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

				{this.props.visTidslinje && <Tidslinje innslag={this.props.innslag} />}
			</div>
		);
	}
}

const mapStateToProps = (state: AppState): StateProps => {
	const innslag = tidslinjeSelector(state);
	return {
		innslag,
		utsettelse: state.utsettelse,
		visTidslinje: innslag && innslag.length > 0
	};
};

export default connect(mapStateToProps)(withRouter(Uttaksplan));
