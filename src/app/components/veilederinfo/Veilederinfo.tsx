import * as React from 'react';
import * as classnames from 'classnames';

import UtvidetInformasjon from 'app/components/utvidetInformasjon/UtvidetInformasjon';
import Veileder from 'app/components/veileder/Veileder';

export interface VeilederInfoProps {
	utvidetInfo?: React.ReactNode;
	stil?: 'kompakt' | 'normal';
}

const Veilederinfo: React.StatelessComponent<VeilederInfoProps> = ({
	utvidetInfo,
	stil = 'normal',
	children
}) => (
	<div className={classnames('veilederinfo', `veilederinfo--${stil}`)}>
		<span className="veilederinfo__veileder">
			<Veileder farge="lilla" ansikt="glad" stil="kompakt" />
		</span>
		<div className="veilederinfo__innhold">
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
