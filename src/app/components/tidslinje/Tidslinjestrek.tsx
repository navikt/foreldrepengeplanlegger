import * as React from 'react';
import * as classnames from 'classnames';
import {
	Tidslinjeinnslag,
	TidslinjeinnslagType,
	Hendelseinnslag,
	Periodeinnslag
} from 'app/components/tidslinje/types';
import { Periodetype } from 'app/types';

export interface Props {
	innslag: Tidslinjeinnslag;
}

const cls = (variant?: string) =>
	variant ? `tidslinjestrek--${variant}` : 'tidslinjestrek';

const hendelseClassNames = (innslag: Hendelseinnslag): string =>
	classnames(cls(), cls('hendelse'), cls(`hendelse--${innslag.hendelse}`));

const periodeClassNames = (innslag: Periodeinnslag): string =>
	classnames(
		cls(),
		cls('periode'),
		cls(innslag.periode.forelder),
		cls(innslag.periode.type),
		{
			'tidslinjestrek--fortsettelse':
				innslag.periode.type !== Periodetype.Utsettelse &&
				innslag.forrigePeriode &&
				innslag.forrigePeriode.forelder === innslag.periode.forelder,
			'tidslinjestrek--fortsetter':
				innslag.periode.type !== Periodetype.Utsettelse &&
				innslag.nestePeriode &&
				innslag.nestePeriode.forelder === innslag.periode.forelder
		}
	);

const Tidslinjestrek: React.StatelessComponent<Props> = ({ innslag }) => {
	return (
		<div
			className={
				innslag.type === TidslinjeinnslagType.hendelse
					? hendelseClassNames(innslag)
					: periodeClassNames(innslag)
			}
		/>
	);
};

export default Tidslinjestrek;
