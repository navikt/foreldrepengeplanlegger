import * as React from 'react';
import { Periode } from '../../types';
import PeriodeElement from './PeriodeElement';
import { PeriodelisteProps } from './types';
import { formaterDato } from 'common/utils/datoUtils';
import HjerteIkon from '../periodeikon/ikoner/HjerteIkon';
import BEMHelper from 'common/utils/bem';
import IconText from 'common/components/iconText/IconText';
import { Perioden } from '../../utils/Perioden';
import LinkButton from 'common/components/linkButton/LinkButton';

import './periodeliste.less';

const bem = BEMHelper('periodeliste');

const erPeriodeLikForrigePeriode = (
    perioder: Periode[],
    periode: Periode,
    index: number,
    antallPerioder: number
): boolean => {
    if (index === 0 || index === antallPerioder - 1) {
        return false;
    }
    const forrigePeriode = perioder[index - 1];
    return Perioden(forrigePeriode).erLik(periode);
};

const SlåSammenPeriodeValg: React.StatelessComponent<{
    periode: Periode;
    forrigePeriode: Periode;
    onSamlePerioder: (periode1: Periode, periode2: Periode) => void;
}> = ({ periode, forrigePeriode, onSamlePerioder }) => {
    return (
        <div className={bem.element('likePerioder')}>
            Perioden over og under er like og kan{' '}
            <LinkButton onClick={() => onSamlePerioder(periode, forrigePeriode)}>
                slåes sammen til en periode
            </LinkButton>{' '}
        </div>
    );
};

const Periodeliste: React.StatelessComponent<PeriodelisteProps> = (props) => {
    const { perioder, periodeFørTermin, familiehendelsesdato, onSlåSammenPerioder, ...elementProps } = props;
    const antallPerioder = perioder.length;
    if (antallPerioder === 0) {
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
                            erPeriodeLikForrigePeriode(perioder, periode, index, antallPerioder) && (
                                <SlåSammenPeriodeValg
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
