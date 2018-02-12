import * as React from 'react';
import { Tidsperiode } from 'app/types';
import TidsperiodeTekst from 'app/components/tidslinje/elementer/TidsperiodeTekst';

export interface Props {}

const InnslagLayout: React.StatelessComponent<{
	tidsperiode?: Tidsperiode;
	children: React.ReactNode;
}> = ({ tidsperiode, children }) => (
	<div className="m-padding-s">
		{tidsperiode && (
			<div className="periodeinnslag__dato">
				<TidsperiodeTekst tidsperiode={tidsperiode} />
			</div>
		)}
		<div className="periodeinnslag__beskrivelse">{children}</div>
	</div>
);

export default InnslagLayout;
