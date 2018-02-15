import * as React from 'react';
import * as classnames from 'classnames';

import { Systemtittel } from 'nav-frontend-typografi';
import {
	Tidslinjeinnslag,
	TidslinjeinnslagType
} from 'app/components/tidslinje/types';
import Tidslinjestrek from 'app/components/tidslinje/elementer/Tidslinjestrek';
import Periodeinnslag from 'app/components/tidslinje/Periodeinnslag';
import Hendelseinnslag from 'app/components/tidslinje/Hendelseinnslag';
import { Utsettelsesperiode } from 'app/types';

export interface TidslinjeProps {
	innslag: Tidslinjeinnslag[];
	navnForelder1: string;
	navnForelder2: string;
	onRedigerUtsettelse?: (utsettelse: Utsettelsesperiode) => void;
}

const Tidslinje: React.StatelessComponent<TidslinjeProps> = ({
	innslag,
	navnForelder1,
	navnForelder2,
	onRedigerUtsettelse
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
				const nesteInnslag =
					idx === innslag.length - 1 ? undefined : innslag[idx + 1];
				return (
					<div className={className} key={idx}>
						<Tidslinjestrek innslag={i} />
						{i.type === TidslinjeinnslagType.periode ? (
							<Periodeinnslag
								innslag={i}
								nesteInnslag={nesteInnslag}
								navnForelder1={navnForelder1}
								navnForelder2={navnForelder2}
								onRedigerUtsettelse={onRedigerUtsettelse}
							/>
						) : (
							<Hendelseinnslag innslag={i} />
						)}
					</div>
				);
			})}
		</div>
	);
};

export default Tidslinje;
