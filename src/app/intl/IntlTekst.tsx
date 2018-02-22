import * as React from 'react';
import {
	injectIntl,
	InjectedIntl,
	InjectedIntlProps,
	MessageValue
} from 'react-intl';
import { AppTekster } from 'app/intl/tekstnokler';

export interface OwnProps {
	id: AppTekster;
	values?: { [key: string]: MessageValue };
}

type Props = OwnProps & InjectedIntlProps;

export const intlString = (
	intl: InjectedIntl,
	id: AppTekster,
	values?: { [key: string]: MessageValue }
): string => {
	return intl.formatMessage({ id }, values);
};

const IntlTekst: React.StatelessComponent<Props> = (props) => (
	<span className="intlTekst" data-key={props.id}>
		{props.intl.formatMessage({ id: props.id }, props.values)}
	</span>
);

export default injectIntl(IntlTekst);
