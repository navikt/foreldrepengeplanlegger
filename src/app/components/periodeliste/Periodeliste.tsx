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
import SlåSammenPerioderValg from './parts/SlåSammenPerioderValg';
import periodelisteUtils from './periodelisteUtils';
import posed, { PoseGroup } from 'react-pose';

import './periodeliste.less';
import { getRegelbruddForPeriode } from '../../utils/regler/regelUtils';

const bem = BEMHelper('periodeliste');

const PosedLi = posed.li({
    open: {
        staggerChildren: 200
    },
    enter: {
        opacity: 1,
        delay: 250,
        transform: { scale: 0 },
        transition: { duration: 500, ease: 'easeInOut' }
    },
    exit: {
        opacity: 0,
        delay: 250,
        transform: { scale: 0 },
        transition: { duration: 750, ease: 'easeInOut' }
    }
});

const Periodeliste: React.StatelessComponent<PeriodelisteProps> = (props) => {
    const {
        perioder,
        periodeFørTermin,
        familiehendelsesdato,
        onSlåSammenPerioder,
        regelTestresultat,
        ...elementProps
    } = props;
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
        <div className={bem.block}>
            {periodeFørTermin ? (
                <>
                    <li className={bem.element('periode')} key={periodeFørTermin.id}>
                        <PeriodeElement
                            periode={periodeFørTermin}
                            regelbrudd={getRegelbruddForPeriode(regelTestresultat, periodeFørTermin.id)}
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
            <PoseGroup>
                {perioder.map((periode: Periode, index: number) => {
                    return (
                        <PosedLi className="periodeliste__periode" key={periode.id}>
                            {onSlåSammenPerioder &&
                                periodelisteUtils.erPeriodeLikForrigePeriode(
                                    perioder,
                                    periode,
                                    index,
                                    antallPerioder
                                ) && (
                                    <SlåSammenPerioderValg
                                        periode={periode}
                                        forrigePeriode={perioder[index - 1]}
                                        onSamlePerioder={onSlåSammenPerioder}
                                    />
                                )}
                            <PeriodeElement
                                periode={periode}
                                {...elementProps}
                                startdatoErLåst={true}
                                regelbrudd={getRegelbruddForPeriode(regelTestresultat, periode.id)}
                            />
                        </PosedLi>
                    );
                })}
            </PoseGroup>
        </div>
    );
};

export default Periodeliste;
