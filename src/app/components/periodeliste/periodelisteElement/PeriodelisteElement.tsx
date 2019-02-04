import * as React from 'react';
import classnames from 'classnames';
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
        <div className={classnames(bem.element('menyWrapper'), meny.className)} id={meny.id}>
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
            className={classnames(
                bemStrek.block,
                bemStrek.modifier(farge),
                gradert ? `${bemStrek.modifier(farge)}--gradert` : undefined
            )}
        />
    );
};

class PeriodeElementLayout extends React.Component<OwnProps, {}> {
    render() {
        const { farge, menyer, slett } = this.props;
        return (
            <div className={bem.block}>
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

export default PeriodeElementLayout;
