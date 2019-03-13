import * as React from 'react';
import { Situasjon } from '../../../../../common/components/foreldrepar/foreldreparTypes';
import { FormattedMessage } from 'react-intl';
import { Element } from 'nav-frontend-typografi';
import { Forelder } from '../../../../types';

interface Props {
    situasjon: Situasjon;
    forelder: Forelder | undefined;
}

const Situasjonsinfo: React.StatelessComponent<Props> = ({ situasjon, forelder }) => {
    return situasjon === Situasjon.aleneomsorg && forelder ? (
        <>
            <Element>
                <FormattedMessage id={`situasjon.info.${situasjon}.${forelder}.tittel`} />
            </Element>
            <FormattedMessage id={`situasjon.info.${situasjon}.${forelder}.tekst`} />
        </>
    ) : (
        <FormattedMessage id={`situasjon.info.${situasjon}`} />
    );
};

export default Situasjonsinfo;
