import * as React from 'react';
import { Situasjon, TilgjengeligeDager } from '../../types';
import BEMHelper from 'common/utils/bem';
import OppsummeringBlokk from '../oppsummeringBlokk/OppsummeringBlokk';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Dekningsgrad } from 'common/types';
import UkerSirkel from './ukerSirkel/UkerSirkel';
import Varighet from '../varighet/Varighet';
import DekningsgradSirkel from './dekningsgradSirkel/DekningsgradSirkel';

export interface DekningOppsummeringProps {
    situasjon: Situasjon;
    dekningsgrad: Dekningsgrad;
    tilgjengeligeDager: TilgjengeligeDager;
    onRequestChange: () => void;
}

const bem = BEMHelper('oppsummering');

const DekningOppsummering: React.StatelessComponent<DekningOppsummeringProps & InjectedIntlProps> = ({
    tilgjengeligeDager,
    dekningsgrad,
    onRequestChange
}) => {
    const uker = tilgjengeligeDager.dagerTotalt / 5;
    return (
        <OppsummeringBlokk onRequestChange={onRequestChange} tittel="Deres foreldrepengeperiode">
            <div className={bem.block}>
                <div className={bem.element('deloppsummering')}>
                    <UkerSirkel uker={uker} />
                    <div className={bem.element('verdi')}>
                        <Varighet dager={tilgjengeligeDager.dagerTotalt} />
                    </div>
                </div>
                <div className={bem.element('deloppsummering')}>
                    <DekningsgradSirkel dekningsgrad={dekningsgrad} />
                    <div className={bem.element('verdi')}>{dekningsgrad} prosent utbetaling</div>
                </div>
            </div>
        </OppsummeringBlokk>
    );
};

export default injectIntl(DekningOppsummering);
