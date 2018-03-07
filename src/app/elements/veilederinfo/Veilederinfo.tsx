import * as React from 'react';
import * as classnames from 'classnames';

import './veilederinfo.less';
import Veileder, { Ansiktstype } from 'app/elements/veileder/Veileder';
import UtvidetInformasjon from 'app/elements/utvidetInformasjon/UtvidetInformasjon';

type Infotype = 'info' | 'advarsel' | 'feil';

export interface VeilederInfoProps {
	utvidetInfo?: React.ReactNode;
	visVeileder?: boolean;
	stil?: 'kompakt' | 'normal' | 'kunTekst';
	type?: Infotype;
}

const getAnsiktFromType = (type: Infotype): Ansiktstype => {
	switch (type) {
		case 'advarsel':
			return 'undrende';
		case 'feil':
			return 'skeptisk';
		default:
			return 'glad';
	}
};

const Veilederinfo: React.StatelessComponent<VeilederInfoProps> = ({
	utvidetInfo,
	visVeileder = true,
	stil = 'normal',
	type = 'info',
	children
}) => {
	return (
		<div
			className={classnames(
				'veilederinfo',
				`veilederinfo--${stil}`,
				`veilederinfo--${type}`
			)}>
			{visVeileder && (
				<span className="veilederinfo__veileder">
					<Veileder
						farge="lilla"
						ansikt={getAnsiktFromType(type)}
						stil="kompakt"
					/>
				</span>
			)}
			<div
				className={classnames(
					'veilederinfo__innhold',
					`veilederinfo__innhold--${type}`,
					'typo-normal'
				)}>
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
