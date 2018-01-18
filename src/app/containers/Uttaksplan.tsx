import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import DialogBox from 'shared/components/dialog-box/DialogBox';
import { gotoForside } from 'utils/navigasjon';
import Tidslinje from 'components/tidslinje/Tidslinje';

export type Props = RouteComponentProps<{}>;

export class Uttaksplan extends React.Component<Props> {
	render() {
		return (
			<div>
				<div className="blockSpacing">
					<DialogBox type="success">
						Nedenfor har jeg satt opp et utgangspunkt for fordeling ut fra
						informasjonen jeg fikk av deg på forrige side. Du kan endre datoene
						for hver periode, og du kan legge inn andre perioder inne i mellom.
					</DialogBox>
				</div>
				<Tidslinje />
				<button onClick={() => gotoForside(this.props.history)}>
					Tilbake til forside
				</button>
			</div>
		);
	}
}

export default withRouter(Uttaksplan);
