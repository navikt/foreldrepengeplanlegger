import * as React from 'react';
import * as classnames from 'classnames';

import VeilederIkon from 'app/components/ikoner/VeilederIkon';
import UtvidetInformasjon from 'app/components/utvidetInformasjon/UtvidetInformasjon';

interface Props {
	utvidetInfo?: React.ReactNode;
	stil?: 'kompakt' | 'vanlig';
}

const Veilederinfo: React.StatelessComponent<Props> = ({
	utvidetInfo,
	stil = 'kompakt',
	children
}) => (
	<div className={classnames('veilederinfo', `veilederinfo--${stil}`)}>
		<div className="veilederinfo__innhold">
			<span className="veilederinfo__veileder">
				<VeilederIkon />
			</span>
			{children}
			{utvidetInfo && (
				<div className="veilederinfo__utvidetInfo">
					<UtvidetInformasjon>{utvidetInfo}</UtvidetInformasjon>
				</div>
			)}
		</div>
	</div>
);

export default Veilederinfo;
