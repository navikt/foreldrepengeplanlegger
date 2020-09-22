import { IntlShape } from 'react-intl';

export type MessageValue = string | number | boolean | Date | null | undefined;

const getMessage = (intl: IntlShape, id: string, value?: { [key: string]: MessageValue }): string => {
    return intl.formatMessage({ id }, value);
};

export default getMessage;
