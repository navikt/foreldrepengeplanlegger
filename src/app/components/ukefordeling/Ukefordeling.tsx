import * as React from 'react';
import { Element } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

import './ukefordeling.less';

export interface Props {
    navnMor: string;
    navnFarMedmor: string;
    foreldrepengerFørTermin: number;
    modrekvote: number;
    fedrekvote: number;
    fellesukerMor: number;
    fellesukerFarMedmor: number;
}

const FordelingValg: React.StatelessComponent<Props> = ({
    navnMor,
    navnFarMedmor,
    foreldrepengerFørTermin,
    modrekvote,
    fedrekvote,
    fellesukerMor,
    fellesukerFarMedmor
}) => {
    const totaltAntallUker = fellesukerMor + fellesukerFarMedmor + modrekvote + fedrekvote + foreldrepengerFørTermin;

    const ukerF1 = fellesukerMor + modrekvote + foreldrepengerFørTermin;
    const ukerF2 = fellesukerFarMedmor + fedrekvote;
    const pstF1 = (100 / totaltAntallUker) * ukerF1;
    const pstF2 = (100 / totaltAntallUker) * ukerF2;
    const b1 = {
        width: `${pstF1}%`
    };
    const b2 = {
        width: `${pstF2}%`
    };
    return (
        <div className="fordeling">
            <div className="fordeling__header" aria-hidden="true" role="presentation">
                <Element className="fordeling__header__forelder">{navnMor}</Element>
                <Element className="fordeling__header__forelder fordeling__header__forelder--forelder2">
                    {navnFarMedmor}
                </Element>
            </div>
            <div className="fordeling__graf">
                <span className="fordeling__graf__bar fordeling__graf__bar--mor" style={b1}>
                    <span className="sr-only">{navnMor}:</span>
                    <FormattedMessage id="common.varighet.uker" values={{ uker: ukerF1 }} />
                </span>
                <span className="fordeling__graf__bar fordeling__graf__bar--farMedmor" style={b2}>
                    <span className="sr-only">{navnFarMedmor}:</span>
                    <FormattedMessage id="common.varighet.uker" values={{ uker: ukerF2 }} />
                </span>
            </div>
        </div>
    );
};

export default FordelingValg;
