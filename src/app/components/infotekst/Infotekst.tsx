import * as React from 'react';

import VeilederIkon from 'app/components/ikoner/VeilederIkon';
import UtvidetInformasjon from 'app/components/utvidetInformasjon/UtvidetInformasjon';

interface Props {
	utvidetInfo?: React.ReactNode;
}

const Infotekst: React.StatelessComponent<Props> = ({
	utvidetInfo,
	children
}) => (
	<div className="infotekst">
		<div className="infotekst__innhold">
			<span className="infotekst__veileder">
				<VeilederIkon />
			</span>
			{children}
			{utvidetInfo && (
				<div className="infotekst__utvidetInfo">
					<UtvidetInformasjon>{utvidetInfo}</UtvidetInformasjon>
				</div>
			)}
		</div>
	</div>
);

export default Infotekst;
