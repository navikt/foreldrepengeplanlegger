import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { getVarighetString } from 'common/util/intlUtils';
import { ForeldreparSituasjon } from 'shared/types';
import { Forelder } from 'common/types';

interface Props {
    situasjon: ForeldreparSituasjon;
    forelder: Forelder | undefined;
    flerbarnsdager?: number;
}

const Situasjonsinfo: React.FunctionComponent<Props> = ({ situasjon, flerbarnsdager, forelder }) => {
    const intl = useIntl();

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
            <FormattedMessage
                id={`situasjon.info.${situasjon}.flerbarn`}
                values={{
                    flerbarnsuker: getVarighetString(flerbarnsdager, intl),
                    strong: (msg: any) => <strong>{msg}</strong>,
                }}
            />
        );
    }
    return <FormattedMessage id={`situasjon.info.${situasjon}`} />;
};

export default Situasjonsinfo;
