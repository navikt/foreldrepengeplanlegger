import * as React from 'react';
import * as classnames from 'classnames';
import { Tidslinjeinnslag } from 'app/components/tidslinje/types';

export interface Props {
	innslag: Tidslinjeinnslag;
}

const Tidslinjestrek: React.StatelessComponent<Props> = (props) => (
	<div
		className={classnames(
			'tidslinjeInnslag__linje'
			// `tidslinjeInnslag__linje--${innslag.forelder}`,
			// `tidslinjeInnslag__linje--${innslag.type}`,
			// {
			// 	'tidslinjeInnslag__linje--fortsettelse': innslag.fortsettelse,
			// 	'tidslinjeInnslag__linje--fortsetter': innslag.fortsetter,
			// 	'tidslinjeInnslag__linje--slutt': innslag.slutter
			// }
		)}
	/>
);

export default Tidslinjestrek;
