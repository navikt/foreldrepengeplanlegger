import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';

import DialogBox from 'shared/components/dialogBox/DialogBox';
import Tidslinje from 'app/components/tidslinje/Tidslinje';
import Skjema from './Skjema';
import { AppState } from 'app/redux/types';
import { TidslinjeInnslag } from 'app/components/tidslinje/types';
import { tidslinjeSelector } from 'app/selectors/tidslinjeSelector';

export interface StateProps {
	innslag: TidslinjeInnslag[];
}

export type Props = StateProps & RouteComponentProps<{}>;

export class Uttaksplan extends React.Component<Props> {
	render() {
		return (
			<div>
				<div className="blockSpacing">
					<DialogBox type="info">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus bibendum dui nec ipsum euismod, quis
						eleifend quam aliquam. Fusce nec aliquam massa. Nam sed est fringilla, volutpat odio sed, fermentum odio. In
						quis lacus eu mauris ultricies convallis. Nulla eu dignissim mi, ac condimentum purus.
					</DialogBox>
				</div>
				<Skjema />
				<Tidslinje innslag={this.props.innslag} />
			</div>
		);
	}
}

const mapStateToProps = (state: AppState): StateProps => ({ innslag: tidslinjeSelector(state) });

export default connect(mapStateToProps)(withRouter(Uttaksplan));
