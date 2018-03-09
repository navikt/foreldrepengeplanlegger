import * as React from 'react';
import Main from './containers/Main';
import { connect } from 'react-redux';
import { AppState } from 'app/redux/types';
import { Spraak } from 'app/types';

import './styles/planlegger.less';

interface Props {
	sprak: Spraak;
}

export class PlanleggerIndex extends React.Component<Props> {
	render() {
		return (
			<div className="planlegger">
				<Main sprak={this.props.sprak} />
			</div>
		);
	}
}

export default connect((state: AppState) => ({ sprak: state.view.spraak }))(
	PlanleggerIndex
);
