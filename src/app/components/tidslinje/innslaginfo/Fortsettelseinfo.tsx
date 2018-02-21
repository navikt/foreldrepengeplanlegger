import * as React from 'react';
import InnslagLayout from 'app/components/tidslinje/elementer/InnslagLayout';
import Dato from 'app/elements/dato/Dato';

interface Props {
	navn: string;
	sluttdato?: Date;
}

const Fortsettelsesinfo: React.StatelessComponent<Props> = ({
	navn,
	sluttdato
}) => (
	<InnslagLayout>
		<div className="periodefortsettelse">
			{sluttdato ? (
				<div>
					<span className="periodefortsettelse__dato">
						<Dato dato={sluttdato} />
					</span>
					{navn} avslutter sin permisjon
				</div>
			) : (
				<div>{navn} fortsetter sin permisjon</div>
			)}
		</div>
	</InnslagLayout>
);

export default Fortsettelsesinfo;
