import * as React from 'react';
import { FormattedMessage, injectIntl, InjectedIntlProps, FormattedHTMLMessage } from 'react-intl';
import { Forelder } from '../../../../types';
import { getVarighetString } from 'common/util/intlUtils';
import { ForeldreparSituasjon } from 'shared/types';

interface Props {
    situasjon: ForeldreparSituasjon;
    forelder: Forelder | undefined;
    flerbarnsdager?: number;
}

const Situasjonsinfo: React.StatelessComponent<Props & InjectedIntlProps> = ({
    situasjon,
    flerbarnsdager,
    forelder,
    intl
}) => {
    if (situasjon === ForeldreparSituasjon.aleneomsorg && forelder) {
        return <FormattedMessage id={`situasjon.info.${situasjon}.${forelder}.tekst`} />;
    }
    if (
        flerbarnsdager &&
        (situasjon === ForeldreparSituasjon.farOgMor ||
            situasjon === ForeldreparSituasjon.morOgMedmor ||
            situasjon === ForeldreparSituasjon.bareFar)
    ) {
        return (
            <FormattedHTMLMessage
                id={`situasjon.info.${situasjon}.flerbarn`}
                values={{ flerbarnsuker: getVarighetString(flerbarnsdager, intl) }}
            />
        );
    }
    return <FormattedMessage id={`situasjon.info.${situasjon}`} />;
};

export default injectIntl(Situasjonsinfo);
