import * as React from 'react';
// import { Element } from 'nav-frontend-typografi';
import IntlTekst, { intlString } from 'app/intl/IntlTekst';
import UtvidetInformasjon from 'app/elements/utvidetInformasjon/UtvidetInformasjon';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import EksterneLenker from 'app/eksterneLenker';
import Lenke from 'nav-frontend-lenker';

export interface Props {
	navn1: string;
	navn2: string;
}

const UlonnetPermisjon: React.StatelessComponent<Props & InjectedIntlProps> = ({
	intl,
	navn1,
	navn2
}) => {
	return (
		<div>
			{/* <Element className="blokk-xxxs">
				<IntlTekst id="veileder.ulonnetpermisjon.tittel" />
			</Element> */}
			<p>
				<IntlTekst
					id="veileder.ulonnetpermisjon.intro.html"
					values={{ navn1, navn2 }}
				/>
			</p>
			<UtvidetInformasjon
				apneLabel={intlString(intl, 'veileder.ulonnetpermisjon.lesmer')}>
				<div className="blokkPad-s">
					<IntlTekst id="veileder.ulonnetpermisjon.utvidetinfo" />
					<Lenke href={EksterneLenker.nav_ulonnetPermisjon} target="_blank">
						{' '}
						<IntlTekst id="veileder.ulonnetpermisjon.utvidetinfo.navlenketekst" />
					</Lenke>
				</div>
			</UtvidetInformasjon>
		</div>
	);
};

export default injectIntl(UlonnetPermisjon);
