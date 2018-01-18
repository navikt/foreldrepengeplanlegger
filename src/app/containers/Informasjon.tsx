import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { gotoUttaksplan } from 'utils/navigasjon';

export interface OwnProps {}

export type Props = OwnProps & RouteComponentProps<{}>;

export class Informasjon extends React.Component<Props, {}> {
	render() {
		return (
			<div>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
					quis lectus metus, at posuere neque. Sed pharetra nibh eget orci
					convallis at posuere leo convallis. Sed blandit augue vitae augue
					scelerisque bibendum.
				</p>
				<h2>Spørsmål side 1</h2>
				<ul>
					<li>Termin/fødselsdato</li>
					<li>80% eller 100%</li>
					<li>Uker permisjon til mor</li>
					<li>Uker permisjon til far/medforelder</li>
				</ul>
				<button onClick={() => gotoUttaksplan(this.props.history)}>
					Gå videre
				</button>
			</div>
		);
	}
}
export default withRouter(Informasjon);
