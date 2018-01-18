import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import Informasjon from './containers/Informasjon';
import Uttaksplan from './containers/Uttaksplan';

import './styles/planlegger.less';

export class PlanleggerIndex extends React.Component {
	render() {
		const path = '/planlegger';
		return (
			<div className="planlegger">
				<h1>Permisjons&shy;planleggeren</h1>
				<Switch>
					<Route path={`${path}`} component={Informasjon} exact={true} />
					<Route
						path={`${path}/uttaksplan`}
						component={Uttaksplan}
						exact={true}
					/>
				</Switch>
			</div>
		);
	}
}

export default PlanleggerIndex;
