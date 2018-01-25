import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';

import DialogBox from 'shared/components/dialogBox/DialogBox';
import Tidslinje from 'app/components/tidslinje/Tidslinje';
import UtsettelseDialog from 'app/components/utsettelseDialog/UtsettelseDialog';
import Skjema from './Skjema';
import { AppState, UtsettelseState, DispatchProps } from 'app/redux/types';
import { TidslinjeInnslag } from 'app/components/tidslinje/types';
import { tidslinjeSelector } from 'app/selectors/tidslinjeSelector';
import { utsettelseLukkDialog, utsettelseVisDialog } from 'app/redux/actions';

export interface StateProps {
	innslag: TidslinjeInnslag[];
	utsettelse: UtsettelseState;
}

export type Props = StateProps & RouteComponentProps<{}> & DispatchProps;

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
				<UtsettelseDialog
					isOpen={this.props.utsettelse.isOpen}
					onOpen={() => this.props.dispatch(utsettelseVisDialog())}
					onClose={() => this.props.dispatch(utsettelseLukkDialog())}
				/>
				<Tidslinje innslag={this.props.innslag} />
			</div>
		);
	}
}

const mapStateToProps = (state: AppState): StateProps => ({
	innslag: tidslinjeSelector(state),
	utsettelse: state.utsettelse
});

export default connect(mapStateToProps)(withRouter(Uttaksplan));
