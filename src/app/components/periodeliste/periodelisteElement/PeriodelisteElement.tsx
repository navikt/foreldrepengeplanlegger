import * as React from 'react';
import classNames from 'classnames';
import BEMHelper from 'common/utils/bem';
import SlettKnapp from 'common/components/slett-knapp/SlettKnapp';

import './periodelisteElement.less';

interface OwnProps {
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
        <div className={classNames(bem.element('menyWrapper'), meny.className)} id={meny.id}>
            {meny.render()}
        </div>
    );
};

class PeriodelisteElement extends React.Component<OwnProps, {}> {
    render() {
        const { menyer, slett } = this.props;
        return (
            <div className={bem.block}>
                {menyer
                    .filter((meny) => (meny.isVisibleCheck ? meny.isVisibleCheck() : true))
                    .map((meny) => (
                        <PeriodeElementMenyWrapper meny={meny} key={meny.id} />
                    ))}

                {slett && (
                    <div className={bem.element('tools')}>
                        <SlettKnapp
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
