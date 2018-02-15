import * as React from 'react';
import Uttaksplan from './containers/Uttaksplan';
import './styles/planlegger.less';
import Alertstripe from 'nav-frontend-alertstriper';
import Lenke from 'nav-frontend-lenker';

export class PlanleggerIndex extends React.Component {
	render() {
		return (
			<div className="planlegger">
				<br />
				<Alertstripe type="info">
					<p>
						Du har nå funnet en foreldrepengeplanlegger som er under utvikling
						her i NAV.
					</p>{' '}
					<p>
						<strong>Dette er ikke et søknadsskjema</strong>. Gå til{' '}
						<Lenke href="https://nav.no/foreldrepenger">
							nav.no/foreldrepenger
						</Lenke>{' '}
						for mer informasjon om foreldrepenger.
					</p>
				</Alertstripe>
				<h1 className="m-textCenter">Foreldrepengeplanleggeren</h1>
				<Uttaksplan />
			</div>
		);
	}
}

export default PlanleggerIndex;
