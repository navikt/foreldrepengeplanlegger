import * as React from 'react';
import Uttaksplan from './containers/Uttaksplan';
import './styles/planlegger.less';

export class PlanleggerIndex extends React.Component {
	render() {
		return (
			<div className="planlegger">
				<h1 className="m-textCenter">Foreldrepengeplanleggeren</h1>
				<Uttaksplan />
			</div>
		);
	}
}

export default PlanleggerIndex;
