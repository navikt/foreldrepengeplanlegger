import * as React from 'react';
import {
	InjectedIntl,
	MessageValue,
	FormattedHTMLMessage,
	FormattedMessage
} from 'react-intl';
import { AppTekster } from 'app/intl/tekstnokler';

export interface OwnProps {
	id: AppTekster;
	values?: { [key: string]: MessageValue };
}

type Props = OwnProps;

export const intlString = (
	intl: InjectedIntl,
	id: AppTekster,
	values?: { [key: string]: MessageValue }
): string => {
	return intl.formatMessage({ id }, values);
};

const IntlTekst: React.StatelessComponent<Props> = ({ id, values }) => {
	if (id.substr(id.length - 5) === '.html') {
		return <FormattedHTMLMessage id={id} values={values} data-key={id} />;
	}
	return <FormattedMessage id={id} values={values} data-key={id} />;
};

export default IntlTekst;
