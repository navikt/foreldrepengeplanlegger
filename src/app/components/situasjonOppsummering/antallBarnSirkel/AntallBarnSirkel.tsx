import * as React from 'react';
import BEMHelper from 'common/utils/bem';
import Sirkelmaske from '../../oppsummeringBlokk/Sirkelmaske';

import './antallBarnSirkel.less';
import TåteflaskeIkon from 'common/components/ikoner/T\u00E5teflaskeIkon';

interface Props {
    antallBarn: number;
}

const bem = BEMHelper('antallBarnSirkel');

const renderBarn = (antall: number) => {
    const barn: React.ReactNode[] = [];
    while (barn.length < antall) {
        barn.push(<TåteflaskeIkon key={barn.length} />);
    }
    return barn;
};

const AntallBarnSirkel: React.StatelessComponent<Props> = ({ antallBarn }) => {
    return (
        <div className={bem.block}>
            <div className={bem.element('ikon', `antall-${antallBarn}`)}>
                <Sirkelmaske diameter="5rem">
                    <div className={bem.element('svgs', `antall-${antallBarn}`)}>{renderBarn(antallBarn)}</div>
                </Sirkelmaske>
            </div>
        </div>
    );
};

export default AntallBarnSirkel;
