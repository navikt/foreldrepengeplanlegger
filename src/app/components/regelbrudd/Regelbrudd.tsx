import * as React from 'react';
import { Regelbrudd, RegelAlvorlighet, RegelbruddFeil } from '../../utils/regler/types';
import BEMHelper from 'common/utils/bem';
import { FormattedMessage, InjectedIntl, injectIntl, InjectedIntlProps } from 'react-intl';
import { Undertittel } from 'nav-frontend-typografi';

interface Props {
    regelbrudd: Regelbrudd[];
}

const bem = BEMHelper('regelbrudd');

const getRegelbruddFeilmeldingValue = (
    intl: InjectedIntl,
    feilmelding: RegelbruddFeil
): { [key: string]: string } | undefined => {
    const { values } = feilmelding;
    if (values === undefined) {
        return undefined;
    }
    const newValues: { [key: string]: string } = {};

    Object.keys(values).forEach((key) => {
        const value = values[key];
        if (value) {
            newValues[key] = typeof value === 'function' ? value(intl) : `${value}`;
        }
    });

    return newValues;
};

const Regelbrudd: React.StatelessComponent<Props & InjectedIntlProps> = ({ regelbrudd, intl }) => {
    const ulovlig = regelbrudd.filter((b) => b.alvorlighet === RegelAlvorlighet.ULOVLIG);
    const info = regelbrudd.filter((b) => b.alvorlighet === RegelAlvorlighet.INFO);
    return (
        <section className={bem.block}>
            {ulovlig.length > 0 && (
                <>
                    <Undertittel>Ugyldige perioder</Undertittel>
                    <ul>
                        {ulovlig.map((brudd, idx) => (
                            <li key={idx}>
                                <FormattedMessage
                                    id={brudd.feilmelding.intlKey}
                                    values={getRegelbruddFeilmeldingValue(intl, brudd.feilmelding)}
                                />
                            </li>
                        ))}
                    </ul>
                </>
            )}
            {info.length > 0 && (
                <>
                    <Undertittel>Ekstrainformasjon</Undertittel>
                    <ul>
                        {info.map((brudd, idx) => (
                            <li key={idx}>
                                <FormattedMessage
                                    id={brudd.feilmelding.intlKey}
                                    values={getRegelbruddFeilmeldingValue(intl, brudd.feilmelding)}
                                />
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </section>
    );
};

export default injectIntl(Regelbrudd);
