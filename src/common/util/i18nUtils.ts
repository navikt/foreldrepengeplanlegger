import InjectedIntl = ReactIntl.InjectedIntl;
import MessageValue = ReactIntl.MessageValue;

const getMessage = (intl: InjectedIntl, id: string, value?: { [key: string]: MessageValue }): string => {
    if (id.indexOf('.html') > 0) {
        return intl.formatHTMLMessage({ id }, value);
    }
    return intl.formatMessage({ id }, value);
};

export default getMessage;
