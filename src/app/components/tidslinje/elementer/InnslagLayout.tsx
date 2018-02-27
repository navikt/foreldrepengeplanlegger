import * as React from 'react';
import { Tidsperiode } from 'app/types';
import TidsperiodeTekst from 'app/components/tidslinje/elementer/TidsperiodeTekst';
import RedigerInnslagKnapp from 'app/components/tidslinje/elementer/RedigerInnslagKnapp';

export interface Props {
	tidsperiode?: Tidsperiode;
	children: React.ReactNode;
	onRediger?: () => void;
}

const InnslagLayout: React.StatelessComponent<Props> = ({
	tidsperiode,
	onRediger,
	children
}) => (
	<div className="m-padding-s">
		{(tidsperiode || onRediger) && (
			<div className="periodeinnslag__topp">
				{tidsperiode && (
					<div className="periodeinnslag__dato">
						<TidsperiodeTekst tidsperiode={tidsperiode} />
					</div>
				)}
				{onRediger && (
					<div className="periodeinnslag__rediger">
						<RedigerInnslagKnapp onClick={() => onRediger()} />
					</div>
				)}
			</div>
		)}
		<div className="periodeinnslag__beskrivelse">{children}</div>
	</div>
);

export default InnslagLayout;
