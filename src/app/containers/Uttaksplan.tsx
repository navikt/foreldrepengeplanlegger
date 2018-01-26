import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';

import Tidslinje from 'app/components/tidslinje/Tidslinje';
// import UtsettelseDialog from 'app/components/utsettelseDialog/UtsettelseDialog';
import Skjema from './Skjema';
import { AppState, UtsettelseState, DispatchProps } from 'app/redux/types';
import { TidslinjeInnslag } from 'app/components/tidslinje/types';
import { tidslinjeSelector } from 'app/selectors/tidslinjeSelector';
// import { utsettelseLukkDialog, utsettelseVisDialog } from 'app/redux/actions';
import Veileder from 'shared/components/veileder/Veileder';

export interface StateProps {
	innslag: TidslinjeInnslag[];
	utsettelse: UtsettelseState;
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

				<Skjema />

				{/* <UtsettelseDialog
					isOpen={this.props.utsettelse.isOpen}
					onOpen={() => this.props.dispatch(utsettelseVisDialog())}
					onClose={() => this.props.dispatch(utsettelseLukkDialog())}
				/>
 */}
				{this.props.innslag && this.props.innslag.length > 0 && <Tidslinje innslag={this.props.innslag} />}
			</div>
		);
	}
}

const mapStateToProps = (state: AppState): StateProps => ({
	innslag: tidslinjeSelector(state),
	utsettelse: state.utsettelse
});

export default connect(mapStateToProps)(withRouter(Uttaksplan));
