import * as React from 'react';
import { Regelbrudd, RegelAlvorlighet } from '../../utils/regler/types';
import BEMHelper from 'common/utils/bem';
import { FormattedMessage } from 'react-intl';
import { Undertittel } from 'nav-frontend-typografi';

interface Props {
    regelbrudd: Regelbrudd[];
}

const bem = BEMHelper('regelbrudd');

const Regelbrudd: React.StatelessComponent<Props> = ({ regelbrudd }) => {
    const ulovlig = regelbrudd.filter((b) => b.alvorlighet === RegelAlvorlighet.ULOVLIG);
    const info = regelbrudd.filter((b) => b.alvorlighet === RegelAlvorlighet.TIL_INFO);
    return (
        <section className={bem.block}>
            {ulovlig.length > 0 && (
                <>
                    <Undertittel>Ugyldige perioder</Undertittel>
                    <ul>
                        {ulovlig.map((brudd, idx) => (
                            <li key={idx}>
                                <FormattedMessage id={brudd.feilmelding.intlKey} values={brudd.feilmelding.values} />
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
                                <FormattedMessage id={brudd.feilmelding.intlKey} values={brudd.feilmelding.values} />
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </section>
    );
};

export default Regelbrudd;
