import * as React from 'react';
import Main from './containers/Main';
import './styles/planlegger.less';
import Alertstripe from 'nav-frontend-alertstriper';
import Lenke from 'nav-frontend-lenker';

export class PlanleggerIndex extends React.Component {
	render() {
		return (
			<div className="planlegger">
				<br />
				<div className="blokk-m">
					<Alertstripe type="info">
						<p>
							<strong>Dette er ikke et søknadsskjema</strong>.
						</p>
						<p>
							Du har nå funnet foreldrepengeplanleggeren som er under utvikling
							her i NAV. Planleggeren er ikke ferdig, så du kan ikke bruke den
							til å planlegge permisjonenen din enda.
						</p>
						<p>
							Gå til{' '}
							<Lenke href="https://nav.no/foreldrepenger">
								nav.no/foreldrepenger
							</Lenke>{' '}
							for mer informasjon om foreldrepenger.
						</p>
					</Alertstripe>
				</div>
				<Main />
			</div>
		);
	}
}

export default PlanleggerIndex;
