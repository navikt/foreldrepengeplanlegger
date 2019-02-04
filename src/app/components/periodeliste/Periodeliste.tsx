import * as React from 'react';
import { Periode } from '../../types';
import PeriodeElement from './PeriodeElement';
import { PeriodelisteProps } from './types';
import { formaterDato } from 'common/utils/datoUtils';
import HjerteIkon from '../periodeikon/ikoner/HjerteIkon';
import IkonTekst from 'common/components/ikonTekst/IkonTekst';

import './periodeliste.less';
import BEMHelper from 'common/utils/bem';

const bem = BEMHelper('periodeliste');

const Periodeliste: React.StatelessComponent<PeriodelisteProps> = (props) => {
    const { perioder, periodeFørTermin, familiehendelsesdato, ...elementProps } = props;
    if (perioder.length === 0) {
        return <div>Ingen perioder registrert</div>;
    }
    return (
        <ol className={bem.block}>
            {periodeFørTermin ? (
                <>
                    <li className={bem.element('periode')} key={periodeFørTermin.id}>
                        <PeriodeElement
                            periode={periodeFørTermin}
                            typeErLåst={true}
                            forelderErLåst={true}
                            sluttdatoErLåst={true}
                            slettErLåst={true}
                            {...elementProps}
                        />
                    </li>
                    <li className={bem.element('termin')}>
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
                        <PeriodeElement periode={periode} {...elementProps} startdatoErLåst={true} />
                    </li>
                );
            })}
        </ol>
    );
};

export default Periodeliste;
