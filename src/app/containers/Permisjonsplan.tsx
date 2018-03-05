import * as React from 'react';
import { Systemtittel } from 'nav-frontend-typografi';
import IntlTekst from 'app/intl/IntlTekst';
import Fordeling from 'app/components/fordeling/Fordeling';
import Tidslinje from 'app/components/tidslinje/Tidslinje';
import LeggTilKnapp from 'app/elements/leggTilKnapp/LeggTilKnapp';
import { Permisjonsregler, Utsettelsesperiode } from 'app/types';
import { Tidslinjeinnslag } from 'app/components/tidslinje/types';
import { scrollToElement } from 'app/utils/animationUtils';

export interface OwnProps {
	navnForelder1: string;
	navnForelder2: string;
	fellesperiodeukerForelder1: number;
	fellesperiodeukerForelder2: number;
	innslag: Tidslinjeinnslag[];
	permisjonsregler: Permisjonsregler;
	onLeggTilUtsettelse: () => void;
	onRedigerUtsettelse: (u: Utsettelsesperiode) => void;
}

type Props = OwnProps;

class Permisjonsplan extends React.Component<Props, {}> {
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
			onLeggTilUtsettelse
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
						navnForelder1={navnForelder1}
						navnForelder2={navnForelder2}
					/>
				</div>
				<div className="blokk-s">
					<Tidslinje
						innslag={innslag}
						navnForelder1={navnForelder1}
						navnForelder2={navnForelder2}
						onRedigerUtsettelse={onRedigerUtsettelse}
					/>
				</div>
				<div className="m-textCenter blokk-m">
					<LeggTilKnapp onClick={() => onLeggTilUtsettelse()}>
						<IntlTekst id="opphold.knapp.leggtil" />
					</LeggTilKnapp>
				</div>
				{/* <Element className="blokk-xxxs">
					<IntlTekst id="veileder.ulonnetpermisjon.tittel" />
				</Element>
				<p>
					<IntlTekst id="veileder.ulonnetpermisjon.intro.html" />
				</p>
				<UtvidetInformasjon
					apneLabel={intlString(
						this.props.intl,
						'veileder.ulonnetpermisjon.lesmer'
					)}>
					<div className="blokkPad-s">
						<IntlTekst id="veileder.ulonnetpermisjon.utvidetinfo" />
						<Lenke href={EksterneLenker.nav_ulonnetPermisjon} target="_blank">
							{' '}
							<IntlTekst id="veileder.ulonnetpermisjon.utvidetinfo.navlenketekst" />
						</Lenke>
					</div>
				</UtvidetInformasjon> */}
			</section>
		);
	}
}

export default Permisjonsplan;
