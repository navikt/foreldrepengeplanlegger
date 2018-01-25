import * as React from 'react';

interface Props {
	prop?: any;
}

const UtsettelseSkjema: React.StatelessComponent<Props> = (props: Props) => (
	<div>
		<h1>Legg til utsettelse</h1>
		{props.prop}
	</div>
);

export default UtsettelseSkjema;
