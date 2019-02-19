import * as React from 'react';
import { Regelbrudd, RegelAlvorlighet } from '../../utils/regler/types';
import BEMHelper from 'common/utils/bem';
import { Undertittel } from 'nav-frontend-typografi';
import RegelbruddFeilmelding from './RegelbruddFeilmelding';

interface Props {
    regelbrudd: Regelbrudd[];
}

const bem = BEMHelper('regelbrudd');

const Regelbrudd: React.StatelessComponent<Props> = ({ regelbrudd }) => {
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
                                <RegelbruddFeilmelding feilmelding={brudd.feilmelding} />
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
                                <RegelbruddFeilmelding feilmelding={brudd.feilmelding} />
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </section>
    );
};

export default Regelbrudd;
