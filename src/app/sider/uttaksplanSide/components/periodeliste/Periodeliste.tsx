import * as React from 'react';
import { Periode } from '../../../../types';
import PeriodeElement from './PeriodeElement';
import { PeriodelisteProps } from './types';
import { formaterDato } from 'common/util/datoUtils';
import BEMHelper from 'common/util/bem';
import IconText from 'common/components/iconText/IconText';
import SlåSammenPerioderValg from './parts/SlåSammenPerioderValg';
import periodelisteUtils from './periodelisteUtils';
import posed, { PoseGroup } from 'react-pose';
import { getRegelAvvikForPeriode } from '../../../../../shared/regler/regelUtils';
import HjerteIkon from './parts/HjerteIkon';
import { Periodene } from '../../../../utils/Periodene';
import { EtikettLiten } from 'nav-frontend-typografi';

import './periodeliste.less';
import Features from '../../../../features';
import { FormattedMessage } from 'react-intl';

const bem = BEMHelper('periodeliste');

const PosedLi = posed.li({
    flip: {
        y: 0,
    },
    enter: {
        y: 0,
        opacity: 1,
        scaleY: 1,
        transition: {
            default: {
                type: 'tween',
                ease: 'easeOut',
                duration: 150,
            },
        },
    },
    exit: {
        y: -75,
        opacity: 0,
        scaleY: 0,
        transition: {
            default: {
                type: 'tween',
                duration: 150,
            },
        },
    },
});

interface OwnProps {
    nyPeriodeSkjema: React.ReactNode;
    visSkjema: boolean;
    nyPeriodeId: string;
}

const Periodeliste: React.FunctionComponent<PeriodelisteProps & OwnProps> = (props) => {
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
    const antallPerioder = perioder.length;
    const avsluttendeUlønnetPermisjoner =
        Features.visAvsluttendeUlønnetPermisjonSomEgenListe && Periodene(perioder).getAvsluttendeUlønnedePermisjoner();
    const aup =
        avsluttendeUlønnetPermisjoner && avsluttendeUlønnetPermisjoner.length > 0
            ? avsluttendeUlønnetPermisjoner[0]
            : undefined;
    const posedItems = perioder.map((periode: Periode, index: number) => {
        const avvik = getRegelAvvikForPeriode(regelTestresultat, periode.id);
        const erFørsteAvsluttendeUlønnetPermisjon = aup && aup.id === periode.id;
        return (
            <PosedLi className={bem.element('periode')} key={periode.id}>
                {onSlåSammenPerioder &&
                    periodelisteUtils.erPeriodeLikForrigePeriode(perioder, periode, index, antallPerioder) && (
                        <SlåSammenPerioderValg
                            periode={periode}
                            forrigePeriode={perioder[index - 1]}
                            onSamlePerioder={onSlåSammenPerioder}
                        />
                    )}
                {erFørsteAvsluttendeUlønnetPermisjon && (
                    <div className={bem.element('info')}>
                        <EtikettLiten>
                            <FormattedMessage id="periodeliste.avsluttendeUlønnetPermisjonTittel" />
                        </EtikettLiten>
                    </div>
                )}
                <PeriodeElement
                    periode={periode}
                    perioder={perioder}
                    periodeFørTermin={periodeFørTermin}
                    {...elementProps}
                    startdatoErLåst={true}
                    regelAvvik={avvik}
                />
            </PosedLi>
        );
    });

    if (visSkjema) {
        posedItems.push(<PosedLi key={nyPeriodeId}>{nyPeriodeSkjema}</PosedLi>);
    }

    return (
        <ol className={bem.classNames(bem.block, nyPeriodeSkjema ? bem.modifier('medSkjema') : undefined)}>
            {periodeFørTermin ? (
                <>
                    <li className={bem.element('periode')} key={periodeFørTermin.id}>
                        <PeriodeElement
                            {...elementProps}
                            perioder={perioder}
                            periode={periodeFørTermin}
                            periodeFørTermin={periodeFørTermin}
                            disabled={false}
                            typeErLåst={true}
                            forelderErLåst={true}
                            sluttdatoErLåst={true}
                            kanSlettes={false}
                            regelAvvik={getRegelAvvikForPeriode(regelTestresultat, periodeFørTermin.id)}
                        />
                    </li>
                    <li className={bem.element('termin')}>
                        <IconText layout="horizontal" icon={<HjerteIkon fylt={true} title="Termin" />}>
                            <FormattedMessage
                                id="periodeliste.termin"
                                values={{ dato: formaterDato(familiehendelsesdato) }}
                            />
                        </IconText>
                    </li>
                </>
            ) : undefined}
            <PoseGroup>{posedItems}</PoseGroup>
        </ol>
    );
};

export default Periodeliste;
