import * as React from 'react';
import Veilederinfo from 'app/elements/veilederinfo/Veilederinfo';
import IntlTekst, { intlString } from 'app/intl/IntlTekst';
import UtvidetInformasjon from 'app/elements/utvidetInformasjon/UtvidetInformasjon';
import { Element } from 'nav-frontend-typografi';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import Lenke from 'nav-frontend-lenker';
import EksterneLenker from 'app/eksterneLenker';

export interface Props {}

const PlanleggerInfo: React.StatelessComponent<Props & InjectedIntlProps> = ({
	intl
}) => (
	<div>
		<Veilederinfo>
			<p>
				<IntlTekst id="veileder.forbehold.intro" />
			</p>
			<UtvidetInformasjon
				apneLabel={intlString(intl, 'planleggerinfo.apne')}
				lukkLabel={intlString(intl, 'planleggerinfo.lukk')}>
				<div className="blokkPad-m">
					<Element tag="h2">
						<IntlTekst id="veileder.forbehold.utvidetinfo.tittel" />
					</Element>
					<IntlTekst id="veileder.forbehold.utvidetinfo.html" />
					<Lenke href={EksterneLenker.nav_foreldrepenger_les_mer}>
						<IntlTekst id="lesOmForeldrepenger" />
					</Lenke>
				</div>
			</UtvidetInformasjon>
		</Veilederinfo>
	</div>
);

export default injectIntl(PlanleggerInfo);
