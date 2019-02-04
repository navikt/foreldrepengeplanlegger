import * as React from 'react';
import { Periode } from '../../types';
import PeriodeElement from './PeriodeElement';
import { PeriodelisteProps } from './types';

import './periodeliste.less';
import { formaterDato } from 'common/utils/datoUtils';
import HjerteIkon from '../periodeikon/ikoner/HjerteIkon';
import IkonTekst from 'common/components/ikonTekst/IkonTekst';

const Periodeliste: React.StatelessComponent<PeriodelisteProps> = (props) => {
    const { perioder, periodeFørTermin, familiehendelsesdato, ...elementProps } = props;
    if (perioder.length === 0) {
        return <div>Ingen perioder registrert</div>;
    }
    return (
        <ol className="periodeliste">
            {periodeFørTermin ? (
                <>
                    <li className="periodeliste__periode" key={periodeFørTermin.id}>
                        <PeriodeElement periode={periodeFørTermin} {...elementProps} erFørstePeriode={true} />
                    </li>
                    <li className="periodeliste__termin">
                        <IkonTekst ikon={<HjerteIkon fylt={true} title="Termin" />}>
                            {formaterDato(familiehendelsesdato)}
                        </IkonTekst>
                    </li>
                </>
            ) : (
                undefined
            )}
            {perioder.map((periode: Periode, index: number) => {
                return (
                    <li className="periodeliste__periode" key={periode.id}>
                        <PeriodeElement
                            periode={periode}
                            {...elementProps}
                            erFørstePeriode={periodeFørTermin === undefined && index === 0}
                        />
                    </li>
                );
            })}
        </ol>
    );
};

export default Periodeliste;
