import * as React from 'react';
import Uttaksplan from './containers/Uttaksplan';
import './styles/planlegger.less';

export class PlanleggerIndex extends React.Component {
	render() {
		return (
			<div className="planlegger">
				<h1>Permisjons&shy;planleggeren</h1>
				<Uttaksplan />
			</div>
		);
	}
}

export default PlanleggerIndex;
