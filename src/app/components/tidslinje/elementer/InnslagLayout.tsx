import * as React from 'react';
import { Tidsperiode } from 'app/types';
import TidsperiodeTekst from 'app/components/tidslinje/elementer/TidsperiodeTekst';
import RedigerInnslagKnapp from 'app/components/tidslinje/elementer/RedigerInnslagKnapp';
import Varighet from 'app/components/tidslinje/elementer/Varighet';
import { getAntallUttaksdagerITidsperiode } from 'app/utils/uttaksdagerUtils';

export interface Props {
	children: React.ReactNode;
	tidsperiode?: Tidsperiode;
	onRediger?: () => void;
}

const InnslagLayout: React.StatelessComponent<Props> = ({
	tidsperiode,
	onRediger,
	children
}) => (
	<div className="m-padding-s">
		<div className="periodeinnslag__topp">
			<div className="periodeinnslag__topp__venstre">{children}</div>
			<div className="periodeinnslag__topp__hoyre">
				{tidsperiode && (
					<span className="tidslinje__varighet">
						<Varighet dager={getAntallUttaksdagerITidsperiode(tidsperiode)} />
					</span>
				)}
				{onRediger && (
					<div className="periodeinnslag__rediger">
						<RedigerInnslagKnapp onClick={() => onRediger()} />
					</div>
				)}
			</div>
		</div>
		{tidsperiode && (
			<div className="periodeinnslag__dato">
				<TidsperiodeTekst
					tidsperiode={tidsperiode}
					visSluttdato={true}
					visVarighet={true}
				/>
			</div>
		)}
	</div>
);

export default InnslagLayout;
