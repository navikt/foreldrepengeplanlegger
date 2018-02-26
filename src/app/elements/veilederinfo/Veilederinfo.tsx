import * as React from 'react';
import * as classnames from 'classnames';

import './veilederinfo.less';
import Veileder from 'app/elements/veileder/Veileder';
import UtvidetInformasjon from 'app/elements/utvidetInformasjon/UtvidetInformasjon';

export interface VeilederInfoProps {
	utvidetInfo?: React.ReactNode;
	stil?: 'kompakt' | 'normal' | 'info';
}

const Veilederinfo: React.StatelessComponent<VeilederInfoProps> = ({
	utvidetInfo,
	stil = 'normal',
	children
}) => {
	const visVeileder = stil !== 'info';
	return (
		<div className={classnames('veilederinfo', `veilederinfo--${stil}`)}>
			{visVeileder && (
				<span className="veilederinfo__veileder">
					<Veileder farge="lilla" ansikt="glad" stil="kompakt" />
				</span>
			)}
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
};

export default Veilederinfo;
