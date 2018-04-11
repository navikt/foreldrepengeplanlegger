import * as React from 'react';
import Datovelger, { Props as DatovelgerProps } from 'nav-datovelger';
import { Feil } from 'nav-frontend-skjema';
import SkjemaInputElement from 'app/elements/skjemaInputElement/SkjemaInputElement';

export interface Props extends DatovelgerProps {
	id: string;
	label: string | React.ReactNode;
	feil?: Feil;
}

export class DateInput extends React.Component<Props, {}> {
	render() {
		const { label, feil, ...rest } = this.props;
		return (
			<SkjemaInputElement id={this.props.id} feil={feil} label={label}>
				<Datovelger {...rest} />
			</SkjemaInputElement>
		);
	}
}
export default DateInput;
