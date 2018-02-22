import * as React from 'react';
import InnslagLayout from 'app/components/tidslinje/elementer/InnslagLayout';
import Dato from 'app/elements/dato/Dato';
import IntlTekst from 'app/intl/IntlTekst';

interface Props {
	navn: string;
	sluttdato?: Date;
}

const avslutter = (navn: string, sluttdato: Date) => (
	<div>
		<span className="periodefortsettelse__dato">
			<Dato dato={sluttdato} />
		</span>
		<IntlTekst
			id="tidslinje.periodeinfo.fortsettelse.avslutter"
			values={{ navn }}
		/>
	</div>
);

const Fortsettelsesinfo: React.StatelessComponent<Props> = ({
	navn,
	sluttdato
}) => (
	<InnslagLayout>
		<div className="periodefortsettelse">
			{sluttdato ? (
				avslutter(navn, sluttdato)
			) : (
				<IntlTekst
					id="tidslinje.periodeinfo.fortsettelse.fortsetter"
					values={{ navn }}
				/>
			)}
		</div>
	</InnslagLayout>
);

export default Fortsettelsesinfo;
