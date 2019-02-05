import * as React from 'react';
import classNames from 'classnames';
import Lukknapp from 'nav-frontend-lukknapp';
import BEMHelper from 'common/utils/bem';
import { UttaksplanColor } from '../../../types';
import PeriodeBlokk from '../../periodeBlokk/PeriodeBlokk';

import './periodelisteElement.less';

interface OwnProps {
    farge: UttaksplanColor;
    menyer: PeriodeElementMeny[];
    slett?: {
        onRemove: () => void;
        ariaLabel: string;
    };
    nyPeriodeModus?: boolean;
}

interface PeriodeElementMeny {
    id: string;
    render: () => React.ReactNode;
    className?: string;
    isVisibleCheck?: () => boolean;
}
const bem = BEMHelper('periodelisteElement');

const PeriodeElementMenyWrapper: React.StatelessComponent<{ meny: PeriodeElementMeny }> = ({ meny }) => {
    return (
        <div className={classNames(bem.element('menyWrapper'), meny.className)} id={meny.id}>
            {meny.render()}
        </div>
    );
};

class PeriodelisteElement extends React.Component<OwnProps, {}> {
    render() {
        const { farge, menyer, slett, nyPeriodeModus } = this.props;
        return (
            <PeriodeBlokk farge={farge} nyPeriode={nyPeriodeModus}>
                <div className={bem.block}>
                    {menyer
                        .filter((meny) => (meny.isVisibleCheck ? meny.isVisibleCheck() : true))
                        .map((meny) => (
                            <PeriodeElementMenyWrapper meny={meny} key={meny.id} />
                        ))}

                    {slett && (
                        <div className={bem.element('tools')}>
                            <Lukknapp
                                onClick={() => slett.onRemove()}
                                ariaLabel={slett.ariaLabel}
                                title={slett.ariaLabel}
                            />
                        </div>
                    )}
                </div>
            </PeriodeBlokk>
        );
    }
}

export default PeriodelisteElement;
