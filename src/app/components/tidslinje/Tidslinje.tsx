import * as React from 'react';
import * as classnames from 'classnames';

import { Systemtittel } from 'nav-frontend-typografi';
import {
	Tidslinjeinnslag,
	TidslinjeinnslagType
} from 'app/components/tidslinje/types';
import Tidslinjestrek from 'app/components/tidslinje/elementer/Tidslinjestrek';
import Periodeinnslag from 'app/components/tidslinje/innslagtyper/Periodeinnslag';
import Hendelseinnslag from 'app/components/tidslinje/innslagtyper/Hendelseinnslag';

export interface TidslinjeProps {
	innslag: Tidslinjeinnslag[];
	navnForelder1: string;
	navnForelder2: string;
}

const Tidslinje: React.StatelessComponent<TidslinjeProps> = ({
	innslag,
	navnForelder1,
	navnForelder2
}) => {
	return (
		<div className="tidslinje">
			<div className="blokk-m">
				<Systemtittel>Din tidsplan</Systemtittel>
			</div>
			{innslag.map((i, idx) => {
				const className = classnames(
					'tidslinje__innslag',
					`tidslinje__innslag--${i.type}`
				);
				return (
					<div className={className} key={idx}>
						<Tidslinjestrek innslag={i} />
						{i.type === TidslinjeinnslagType.periode ? (
							<Periodeinnslag
								innslag={i}
								navnForelder1={navnForelder1}
								navnForelder2={navnForelder2}
							/>
						) : (
							<Hendelseinnslag innslag={i}>hendelse</Hendelseinnslag>
						)}
					</div>
				);
			})}
		</div>
	);
};

export default Tidslinje;
