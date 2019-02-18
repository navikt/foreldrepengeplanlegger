import * as React from 'react';
import { Periode } from '../../../types';
import LinkButton from 'common/components/linkButton/LinkButton';
import BEMHelper from 'common/utils/bem';

interface Props {
    periode: Periode;
    forrigePeriode: Periode;
    onSamlePerioder: (periode1: Periode, periode2: Periode) => void;
}

const bem = BEMHelper('periodeliste');

const SlåSammenPerioderValg: React.StatelessComponent<Props> = ({ periode, forrigePeriode, onSamlePerioder }) => {
    return (
        <div className={bem.element('likePerioder')}>
            Perioden over og under har samme type og hører til samme person, så de kan{' '}
            <LinkButton onClick={() => onSamlePerioder(periode, forrigePeriode)}>
                slåes sammen til én periode
            </LinkButton>
        </div>
    );
};

export default SlåSammenPerioderValg;
