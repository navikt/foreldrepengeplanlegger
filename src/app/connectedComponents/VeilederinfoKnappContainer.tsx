import * as React from 'react';
import { connect } from 'react-redux';
import InfoIkon from 'app/components/ikoner/InfoIkon';
import LukkInfoIkon from 'app/components/ikoner/LukkInfoIkon';
import Sirkelknapp from 'app/components/sirkelknapp/Sirkelknapp';
import { DispatchProps, AppState } from 'app/redux/types';
import { visInfo, skjulInfo } from 'app/redux/actions';

interface OwnProps {
	id: string;
	label: string;
}

interface StateProps {
	isOpen: boolean;
}

type Props = OwnProps & StateProps & DispatchProps;

class VeilederinfoKnappContainer extends React.Component<Props, {}> {
	render() {
		const { id, label, isOpen, dispatch } = this.props;
		return (
			<Sirkelknapp
				stil="info"
				label={label}
				ikon={isOpen ? <LukkInfoIkon /> : <InfoIkon />}
				toggle={{ pressed: isOpen }}
				onClick={() => dispatch(isOpen ? skjulInfo(id) : visInfo(id))}
			/>
		);
	}
}

export default connect<StateProps, {}, OwnProps>(
	(state: AppState, props: OwnProps): StateProps => ({
		isOpen: state.view.synligInfo.has(props.id)
	})
)(VeilederinfoKnappContainer);
