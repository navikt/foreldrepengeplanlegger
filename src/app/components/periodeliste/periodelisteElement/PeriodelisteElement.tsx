import * as React from 'react';
import classNames from 'classnames';
import Lukknapp from 'nav-frontend-lukknapp';
import BEMHelper from 'common/utils/bem';
import { UttaksplanColor } from '../../../types';

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

const PeriodeFargestrek: React.StatelessComponent<{ farge: UttaksplanColor; gradert?: boolean }> = ({
    farge,
    gradert
}) => {
    const bemStrek = bem.child('fargestrek');
    return (
        <div
            className={classNames(
                bemStrek.block,
                bemStrek.modifier(farge),
                gradert ? `${bemStrek.modifier(farge)}--gradert` : undefined
            )}
        />
    );
};

class PeriodelisteElement extends React.Component<OwnProps, {}> {
    render() {
        const { farge, menyer, slett, nyPeriodeModus } = this.props;
        return (
            <div className={classNames(bem.block, { [`${bem.modifier('nyPeriodeModus')}`]: nyPeriodeModus })}>
                <PeriodeFargestrek farge={farge} />
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
        );
    }
}

export default PeriodelisteElement;
