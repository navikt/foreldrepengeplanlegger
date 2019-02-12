import * as React from 'react';
import { Periode } from '../../types';
import PeriodeElement from './PeriodeElement';
import { PeriodelisteProps } from './types';
import { formaterDato } from 'common/utils/datoUtils';
import HjerteIkon from '../periodeikon/ikoner/HjerteIkon';
import BEMHelper from 'common/utils/bem';
import IconText from 'common/components/iconText/IconText';
import LinkButton from 'common/components/linkButton/LinkButton';
import { Ingress } from 'nav-frontend-typografi';
import SlåSammenPerioderValg from './parts/Sl\u00E5SammenPerioderValg';
import periodelisteUtils from './periodelisteUtils';

import './periodeliste.less';

const bem = BEMHelper('periodeliste');

const Periodeliste: React.StatelessComponent<PeriodelisteProps> = (props) => {
    const { perioder, periodeFørTermin, familiehendelsesdato, onSlåSammenPerioder, ...elementProps } = props;
    const { onResetPlan } = elementProps;
    const antallPerioder = perioder.length;
    if (antallPerioder === 0) {
        return (
            <div className={bem.element('tomListe')}>
                <Ingress tag="p">
                    Ingen perioder er registrert.{' '}
                    {onResetPlan && <LinkButton onClick={() => onResetPlan()}>Lag nytt forslag</LinkButton>}
                </Ingress>
            </div>
        );
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
                        <IconText layout="horizontal" icon={<HjerteIkon fylt={true} title="Termin" />}>
                            Termin {formaterDato(familiehendelsesdato)}
                        </IconText>
                    </li>
                </>
            ) : (
                undefined
            )}
            {perioder.map((periode: Periode, index: number) => {
                return (
                    <li className="periodeliste__periode" key={periode.id}>
                        {onSlåSammenPerioder &&
                            periodelisteUtils.erPeriodeLikForrigePeriode(perioder, periode, index, antallPerioder) && (
                                <SlåSammenPerioderValg
                                    periode={periode}
                                    forrigePeriode={perioder[index - 1]}
                                    onSamlePerioder={onSlåSammenPerioder}
                                />
                            )}
                        <PeriodeElement periode={periode} {...elementProps} startdatoErLåst={true} />
                    </li>
                );
            })}
        </ol>
    );
};

export default Periodeliste;
