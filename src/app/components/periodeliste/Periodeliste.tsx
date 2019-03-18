import * as React from 'react';
import { Periode } from '../../types';
import PeriodeElement from './PeriodeElement';
import { PeriodelisteProps } from './types';
import { formaterDato } from 'common/utils/datoUtils';
import BEMHelper from 'common/utils/bem';
import IconText from 'common/components/iconText/IconText';
import LinkButton from 'common/components/linkButton/LinkButton';
import { Ingress } from 'nav-frontend-typografi';
import SlåSammenPerioderValg from './parts/SlåSammenPerioderValg';
import periodelisteUtils from './periodelisteUtils';
import posed, { PoseGroup } from 'react-pose';
import { getRegelbruddForPeriode } from '../../utils/regler/regelUtils';
import HjerteIkon from './parts/HjerteIkon';

import './periodeliste.less';

const bem = BEMHelper('periodeliste');

const PosedLi = posed.li({
    flip: {
        y: 0
    },
    enter: {
        y: 0,
        opacity: 1,
        scaleY: 1,
        transition: {
            default: {
                type: 'tween',
                ease: 'easeOut',
                duration: 150
            }
        }
    },
    exit: {
        y: -75,
        opacity: 0,
        scaleY: 0,
        transition: {
            default: {
                type: 'tween',
                duration: 150
            }
        }
    }
});

interface OwnProps {
    nyPeriodeSkjema: React.ReactNode;
    visSkjema: boolean;
    nyPeriodeId: string;
}

const Periodeliste: React.StatelessComponent<PeriodelisteProps & OwnProps> = (props) => {
    const {
        perioder,
        periodeFørTermin,
        familiehendelsesdato,
        onSlåSammenPerioder,
        regelTestresultat,
        nyPeriodeSkjema,
        visSkjema,
        nyPeriodeId,
        ...elementProps
    } = props;
    const { onResetPlan } = elementProps;
    const antallPerioder = perioder.length;
    if (antallPerioder === 0 && 1 + 1 === 3) {
        return (
            <div className={bem.element('tomListe')}>
                <Ingress tag="p">
                    Ingen perioder er registrert.{' '}
                    {onResetPlan && <LinkButton onClick={() => onResetPlan()}>Lag nytt forslag</LinkButton>}
                </Ingress>
            </div>
        );
    }
    const posedItems = perioder.map((periode: Periode, index: number) => {
        return (
            <PosedLi className="periodeliste__periode" key={periode.id}>
                {onSlåSammenPerioder &&
                    periodelisteUtils.erPeriodeLikForrigePeriode(perioder, periode, index, antallPerioder) && (
                        <SlåSammenPerioderValg
                            periode={periode}
                            forrigePeriode={perioder[index - 1]}
                            onSamlePerioder={onSlåSammenPerioder}
                        />
                    )}
                <PeriodeElement
                    periode={periode}
                    perioder={perioder}
                    periodeFørTermin={periodeFørTermin}
                    {...elementProps}
                    startdatoErLåst={true}
                    regelbrudd={getRegelbruddForPeriode(regelTestresultat, periode.id)}
                />
            </PosedLi>
        );
    });
    if (visSkjema) {
        posedItems.push(<PosedLi key={nyPeriodeId}>{nyPeriodeSkjema}</PosedLi>);
    }

    return (
        <div className={bem.classNames(bem.block, nyPeriodeSkjema ? bem.modifier('medSkjema') : undefined)}>
            {periodeFørTermin ? (
                <>
                    <li className={bem.element('periode')} key={periodeFørTermin.id}>
                        <PeriodeElement
                            perioder={perioder}
                            periode={periodeFørTermin}
                            periodeFørTermin={periodeFørTermin}
                            regelbrudd={getRegelbruddForPeriode(regelTestresultat, periodeFørTermin.id)}
                            typeErLåst={true}
                            forelderErLåst={true}
                            sluttdatoErLåst={true}
                            kanSlettes={false}
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
            <PoseGroup>{posedItems}</PoseGroup>
        </div>
    );
};

export default Periodeliste;
