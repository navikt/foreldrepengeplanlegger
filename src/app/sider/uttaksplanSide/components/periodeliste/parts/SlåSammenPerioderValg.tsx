import * as React from 'react';
import { Periode } from '../../../../../types';
import LinkButton from 'common/components/linkButton/LinkButton';
import BEMHelper from 'common/util/bem';
import { FormattedMessage } from 'react-intl';

interface Props {
    periode: Periode;
    forrigePeriode: Periode;
    onSamlePerioder: (periode1: Periode, periode2: Periode) => void;
}

const bem = BEMHelper('periodeliste');

const SlåSammenPerioderValg: React.FunctionComponent<Props> = ({ periode, forrigePeriode, onSamlePerioder }) => {
    return (
        <div className={bem.element('likePerioder')}>
            <FormattedMessage id="periodeliste.slaaSammenPerioder.part1" />
            <LinkButton onClick={() => onSamlePerioder(periode, forrigePeriode)}>
                <FormattedMessage id="periodeliste.slaaSammenPerioder.part2" />
            </LinkButton>
        </div>
    );
};

export default SlåSammenPerioderValg;
