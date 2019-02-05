import * as React from 'react';
import classNames from 'classnames';
import BEMHelper from 'common/utils/bem';
import SlettKnapp from 'common/components/slett-knapp/SlettKnapp';
import Sirkelknapp from 'common/components/sirkelknapp/Sirkelknapp';
import InfoIkon from 'common/components/ikoner/InfoIkon';
import Block from 'common/components/block/Block';

import './periodelisteElement.less';
import LukkInfoIkon from 'common/components/ikoner/LukkInfoIkon';
import { guid } from 'nav-frontend-js-utils';

interface Props {
    menyer: PeriodeElementMeny[];
    slett?: {
        onRemove: () => void;
        ariaLabel: string;
    };
    info?: string[];
}

interface State {
    infoVisible?: boolean;
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

class PeriodelisteElement extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            infoVisible: false
        };
    }
    render() {
        const { menyer, slett, info } = this.props;
        const infoId = guid();
        return (
            <div className={bem.block}>
                <div className={bem.element('mainContent')}>
                    {menyer
                        .filter((meny) => (meny.isVisibleCheck ? meny.isVisibleCheck() : true))
                        .map((meny) => (
                            <PeriodeElementMenyWrapper meny={meny} key={meny.id} />
                        ))}

                    {(slett || info) && (
                        <div className={bem.element('tools')}>
                            {slett && (
                                <div className={bem.element('tool')}>
                                    <SlettKnapp
                                        onClick={() => slett.onRemove()}
                                        ariaLabel={slett.ariaLabel}
                                        title={slett.ariaLabel}
                                    />
                                </div>
                            )}
                            {info && (
                                <div className={bem.element('tool')}>
                                    {
                                        <Sirkelknapp
                                            ikon={this.state.infoVisible ? <LukkInfoIkon /> : <InfoIkon />}
                                            stil="info"
                                            toggle={{ pressed: this.state.infoVisible || false }}
                                            ariaLabel="f"
                                            onClick={() => this.setState({ infoVisible: !this.state.infoVisible })}
                                            aria-describedby={infoId}
                                        />
                                    }
                                </div>
                            )}
                        </div>
                    )}
                </div>
                {info && (
                    <div className={bem.element('info')} id={infoId}>
                        <Block visible={this.state.infoVisible} animated={true} style="info" margin="none">
                            {info.map((i, idx) => (
                                <p key={idx} className={bem.element('infoText')}>
                                    {i}
                                </p>
                            ))}
                        </Block>
                    </div>
                )}
            </div>
        );
    }
}

export default PeriodelisteElement;
