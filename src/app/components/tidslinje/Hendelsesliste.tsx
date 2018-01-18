import * as React from 'react';
import { Permisjonshendelse, HendelseType } from 'components/tidslinje/types';
import CustomSVG from 'shared/components/custom-svg/CustomSVG';

const hjerte = require('./assets/hjerte.svg');

export interface Props {
	hendelser: Permisjonshendelse[];
}

const Hendelsesliste: React.StatelessComponent<Props> = ({ hendelser }) => (
	<ul className="hendelsesliste">
		{hendelser.map((hendelse, idx) => (
			<li key={hendelse.forelder}>
				{hendelse.navn}
				{hendelse.type === HendelseType.termin && (
					<span className="hendelsesliste__ikon">
						<CustomSVG iconRef={hjerte.default} size={14} />
					</span>
				)}
			</li>
		))}
	</ul>
);

export default Hendelsesliste;
