import * as React from 'react';
import { guid } from 'nav-frontend-js-utils';
import { Feil } from 'nav-frontend-skjema';
import SkjemaelementFeilmelding from './SkjemaelementFeilmelding';

interface Props {
	label: string | React.ReactNode;
	feil?: Feil;
	id?: string;
	children: React.ReactNode;
}

const SkjemaInputElement: React.StatelessComponent<Props> = (props: Props) => {
	const { label, id, feil, children } = props;
	const inputId = id || guid();
	return (
		<div className="skjemaelement">
			<label className="skjemaelement__label" htmlFor={inputId}>
				{label}
			</label>
			{children}
			<SkjemaelementFeilmelding feil={feil} />
		</div>
	);
};

export default SkjemaInputElement;
