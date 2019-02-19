import * as React from 'react';
import { Situasjon } from '../../../../../common/components/foreldrepar/foreldreparTypes';
import { FormattedMessage } from 'react-intl';
import { Element } from 'nav-frontend-typografi';

interface Props {
    situasjon: Situasjon;
    rolle: 'mor' | 'far' | undefined;
}

const Situasjonsinfo: React.StatelessComponent<Props> = ({ situasjon, rolle }) => {
    return situasjon === Situasjon.aleneomsorg ? (
        <>
            <Element>
                <FormattedMessage id={`situasjon.info.${situasjon}.${rolle}.tittel`} />
            </Element>
            <FormattedMessage id={`situasjon.info.${situasjon}.${rolle}.tekst`} />
        </>
    ) : (
        <FormattedMessage id={`situasjon.info.${situasjon}`} />
    );
};

export default Situasjonsinfo;
