import * as React from 'react';
import * as classnames from 'classnames';

import VeilederIkon from 'app/components/ikoner/VeilederIkon';
import UtvidetInformasjon from 'app/components/utvidetInformasjon/UtvidetInformasjon';

interface Props {
	utvidetInfo?: React.ReactNode;
	stil?: 'kompakt' | 'vanlig';
}

const Infotekst: React.StatelessComponent<Props> = ({
	utvidetInfo,
	stil = 'vanlig',
	children
}) => (
	<div className={classnames('infotekst', `infotekst--${stil}`)}>
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
