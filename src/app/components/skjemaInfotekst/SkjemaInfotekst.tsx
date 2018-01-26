import * as React from 'react';
import { HjelpetekstVenstre } from 'nav-frontend-hjelpetekst';

export interface Props {
	id: string;
	tittel?: string;
}

const SkjemaInfotekst: React.StatelessComponent<Props> = (props) => (
	<div className="skjema_infotekst">
		<div className="skjema_infotekst__hjelpetekstWrapper">
			<HjelpetekstVenstre {...props}>{props.children}</HjelpetekstVenstre>
		</div>
	</div>
);

export default SkjemaInfotekst;
