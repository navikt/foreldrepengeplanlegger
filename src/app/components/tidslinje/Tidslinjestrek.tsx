import * as React from 'react';
import * as classnames from 'classnames';
import {
	Tidslinjeinnslag,
	TidslinjeinnslagType,
	Hendelseinnslag,
	Periodeinnslag
} from 'app/components/tidslinje/types';

export interface Props {
	innslag: Tidslinjeinnslag;
}

const cls = (variant?: string) =>
	variant ? `tidslinjestrek--${variant}` : 'tidslinjestrek';

const hendelseClassNames = (innslag: Hendelseinnslag): string =>
	classnames(cls(), cls('hendelse'));

const periodeClassNames = (innslag: Periodeinnslag): string =>
	classnames(
		cls(),
		cls('periode'),
		cls(innslag.periode.forelder),
		cls(innslag.periode.type)
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
