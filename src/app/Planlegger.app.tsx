import * as React from 'react';
import Main from './containers/Main';
import './styles/planlegger.less';

export class PlanleggerIndex extends React.Component {
	render() {
		return (
			<div className="planlegger">
				<Main />
			</div>
		);
	}
}

export default PlanleggerIndex;
