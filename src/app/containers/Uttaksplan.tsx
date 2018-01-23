import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import DialogBox from 'shared/components/dialogBox/DialogBox';
import Tidslinje from 'app/components/tidslinje/Tidslinje';
import Skjema from './Skjema';

export type Props = RouteComponentProps<{}>;

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
				<Tidslinje />
			</div>
		);
	}
}

export default withRouter(Uttaksplan);
