import * as React from 'react';
import { Situasjon } from '../../../../../common/components/foreldrepar/foreldreparTypes';
import { FormattedMessage, injectIntl, InjectedIntlProps, FormattedHTMLMessage } from 'react-intl';
import { Forelder } from '../../../../types';
import { getVarighetString } from 'common/utils/intlUtils';

interface Props {
    situasjon: Situasjon;
    forelder: Forelder | undefined;
    flerbarnsdager?: number;
}

const Situasjonsinfo: React.StatelessComponent<Props & InjectedIntlProps> = ({
    situasjon,
    flerbarnsdager,
    forelder,
    intl
}) => {
    if (situasjon === Situasjon.aleneomsorg && forelder) {
        return <FormattedMessage id={`situasjon.info.${situasjon}.${forelder}.tekst`} />;
    }
    if (
        flerbarnsdager &&
        (situasjon === Situasjon.farOgMor || situasjon === Situasjon.morOgMedmor || situasjon === Situasjon.bareFar)
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
