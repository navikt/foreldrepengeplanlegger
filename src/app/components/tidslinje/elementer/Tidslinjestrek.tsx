import * as React from 'react';
import * as classnames from 'classnames';
import {
	Tidslinjeinnslag,
	TidslinjeinnslagType,
	InnslagHendelsetype,
	InnslagPeriodetype
} from 'app/components/tidslinje/types';
import { Periodetype } from 'app/types';
import {
	innslagErFortsettelse,
	innslagFortsetter
} from 'app/components/tidslinje/tidslinjeUtils';

export interface Props {
	innslag: Tidslinjeinnslag;
}

const cls = (variant?: string) =>
	variant ? `tidslinjestrek--${variant}` : 'tidslinjestrek';

const hendelseClassNames = (innslag: InnslagHendelsetype): string =>
	classnames(cls(), cls('hendelse'), cls(`hendelse--${innslag.hendelse}`));

const periodeClassNames = (innslag: InnslagPeriodetype): string =>
	classnames(
		cls(),
		cls('periode'),
		cls(innslag.periode.forelder),
		cls(innslag.periode.type),
		{
			'tidslinjestrek--fortsettelse':
				innslag.periode.type !== Periodetype.Utsettelse &&
				innslagErFortsettelse(innslag),
			'tidslinjestrek--fortsetter':
				innslag.periode.type !== Periodetype.Utsettelse &&
				innslagFortsetter(innslag)
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
