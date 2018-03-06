import * as React from 'react';
import Veilederinfo from 'app/elements/veilederinfo/Veilederinfo';
import IntlTekst from 'app/intl/IntlTekst';
import UtvidetInformasjon from 'app/elements/utvidetInformasjon/UtvidetInformasjon';
import { Element } from 'nav-frontend-typografi';
import UlonnetPermisjonInfo from 'app/components/content/UlonnetPermisjonInfo';

export interface Props {}

const PlanleggerInfo: React.StatelessComponent<Props> = (props) => (
	<div>
		<Veilederinfo>
			<p>
				<IntlTekst id="veileder.forbehold.intro" />
			</p>
			<UtvidetInformasjon erApen={true}>
				<div className="blokkPad-s">
					<Element tag="h2">
						<IntlTekst id="veileder.forbehold.utvidetinfo.tittel" />
					</Element>
					<IntlTekst id="veileder.forbehold.utvidetinfo.html" />
				</div>
				<div className="blokkPad-s">
					<UlonnetPermisjonInfo />
				</div>
			</UtvidetInformasjon>
		</Veilederinfo>
	</div>
);

export default PlanleggerInfo;
