import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';

import DialogBox from 'shared/components/dialogBox/DialogBox';
import Tidslinje from 'app/components/tidslinje/Tidslinje';
import Skjema from './Skjema';
import { AppState } from 'app/redux/types';
import { TidslinjeInnslag } from 'app/components/tidslinje/types';

export interface StateProps {
	innslag: TidslinjeInnslag[];
}

export type Props = StateProps & RouteComponentProps<{}>;

export class Uttaksplan extends React.Component<Props> {
	render() {
		return (
			<div>
				<div className="blockSpacing">
					<DialogBox type="success">
						Nedenfor har jeg satt opp et utgangspunkt for fordeling ut fra informasjonen jeg fikk av deg på forrige
						side. Du kan endre datoene for hver periode, og du kan legge inn andre perioder inne i mellom.
					</DialogBox>
				</div>
				<Skjema />
				<Tidslinje innslag={this.props.innslag} />
			</div>
		);
	}
}

const mapStateToProps = (state: AppState): StateProps => ({ innslag: state.form.tidslinje });

export default connect(mapStateToProps)(withRouter(Uttaksplan));
