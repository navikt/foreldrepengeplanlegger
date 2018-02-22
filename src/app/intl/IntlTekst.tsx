import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';

export interface OwnProps {
	id: string;
}

type Props = OwnProps & InjectedIntlProps;

const IntlTekst: React.StatelessComponent<Props> = (props) => (
	<span className="intlTekst" data-key={props.id}>
		{props.intl.formatMessage({ id: props.id })}
	</span>
);

export default injectIntl(IntlTekst);
