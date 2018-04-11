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
		return (
			<span className="intlTekst" data-ref={id}>
				<FormattedHTMLMessage id={id} values={values} />
			</span>
		);
	}
	return (
		<span className="intlTekst" data-ref={id}>
			<FormattedMessage id={id} values={values} />
		</span>
	);
};

export default IntlTekst;
