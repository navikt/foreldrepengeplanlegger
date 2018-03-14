import * as React from 'react';
import { Systemtittel } from 'nav-frontend-typografi';
import IntlTekst, { intlString } from 'app/intl/IntlTekst';
import Fordeling from 'app/components/fordeling/Fordeling';
import Tidslinje from 'app/components/tidslinje/Tidslinje';
import LeggTilKnapp from 'app/elements/leggTilKnapp/LeggTilKnapp';
import { Permisjonsregler, Utsettelsesperiode } from 'app/types';
import { Tidslinjeinnslag } from 'app/components/tidslinje/types';
import { scrollToElement } from 'app/utils/animationUtils';
import { injectIntl, InjectedIntlProps } from 'react-intl';

export interface OwnProps {
	navnForelder1?: string;
	navnForelder2?: string;
	fellesperiodeukerForelder1: number;
	fellesperiodeukerForelder2: number;
	innslag: Tidslinjeinnslag[];
	permisjonsregler: Permisjonsregler;
	onLeggTilUtsettelse: () => void;
	onRedigerUtsettelse: (u: Utsettelsesperiode) => void;
}

type Props = OwnProps;

class Permisjonsplan extends React.Component<Props & InjectedIntlProps, {}> {
	componentDidMount() {
		scrollToElement('permisjonsplan', { offset: -40 });
	}
	render() {
		const {
			permisjonsregler,
			fellesperiodeukerForelder1,
			fellesperiodeukerForelder2,
			navnForelder1,
			navnForelder2,
			innslag,
			onRedigerUtsettelse,
			onLeggTilUtsettelse,
			intl
		} = this.props;

		return (
			<section className="tidsplan" id="permisjonsplan">
				<div className="blokk-s">
					<Systemtittel className="tidslinje__tittel">
						<IntlTekst id="tidslinje.tittel" />
					</Systemtittel>
				</div>
				<div className="blokk-m">
					<Fordeling
						foreldrepengerMor={permisjonsregler.antallUkerForelder1FørFødsel}
						modrekvote={permisjonsregler.antallUkerMødrekvote}
						fedrekvote={permisjonsregler.antallUkerFedrekvote}
						fellesukerForelder1={fellesperiodeukerForelder1}
						fellesukerForelder2={fellesperiodeukerForelder2}
						navnForelder1={navnForelder1 || intlString(intl, 'Forelder1')}
						navnForelder2={navnForelder2 || intlString(intl, 'Forelder2')}
					/>
				</div>
				<div className="blokk-m">
					<Tidslinje
						innslag={innslag}
						navnForelder1={navnForelder1 || intlString(intl, 'Forelder1')}
						navnForelder2={navnForelder2 || intlString(intl, 'Forelder2')}
						onRedigerUtsettelse={onRedigerUtsettelse}
					/>
				</div>
				<div className="m-textCenter blokk-m no-print">
					<LeggTilKnapp onClick={() => onLeggTilUtsettelse()}>
						<IntlTekst id="opphold.knapp.leggtil" />
					</LeggTilKnapp>
				</div>
			</section>
		);
	}
}

export default injectIntl(Permisjonsplan);
